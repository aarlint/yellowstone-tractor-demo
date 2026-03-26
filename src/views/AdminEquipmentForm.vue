<template>
  <div class="p-4 pb-28">
    <div class="flex items-center gap-3 mb-6">
      <button @click="$router.back()" class="p-2 -ml-2 text-gray-500 hover:text-navy-900">
        <ArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-xl font-bold text-navy-900">{{ isEdit ? 'Edit' : 'New' }} Equipment</h1>
    </div>

    <div v-if="loadingItem" class="text-center py-12 text-gray-400">Loading...</div>

    <form v-else @submit.prevent="save" class="space-y-6">
      <!-- Basic Info -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Basic Info</h2>
        <input v-model="form.name" placeholder="Equipment name" required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
        <select v-model="form.brand" required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base bg-white">
          <option value="">Select Brand</option>
          <option>LS Tractor</option>
          <option>Bad Boy Mowers</option>
          <option>Other</option>
        </select>
        <select v-model="form.category" required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base bg-white">
          <option value="">Select Category</option>
          <option>Compact Tractor</option>
          <option>Utility Tractor</option>
          <option>Zero-Turn Mower</option>
          <option>Implement</option>
          <option>Trailer</option>
        </select>
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="form.condition" value="New" class="accent-amber-500 w-5 h-5" />
            <span class="text-base">New</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="form.condition" value="Used" class="accent-amber-500 w-5 h-5" />
            <span class="text-base">Used</span>
          </label>
        </div>
      </section>

      <!-- Specs -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Specs</h2>
        <div class="grid grid-cols-2 gap-3">
          <input v-model="form.engine_hp" placeholder="HP (e.g. 42 HP)"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
          <input v-model="form.transmission" placeholder="Transmission"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
          <input v-model="form.loader_lift_capacity" placeholder="Lift capacity"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
          <input v-model.number="form.year" type="number" placeholder="Year"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
        </div>
        <input v-if="form.condition === 'Used'" v-model.number="form.hours" type="number" placeholder="Hours"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
      </section>

      <!-- Pricing -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Pricing</h2>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="callForPricing" class="accent-amber-500 w-5 h-5" />
            <span class="text-base">Call for Pricing</span>
          </label>
        </div>
        <input v-if="!callForPricing" v-model="form.price" placeholder="$29,999"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
      </section>

      <!-- Description -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Description</h2>
        <textarea v-model="form.description" rows="3" placeholder="Describe this equipment..."
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base resize-none"></textarea>
      </section>

      <!-- Features -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Features</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="(f, i) in featureList" :key="i"
            class="flex items-center gap-1 bg-navy-900 text-white text-sm px-3 py-1.5 rounded-full">
            {{ f }}
            <button type="button" @click="removeFeature(i)" class="ml-1 hover:text-amber-500">
              <X class="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
        <div class="flex gap-2">
          <input v-model="newFeature" @keydown.enter.prevent="addFeature" placeholder="Add feature"
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none text-base" />
          <button type="button" @click="addFeature"
            class="px-4 py-3 bg-navy-900 text-white rounded-lg font-semibold">Add</button>
        </div>
      </section>

      <!-- Photos -->
      <section class="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <h2 class="font-semibold text-navy-900 text-sm uppercase tracking-wide">Photos</h2>

        <div v-if="existingPhotos.length || newPhotoPreviews.length" class="grid grid-cols-3 gap-3">
          <!-- Existing photos -->
          <div v-for="photo in existingPhotos" :key="photo.id" class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img :src="`/uploads/${photo.filename}`" class="w-full h-full object-cover" />
            <button type="button" @click="setPrimary(photo)"
              :class="['absolute top-1 left-1 p-1 rounded-full', photo.is_primary ? 'bg-amber-500 text-white' : 'bg-black/50 text-white/70']">
              <Star class="w-4 h-4" :fill="photo.is_primary ? 'currentColor' : 'none'" />
            </button>
            <button type="button" @click="deletePhoto(photo)"
              class="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white">
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- New photo previews -->
          <div v-for="(preview, i) in newPhotoPreviews" :key="'new-' + i" class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img :src="preview" class="w-full h-full object-cover" />
            <button type="button" @click="removeNewPhoto(i)"
              class="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white">
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <label class="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-amber-500 hover:text-amber-600 cursor-pointer transition-colors">
          <Camera class="w-5 h-5" />
          <span class="font-semibold">Add Photo</span>
          <input type="file" accept="image/*" capture="environment" multiple @change="onFileSelect" class="hidden" />
        </label>
      </section>

      <!-- Stock toggle -->
      <section class="bg-white rounded-xl p-4 border border-gray-200">
        <label class="flex items-center justify-between cursor-pointer">
          <span class="font-semibold text-navy-900">In Stock</span>
          <div class="relative">
            <input type="checkbox" v-model="inStock" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-amber-500 transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </div>
        </label>
      </section>

      <!-- Delete -->
      <button v-if="isEdit" type="button" @click="confirmDelete"
        class="w-full py-3 text-red-500 font-semibold text-center hover:bg-red-50 rounded-xl transition-colors">
        Delete Equipment
      </button>
    </form>

    <!-- Sticky save -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50">
      <button @click="save" :disabled="saving"
        class="w-full py-4 bg-amber-500 hover:bg-amber-600 text-navy-900 font-bold rounded-xl text-lg transition-colors disabled:opacity-50">
        {{ saving ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Equipment') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, X, Star, Camera } from 'lucide-vue-next'
import { useApi } from '../composables/useApi.js'

const route = useRoute()
const router = useRouter()
const { apiFetch, apiUpload } = useApi()

const isEdit = computed(() => route.params.id !== undefined)
const loadingItem = ref(false)
const saving = ref(false)

const form = ref({
  name: '',
  brand: '',
  category: '',
  condition: 'New',
  year: null,
  engine_hp: '',
  transmission: '',
  loader_lift_capacity: '',
  hours: null,
  price: '',
  description: '',
  sort_order: 0
})

const featureList = ref([])
const newFeature = ref('')
const callForPricing = ref(true)
const inStock = ref(true)

const existingPhotos = ref([])
const newPhotoFiles = ref([])
const newPhotoPreviews = ref([])

function addFeature() {
  const val = newFeature.value.trim()
  if (val && !featureList.value.includes(val)) {
    featureList.value.push(val)
    newFeature.value = ''
  }
}

function removeFeature(i) {
  featureList.value.splice(i, 1)
}

function onFileSelect(e) {
  const files = Array.from(e.target.files)
  for (const file of files) {
    newPhotoFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (ev) => newPhotoPreviews.value.push(ev.target.result)
    reader.readAsDataURL(file)
  }
  e.target.value = ''
}

function removeNewPhoto(i) {
  newPhotoFiles.value.splice(i, 1)
  newPhotoPreviews.value.splice(i, 1)
}

async function setPrimary(photo) {
  try {
    await apiFetch(`/api/admin/photos/${photo.id}/primary`, { method: 'PUT' })
    existingPhotos.value.forEach(p => p.is_primary = p.id === photo.id ? 1 : 0)
  } catch (e) {
    console.error('Failed to set primary:', e)
  }
}

async function deletePhoto(photo) {
  try {
    await apiFetch(`/api/admin/photos/${photo.id}`, { method: 'DELETE' })
    existingPhotos.value = existingPhotos.value.filter(p => p.id !== photo.id)
  } catch (e) {
    console.error('Failed to delete photo:', e)
  }
}

async function save() {
  saving.value = true
  try {
    const data = {
      ...form.value,
      features: featureList.value.join(','),
      price: callForPricing.value ? null : form.value.price,
      in_stock: inStock.value ? 1 : 0
    }

    const fd = new FormData()
    fd.append('data', JSON.stringify(data))
    for (const file of newPhotoFiles.value) {
      fd.append('photos', file)
    }

    if (isEdit.value) {
      await apiUpload(`/api/admin/equipment/${route.params.id}`, fd, 'PUT')
    } else {
      await apiUpload('/api/admin/equipment', fd)
    }

    router.push('/admin/equipment')
  } catch (e) {
    console.error('Failed to save:', e)
    alert('Failed to save equipment')
  } finally {
    saving.value = false
  }
}

async function confirmDelete() {
  if (!confirm('Delete this equipment?')) return
  try {
    await apiFetch(`/api/admin/equipment/${route.params.id}`, { method: 'DELETE' })
    router.push('/admin/equipment')
  } catch (e) {
    console.error('Failed to delete:', e)
  }
}

onMounted(async () => {
  if (!isEdit.value) return
  loadingItem.value = true
  try {
    const item = await apiFetch(`/api/equipment/${route.params.id}`)
    form.value = {
      name: item.name,
      brand: item.brand,
      category: item.category,
      condition: item.condition || 'New',
      year: item.year,
      engine_hp: item.engine_hp || '',
      transmission: item.transmission || '',
      loader_lift_capacity: item.loader_lift_capacity || '',
      hours: item.hours,
      price: item.price || '',
      description: item.description || '',
      sort_order: item.sort_order || 0
    }
    featureList.value = item.features || []
    callForPricing.value = !item.price
    inStock.value = !!item.in_stock
    existingPhotos.value = item.photos || []
  } catch (e) {
    console.error('Failed to load item:', e)
  } finally {
    loadingItem.value = false
  }
})
</script>
