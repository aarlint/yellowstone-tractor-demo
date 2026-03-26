<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <main class="pt-16">
      <div v-if="loading" class="flex items-center justify-center py-32 text-gray-400">
        Loading...
      </div>

      <div v-else-if="!item" class="flex flex-col items-center justify-center py-32 text-gray-400">
        <p class="text-lg mb-4">Equipment not found</p>
        <router-link to="/#equipment" class="text-amber-500 hover:text-amber-600 font-semibold">
          Back to Equipment
        </router-link>
      </div>

      <div v-else>
        <!-- Back link -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <router-link to="/#equipment"
            class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-500 transition-colors">
            <ArrowLeft class="w-4 h-4" />
            Back to Equipment
          </router-link>
        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div class="grid lg:grid-cols-2 gap-10">
            <!-- Photo Gallery -->
            <div>
              <div class="rounded-2xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 aspect-[4/3] flex items-center justify-center">
                <img v-if="activePhoto" :src="`/uploads/${activePhoto}`"
                  :alt="item.name" class="w-full h-full object-cover" />
                <component v-else :is="item.brand === 'LS Tractor' ? Tractor : Fan"
                  class="w-20 h-20 text-amber-500/60" />
              </div>
              <div v-if="item.photos?.length > 1" class="flex gap-2 mt-3 overflow-x-auto pb-2">
                <button v-for="photo in item.photos" :key="photo.id"
                  @click="activePhoto = photo.filename"
                  :class="[
                    'w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors',
                    activePhoto === photo.filename ? 'border-amber-500' : 'border-transparent hover:border-gray-300'
                  ]">
                  <img :src="`/uploads/${photo.filename}`" :alt="item.name"
                    class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <!-- Details -->
            <div>
              <!-- Header -->
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-semibold text-amber-500 uppercase">{{ item.brand }}</span>
                <span v-if="item.condition === 'Used'"
                  class="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">Used</span>
                <span v-if="item.engine_hp"
                  class="text-xs bg-navy-900 text-white px-2 py-1 rounded-full">{{ item.engine_hp }}</span>
              </div>
              <h1 class="text-3xl font-extrabold text-navy-900 mb-4">{{ item.name }}</h1>

              <!-- Price -->
              <div class="mb-6">
                <span v-if="item.price" class="text-2xl font-bold text-amber-600">{{ item.price }}</span>
                <span v-else class="text-lg text-gray-500 italic">Call for Pricing</span>
              </div>

              <!-- Description -->
              <p v-if="item.description" class="text-gray-600 leading-relaxed mb-6">{{ item.description }}</p>

              <!-- Specs Grid -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div v-if="item.engine_hp" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Engine</div>
                  <div class="font-semibold text-navy-900">{{ item.engine_hp }}</div>
                </div>
                <div v-if="item.transmission" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Transmission</div>
                  <div class="font-semibold text-navy-900">{{ item.transmission }}</div>
                </div>
                <div v-if="item.lift_capacity" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Lift Capacity</div>
                  <div class="font-semibold text-navy-900">{{ item.lift_capacity }}</div>
                </div>
                <div v-if="item.hours" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Hours</div>
                  <div class="font-semibold text-navy-900">{{ item.hours }}</div>
                </div>
                <div v-if="item.year" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Year</div>
                  <div class="font-semibold text-navy-900">{{ item.year }}</div>
                </div>
              </div>

              <!-- Features -->
              <div v-if="item.features?.length" class="mb-8">
                <h3 class="text-sm font-semibold text-gray-400 uppercase mb-3">Features</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="f in item.features" :key="f"
                    class="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    {{ f }}
                  </span>
                </div>
              </div>

              <!-- Contact CTA -->
              <router-link to="/#contact"
                class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                <MessageSquare class="w-5 h-5" />
                Inquire About This Equipment
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Tractor, Fan, ArrowLeft, MessageSquare } from 'lucide-vue-next'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const item = ref(null)
const loading = ref(true)
const activePhoto = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`/api/equipment/${route.params.id}`)
    if (!res.ok) throw new Error('Not found')
    item.value = await res.json()
    // Set initial active photo
    if (item.value.photos?.length) {
      const primary = item.value.photos.find(p => p.is_primary)
      activePhoto.value = (primary || item.value.photos[0]).filename
    }
  } catch (e) {
    console.error('Failed to load equipment:', e)
  } finally {
    loading.value = false
  }
})
</script>
