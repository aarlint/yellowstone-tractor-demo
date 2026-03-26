import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { unlinkSync, existsSync } from 'fs'
import { db, UPLOADS_DIR } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'yellowstone-tractor-demo-secret-key'
const ADMIN_USER = 'demoadmin'
const ADMIN_PASS = 'demo1234'

app.use(express.json())
app.use('/uploads', express.static(UPLOADS_DIR))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  }
})

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// --- Public API ---

app.get('/api/equipment', (req, res) => {
  const rows = db.prepare(`
    SELECT e.*, GROUP_CONCAT(ep.id || '::' || ep.filename || '::' || ep.is_primary || '::' || ep.sort_order, '||') as photo_data
    FROM equipment e
    LEFT JOIN equipment_photos ep ON ep.equipment_id = e.id
    WHERE e.in_stock = 1
    GROUP BY e.id
    ORDER BY e.sort_order, e.id
  `).all()
  res.json(rows.map(parsePhotos))
})

app.get('/api/equipment/:id', (req, res) => {
  const row = db.prepare(`
    SELECT e.*, GROUP_CONCAT(ep.id || '::' || ep.filename || '::' || ep.is_primary || '::' || ep.sort_order, '||') as photo_data
    FROM equipment e
    LEFT JOIN equipment_photos ep ON ep.equipment_id = e.id
    WHERE e.id = ?
    GROUP BY e.id
  `).get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(parsePhotos(row))
})

// --- Auth ---

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' })
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.user.username })
})

// --- Admin API ---

app.get('/api/admin/equipment', authMiddleware, (req, res) => {
  const rows = db.prepare(`
    SELECT e.*, GROUP_CONCAT(ep.id || '::' || ep.filename || '::' || ep.is_primary || '::' || ep.sort_order, '||') as photo_data
    FROM equipment e
    LEFT JOIN equipment_photos ep ON ep.equipment_id = e.id
    GROUP BY e.id
    ORDER BY e.sort_order, e.id
  `).all()
  res.json(rows.map(parsePhotos))
})

app.post('/api/admin/equipment', authMiddleware, upload.array('photos', 10), (req, res) => {
  const data = JSON.parse(req.body.data || '{}')
  const result = db.prepare(`
    INSERT INTO equipment (name, brand, category, condition, year, engine_hp, transmission, loader_lift_capacity, hours, price, description, features, in_stock, sort_order, warranty, deck_size)
    VALUES (@name, @brand, @category, @condition, @year, @engine_hp, @transmission, @loader_lift_capacity, @hours, @price, @description, @features, @in_stock, @sort_order, @warranty, @deck_size)
  `).run({
    name: data.name,
    brand: data.brand,
    category: data.category,
    condition: data.condition || 'New',
    year: data.year || null,
    engine_hp: data.engine_hp || null,
    transmission: data.transmission || null,
    loader_lift_capacity: data.loader_lift_capacity || null,
    hours: data.hours || null,
    price: data.price || null,
    description: data.description || null,
    features: data.features || null,
    in_stock: data.in_stock ?? 1,
    sort_order: data.sort_order ?? 0,
    warranty: data.warranty || null,
    deck_size: data.deck_size || null
  })

  const equipId = result.lastInsertRowid
  if (req.files?.length) {
    const insertPhoto = db.prepare('INSERT INTO equipment_photos (equipment_id, filename, is_primary) VALUES (?, ?, ?)')
    for (let i = 0; i < req.files.length; i++) {
      insertPhoto.run(equipId, req.files[i].filename, i === 0 ? 1 : 0)
    }
  }

  res.json({ id: equipId })
})

