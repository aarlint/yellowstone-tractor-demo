import Database from 'better-sqlite3'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DATA_DIR = process.env.DATA_DIR || join(__dirname, 'data')
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

const UPLOADS_DIR = join(DATA_DIR, 'uploads')
if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true })

const db = new Database(join(DATA_DIR, 'yellowstone.db'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    condition TEXT DEFAULT 'New',
    year INTEGER,
    engine_hp TEXT,
    transmission TEXT,
    loader_lift_capacity TEXT,
    hours INTEGER,
    price TEXT,
    description TEXT,
    features TEXT,
    in_stock INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS equipment_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    is_primary INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`)

function seed() {
  const count = db.prepare('SELECT COUNT(*) as c FROM equipment').get().c
  if (count > 0) return

  const insert = db.prepare(`
    INSERT INTO equipment (name, brand, category, condition, engine_hp, transmission, features, description)
    VALUES (@name, @brand, @category, @condition, @engine_hp, @transmission, @features, @description)
  `)

  const items = [
    {
      name: 'MT225HE',
      brand: 'LS Tractor',
      category: 'Compact Tractor',
      condition: 'New',
      engine_hp: '24.4 HP',
      transmission: 'HST',
      features: '4WD,Front Loader Ready,Mid PTO',
      description: 'Perfect for acreage owners and hobby farms'
    },
    {
      name: 'MT240HE',
      brand: 'LS Tractor',
      category: 'Compact Tractor',
      condition: 'New',
      engine_hp: '39 HP',
      transmission: 'HST',
      features: '4WD,Cab Available,Industrial Loader',
      description: 'Versatile mid-size for serious property work'
    },
    {
      name: 'MT355HC',
      brand: 'LS Tractor',
      category: 'Utility Tractor',
      condition: 'New',
      engine_hp: '55 HP',
      transmission: '12x12 Shuttle',
      features: '4WD,Heated Cab,Rear Remote',
      description: 'Full-size power for ranch and farm operations'
    },
    {
      name: 'MT573',
      brand: 'LS Tractor',
      category: 'Utility Tractor',
      condition: 'New',
      engine_hp: '73 HP',
      transmission: '16x16 Power Shuttle',
      features: '4WD,Premium Cab,Dual Remotes',
      description: 'Heavy-duty performer for demanding jobs'
    },
    {
      name: 'Revolt SD 54"',
      brand: 'Bad Boy Mowers',
      category: 'Zero-Turn Mower',
      condition: 'New',
      engine_hp: '27 HP',
      transmission: 'Dual Hydro',
      features: '54" Deck,Suspension Seat,10 MPH',
      description: 'Residential zero-turn with commercial DNA'
    },
    {
      name: 'Rogue 61"',
      brand: 'Bad Boy Mowers',
      category: 'Zero-Turn Mower',
      condition: 'New',
      engine_hp: '35 HP',
      transmission: 'Dual Hydro',
      features: '61" Deck,LED Lights,Heavy Duty Frame',
      description: 'Commercial-grade for the toughest properties'
    }
  ]

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row)
  })
  insertMany(items)
  console.log('Seeded 6 equipment items')
}

seed()

export { db, DATA_DIR, UPLOADS_DIR }
