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

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in filtered" :key="item.id"
          class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
          <div class="h-48 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
            <component :is="item.brand === 'LS Tractor' ? Tractor : Fan"
              class="w-16 h-16 text-amber-500/60" />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-amber-500 uppercase">{{ item.brand }}</span>
              <span class="text-xs bg-navy-900 text-white px-2 py-1 rounded-full">{{ item.hp }}</span>
            </div>
            <h3 class="text-xl font-bold text-navy-900 mb-1">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ item.tagline }}</p>

            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <Cog class="w-4 h-4 text-gray-400" />
                <span>{{ item.engine }} &middot; {{ item.transmission }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="f in item.features" :key="f"
                class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {{ f }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Tractor, Fan, Cog } from 'lucide-vue-next'
import { equipment } from '../data/inventory.js'

const categories = ['All', 'Compact Tractor', 'Utility Tractor', 'Zero-Turn Mower']
const activeCategory = ref('All')

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? equipment
    : equipment.filter(e => e.category === activeCategory.value)
)
</script>