app.put('/api/admin/equipment/:id', authMiddleware, upload.array('photos', 10), (req, res) => {
  const data = JSON.parse(req.body.data || '{}')
  const existing = db.prepare('SELECT id FROM equipment WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  db.prepare(`
    UPDATE equipment SET
      name = @name, brand = @brand, category = @category, condition = @condition,
      year = @year, engine_hp = @engine_hp, transmission = @transmission,
      loader_lift_capacity = @loader_lift_capacity, hours = @hours, price = @price,
      description = @description, features = @features, in_stock = @in_stock,
      sort_order = @sort_order, warranty = @warranty, deck_size = @deck_size,
      updated_at = datetime('now')
    WHERE id = @id
  `).run({
    id: req.params.id,
    name: data.name,
    brand: data.brand,
    category: data.category,
    condition: data.condition || 'New',
    year: data.year || null,
    engine_hp: data.engine_hp || null,
    transmission: data.transmission || null,
    loader_lift_capacity: data.loader_lift_capacity || null,
    hours: data.hours || null,
    price: data.price || null,
    description: data.description || null,
    features: data.features || null,
    in_stock: data.in_stock ?? 1,
    sort_order: data.sort_order ?? 0,
    warranty: data.warranty || null,
    deck_size: data.deck_size || null
  })

  if (req.files?.length) {
    const hasPhotos = db.prepare('SELECT COUNT(*) as c FROM equipment_photos WHERE equipment_id = ?').get(req.params.id).c
    const insertPhoto = db.prepare('INSERT INTO equipment_photos (equipment_id, filename, is_primary) VALUES (?, ?, ?)')
    for (let i = 0; i < req.files.length; i++) {
      insertPhoto.run(req.params.id, req.files[i].filename, (!hasPhotos && i === 0) ? 1 : 0)
    }
  }

  res.json({ success: true })
})

app.delete('/api/admin/equipment/:id', authMiddleware, (req, res) => {
  const photos = db.prepare('SELECT filename FROM equipment_photos WHERE equipment_id = ?').all(req.params.id)
  for (const p of photos) {
    const filepath = join(UPLOADS_DIR, p.filename)
    if (existsSync(filepath)) unlinkSync(filepath)
  }
  db.prepare('DELETE FROM equipment WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

app.post('/api/admin/equipment/:id/photos', authMiddleware, upload.array('photos', 10), (req, res) => {
  const existing = db.prepare('SELECT id FROM equipment WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const hasPhotos = db.prepare('SELECT COUNT(*) as c FROM equipment_photos WHERE equipment_id = ?').get(req.params.id).c
  const insertPhoto = db.prepare('INSERT INTO equipment_photos (equipment_id, filename, is_primary) VALUES (?, ?, ?)')
  const ids = []
  for (let i = 0; i < req.files.length; i++) {
    const r = insertPhoto.run(req.params.id, req.files[i].filename, (!hasPhotos && i === 0) ? 1 : 0)
    ids.push(r.lastInsertRowid)
  }
  res.json({ ids })
})

app.delete('/api/admin/photos/:photoId', authMiddleware, (req, res) => {
  const photo = db.prepare('SELECT * FROM equipment_photos WHERE id = ?').get(req.params.photoId)
  if (!photo) return res.status(404).json({ error: 'Not found' })

  const filepath = join(UPLOADS_DIR, photo.filename)
  if (existsSync(filepath)) unlinkSync(filepath)
  db.prepare('DELETE FROM equipment_photos WHERE id = ?').run(req.params.photoId)

  if (photo.is_primary) {
    const next = db.prepare('SELECT id FROM equipment_photos WHERE equipment_id = ? ORDER BY sort_order, id LIMIT 1').get(photo.equipment_id)
    if (next) db.prepare('UPDATE equipment_photos SET is_primary = 1 WHERE id = ?').run(next.id)
  }
  res.json({ success: true })
})

app.put('/api/admin/photos/:photoId/primary', authMiddleware, (req, res) => {
  const photo = db.prepare('SELECT * FROM equipment_photos WHERE id = ?').get(req.params.photoId)
  if (!photo) return res.status(404).json({ error: 'Not found' })

  db.prepare('UPDATE equipment_photos SET is_primary = 0 WHERE equipment_id = ?').run(photo.equipment_id)
  db.prepare('UPDATE equipment_photos SET is_primary = 1 WHERE id = ?').run(req.params.photoId)
  res.json({ success: true })
})

// --- Static / SPA ---

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Yellowstone Tractor Demo running on port ${PORT}`)
})

// --- Helpers ---

function parsePhotos(row) {
  const { photo_data, ...rest } = row
  rest.photos = []
  if (photo_data) {
    rest.photos = photo_data.split('||').map(p => {
      const [id, filename, is_primary, sort_order] = p.split('::')
      return { id: Number(id), filename, is_primary: Number(is_primary), sort_order: Number(sort_order) }
    }).sort((a, b) => b.is_primary - a.is_primary || a.sort_order - b.sort_order)
  }
  if (rest.features && typeof rest.features === 'string') {
    rest.features = rest.features.split(',').map(f => f.trim()).filter(Boolean)
  } else {
    rest.features = []
  }
  return rest
}
