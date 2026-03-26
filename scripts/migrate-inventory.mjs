#!/usr/bin/env node
/**
 * Migrate equipment from yellowstone-tractor.com into the running demo.
 * Usage: node scripts/migrate-inventory.mjs
 */

const BASE = process.env.API_URL || 'https://yellowstone-tractor-demo.notdone.dev'

const equipment = [
  {
    name: '9048 Montana Tractor (LS P7030) - Cab Loader',
    brand: 'LS Tractor',
    category: 'Utility Tractor',
    condition: 'Used',
    engine_hp: '88 HP',
    hours: 2200,
    warranty: null,
    description: 'This used but like new tractor has only 2,200 hours on it! Pre-Emission Engine - no DEF, no DPF! Cab with A/C and heat making it perfect for all seasons! It also has a set of brand new front tires!',
    features: 'Cab,A/C & Heat,Pre-Emission Engine,Front Loader,New Front Tires',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0766.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0757.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0765.jpeg',
    ],
  },
  {
    name: 'Bad Boy 1025 Tractor',
    brand: 'Bad Boy',
    category: 'Compact Tractor',
    condition: 'New',
    engine_hp: '25 HP',
    loader_lift_capacity: '992 lbs',
    warranty: '6 Year',
    description: 'Brand new Bad Boy 1025 compact tractor with loader. Perfect for small acreage and property maintenance.',
    features: 'Front Loader,Compact',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0758.jpeg',
    ],
  },
  {
    name: 'Bad Boy 3026',
    brand: 'Bad Boy',
    category: 'Compact Tractor',
    condition: 'New',
    engine_hp: '25 HP',
    loader_lift_capacity: '1,433 lbs',
    warranty: '6 Year',
    description: 'Brand new Bad Boy 3026 compact tractor. Standard 6 Year Warranty included.',
    features: 'Front Loader,6 Year Warranty',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0755.jpeg',
    ],
  },
  {
    name: 'Bad Boy 4035C',
    brand: 'Bad Boy',
    category: 'Compact Tractor',
    condition: 'New',
    engine_hp: '35 HP',
    loader_lift_capacity: '2,200 lbs',
    warranty: '6 Year',
    description: 'Brand new Bad Boy 4035C compact tractor with heavy-duty loader. Standard 6 Year Warranty.',
    features: 'Front Loader,6 Year Warranty,Heavy Duty',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0437.jpeg',
    ],
  },
  {
    name: 'LS MT 242 H Premium',
    brand: 'LS Tractor',
    category: 'Compact Tractor',
    condition: 'New',
    engine_hp: '42 HP',
    loader_lift_capacity: '2,063 lbs',
    warranty: '6 Year',
    description: 'Brand new LS MT 242 H Premium compact tractor. Standard 6 Year Warranty. HST transmission for easy operation.',
    features: 'HST,Front Loader,6 Year Warranty,Premium Package',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0760.jpeg',
    ],
  },
  {
    name: 'LS MT 242 HC',
    brand: 'LS Tractor',
    category: 'Compact Tractor',
    condition: 'New',
    year: 2025,
    engine_hp: '42 HP',
    warranty: '6 Year',
    description: 'Brand new 2025 LS MT 242 HC with cab. Standard 6 Year Warranty.',
    features: 'HST,Cab,6 Year Warranty',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0428.jpeg',
    ],
  },
  {
    name: 'LS MT 357 HC Premium',
    brand: 'LS Tractor',
    category: 'Utility Tractor',
    condition: 'New',
    engine_hp: '57 HP',
    loader_lift_capacity: '2,680 lbs',
    warranty: '6 Year',
    description: 'Brand new LS MT 357 HC Premium utility tractor. Standard 6 Year Warranty. Cab with loader for all-season comfort.',
    features: 'Cab,Front Loader,6 Year Warranty,Premium Package',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0749.jpeg',
    ],
  },
  {
    name: 'LS MT 473cps Tractor',
    brand: 'LS Tractor',
    category: 'Utility Tractor',
    condition: 'New',
    year: 2024,
    engine_hp: '73 HP',
    loader_lift_capacity: '3,488 lbs',
    warranty: '6 Year',
    description: 'Brand new 2024 LS MT 473cps utility tractor. Standard 6 Year Warranty. Power shuttle transmission.',
    features: 'Power Shuttle,Front Loader,6 Year Warranty,Cab',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0752.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0753.jpeg',
    ],
  },
  {
    name: 'LS MT125',
    brand: 'LS Tractor',
    category: 'Compact Tractor',
    condition: 'New',
    engine_hp: '25 HP',
    loader_lift_capacity: '966 lbs',
    warranty: '6 Year',
    description: 'Brand new LS MT125 sub-compact tractor. Perfect entry-level tractor for acreage owners.',
    features: 'Front Loader,Compact,HST',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/06/IMG_0751.jpeg',
    ],
  },
  {
    name: 'Bad Boy MZ Magnum 54" Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '22 HP',
    deck_size: '54"',
    warranty: '3 Year',
    description: 'Brand new Bad Boy MZ Magnum with 54-inch cutting deck. Zero-turn residential mower.',
    features: '54" Deck,Zero-Turn',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0780.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0779.jpeg',
    ],
  },
  {
    name: 'Bad Boy Revolt 36" Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '22 HP',
    deck_size: '36"',
    warranty: '3 Year',
    description: 'Brand new Bad Boy Revolt 36-inch zero-turn mower. Compact design perfect for smaller yards and tight spaces.',
    features: '36" Deck,Zero-Turn,Compact',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0771.jpeg',
    ],
  },
  {
    name: 'Bad Boy Revolt 48" Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '23.5 HP',
    deck_size: '48"',
    warranty: '3 Year',
    description: 'Brand new Bad Boy Revolt 48-inch zero-turn mower. Great mid-size option for residential lawns.',
    features: '48" Deck,Zero-Turn',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0775.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0774.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0772-1.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0773.jpeg',
    ],
  },
  {
    name: 'Bad Boy Rouge 61" Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '35 HP',
    deck_size: '61"',
    warranty: '5 Year',
    description: 'Brand new Bad Boy Rouge 61-inch zero-turn mower. Commercial-grade power for large properties.',
    features: '61" Deck,Zero-Turn,Commercial Grade',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0778.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0776.jpeg',
    ],
  },
  {
    name: 'Bad Boy ZT 54" Avenger Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '23 HP',
    deck_size: '54"',
    warranty: '3 Year',
    description: 'Brand new Bad Boy ZT Avenger with 54-inch deck. Reliable residential zero-turn mower.',
    features: '54" Deck,Zero-Turn',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0785.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0786.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0787.jpeg',
    ],
  },
  {
    name: 'Bad Boy ZT Elite 54" Mower',
    brand: 'Bad Boy Mowers',
    category: 'Zero-Turn Mower',
    condition: 'New',
    engine_hp: '24 HP',
    deck_size: '54"',
    warranty: '3 Year',
    description: 'Brand new Bad Boy ZT Elite with 54-inch deck. Premium residential zero-turn mower.',
    features: '54" Deck,Zero-Turn,Elite Package',
    images: [
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0782.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0783.jpeg',
      'https://yellowstone-tractor.com/wp-content/uploads/2025/07/IMG_0784.jpeg',
    ],
  },
]

