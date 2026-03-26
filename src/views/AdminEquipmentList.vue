<template>
  <div class="p-4 pb-24">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-bold text-navy-900">Equipment</h1>
      <span class="text-sm text-gray-500">{{ items.length }} items</span>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400">Loading...</div>

    <div v-else class="space-y-3">
      <router-link v-for="item in items" :key="item.id" :to="`/admin/equipment/${item.id}`"
        class="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200 hover:border-amber-300 transition-colors">
        <div class="w-16 h-16 rounded-lg bg-navy-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img v-if="primaryPhoto(item)" :src="`/uploads/${primaryPhoto(item)}`"
            :alt="item.name" class="w-full h-full object-cover" />
          <Tractor v-else class="w-6 h-6 text-amber-500/60" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-navy-900 truncate">{{ item.name }}</h3>
            <span :class="[
              'text-xs px-2 py-0.5 rounded-full flex-shrink-0',
              item.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]">{{ item.in_stock ? 'In Stock' : 'Out' }}</span>
          </div>
          <p class="text-sm text-gray-500 truncate">{{ item.brand }} &middot; {{ item.category }}</p>
          <p v-if="item.price" class="text-sm font-semibold text-amber-600">{{ item.price }}</p>
        </div>
        <ChevronRight class="w-5 h-5 text-gray-400 flex-shrink-0" />
      </router-link>
    </div>

    <router-link to="/admin/equipment/new"
      class="fixed bottom-6 right-6 w-14 h-14 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
      <Plus class="w-7 h-7 text-navy-900" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Tractor, ChevronRight, Plus } from 'lucide-vue-next'
import { useApi } from '../composables/useApi.js'

const { apiFetch } = useApi()
const items = ref([])
const loading = ref(true)

function primaryPhoto(item) {
  if (!item.photos?.length) return null
  const primary = item.photos.find(p => p.is_primary)
  return (primary || item.photos[0])?.filename
}

onMounted(async () => {
  try {
    items.value = await apiFetch('/api/admin/equipment')
  } catch (e) {
    console.error('Failed to load equipment:', e)
  } finally {
    loading.value = false
  }
})
</script>
