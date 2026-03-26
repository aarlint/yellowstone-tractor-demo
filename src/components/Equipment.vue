<template>
  <section id="equipment" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-2 mb-4">
          <Tractor class="w-5 h-5 text-amber-500" />
          <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Inventory</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4">
          Featured Equipment
        </h2>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Browse our selection of new LS Tractors and Bad Boy Mowers. Contact us for current pricing and availability.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button v-for="cat in categories" :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2 rounded-full text-sm font-semibold transition-colors',
            activeCategory === cat
              ? 'bg-navy-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]">
          {{ cat }}
        </button>
      </div>

      <div v-if="loading" class="text-center py-12 text-gray-400">Loading equipment...</div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link v-for="item in filtered" :key="item.id"
          :to="`/equipment/${item.id}`"
          class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 block">
          <div class="h-48 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center overflow-hidden">
            <img v-if="primaryPhoto(item)" :src="`/uploads/${primaryPhoto(item)}`"
              :alt="item.name" class="w-full h-full object-cover" />
            <component v-else :is="item.brand === 'LS Tractor' ? Tractor : Fan"
              class="w-16 h-16 text-amber-500/60" />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-amber-500 uppercase">{{ item.brand }}</span>
              <div class="flex items-center gap-2">
                <span v-if="item.condition === 'Used'" class="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">Used</span>
                <span class="text-xs bg-navy-900 text-white px-2 py-1 rounded-full">{{ item.engine_hp }}</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-1">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ item.description }}</p>

            <div v-if="item.price" class="mb-3">
              <span class="text-lg font-bold text-amber-600">{{ item.price }}</span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <Cog class="w-4 h-4 text-gray-400" />
                <span>{{ item.engine_hp }} &middot; {{ item.transmission }}</span>
              </div>
              <div v-if="item.hours" class="flex items-center gap-2 text-sm text-gray-600">
                <Clock class="w-4 h-4 text-gray-400" />
                <span>{{ item.hours }} hours</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="f in item.features" :key="f"
                class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {{ f }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Tractor, Fan, Cog, Clock } from 'lucide-vue-next'

const items = ref([])
const loading = ref(true)
const categories = ['All', 'Compact Tractor', 'Utility Tractor', 'Zero-Turn Mower', 'Implement', 'Trailer']
const activeCategory = ref('All')

const filtered = computed(() => {
  const active = categories.filter(c => c !== 'All').filter(c =>
    items.value.some(e => e.category === c)
  )
  const visibleCats = ['All', ...active]
  if (activeCategory.value === 'All') return items.value
  return items.value.filter(e => e.category === activeCategory.value)
})

const visibleCategories = computed(() => {
  const active = categories.filter(c => c !== 'All').filter(c =>
    items.value.some(e => e.category === c)
  )
  return ['All', ...active]
})

function primaryPhoto(item) {
  if (!item.photos?.length) return null
  const primary = item.photos.find(p => p.is_primary)
  return (primary || item.photos[0])?.filename
}

onMounted(async () => {
  try {
    const res = await fetch('/api/equipment')
    items.value = await res.json()
  } catch (e) {
    console.error('Failed to load equipment:', e)
  } finally {
    loading.value = false
  }
})
</script>