async function login() {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'demoadmin', password: 'demo1234' }),
  })
  const { token } = await res.json()
  return token
}

async function deleteAll(token) {
  const res = await fetch(`${BASE}/api/admin/equipment`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const items = await res.json()
  for (const item of items) {
    await fetch(`${BASE}/api/admin/equipment/${item.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(`  Deleted: ${item.name}`)
  }
}

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`)
  const buffer = await res.arrayBuffer()
  return Buffer.from(buffer)
}

async function createEquipment(token, item, index) {
  // Download images
  const imageBuffers = []
  for (const url of item.images) {
    try {
      const buf = await downloadImage(url)
      const filename = url.split('/').pop()
      imageBuffers.push({ buf, filename })
    } catch (e) {
      console.warn(`  Warning: Could not download ${url}: ${e.message}`)
    }
  }

  // Build multipart form
  const formData = new FormData()
  const data = {
    name: item.name,
    brand: item.brand,
    category: item.category,
    condition: item.condition,
    year: item.year || null,
    engine_hp: item.engine_hp || null,
    transmission: item.transmission || null,
    loader_lift_capacity: item.loader_lift_capacity || null,
    hours: item.hours || null,
    price: item.price || null,
    description: item.description || null,
    features: item.features || null,
    warranty: item.warranty || null,
    deck_size: item.deck_size || null,
    in_stock: 1,
    sort_order: index,
  }
  formData.append('data', JSON.stringify(data))

  for (const { buf, filename } of imageBuffers) {
    formData.append('photos', new Blob([buf], { type: 'image/jpeg' }), filename)
  }

  const res = await fetch(`${BASE}/api/admin/equipment`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create ${item.name}: ${res.status} ${text}`)
  }

  const result = await res.json()
  console.log(`  Created: ${item.name} (id=${result.id}, ${imageBuffers.length} photos)`)
}

async function main() {
  console.log(`Migrating inventory to ${BASE}`)
  console.log()

  console.log('Logging in...')
  const token = await login()
  console.log('Authenticated')
  console.log()

  console.log('Deleting existing equipment...')
  await deleteAll(token)
  console.log()

  console.log(`Creating ${equipment.length} equipment items...`)
  for (let i = 0; i < equipment.length; i++) {
    await createEquipment(token, equipment[i], i)
  }

  console.log()
  console.log('Migration complete!')
}

main().catch(console.error)
