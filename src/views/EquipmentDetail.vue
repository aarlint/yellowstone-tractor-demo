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
              <div class="mb-4">
                <span v-if="item.price" class="text-2xl font-bold text-amber-600">{{ item.price }}</span>
                <span v-else class="text-lg text-gray-500 italic">Call for Pricing</span>
              </div>

              <!-- Warranty badge -->
              <div v-if="item.warranty" class="mb-6 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200">
                <ShieldCheck class="w-4 h-4" />
                {{ item.warranty }} Warranty
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
                <div v-if="item.loader_lift_capacity" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Lift Capacity</div>
                  <div class="font-semibold text-navy-900">{{ item.loader_lift_capacity }}</div>
                </div>
                <div v-if="item.deck_size" class="bg-white rounded-xl p-4 border border-gray-100">
                  <div class="text-xs text-gray-400 uppercase mb-1">Deck Size</div>
                  <div class="font-semibold text-navy-900">{{ item.deck_size }}</div>
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
              <button @click="showForm = !showForm"
                class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <MessageSquare class="w-5 h-5" />
                Inquire About This Equipment
              </button>
            </div>
          </div>
        </div>

        <!-- Inline Inquiry Form -->
        <div v-if="showForm" id="inquiry-form" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 class="text-xl font-bold text-navy-900 mb-1">Inquire About This Equipment</h2>
            <p class="text-sm text-gray-500 mb-6">{{ item.name }}</p>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-navy-900 mb-1">First Name</label>
                  <input v-model="form.firstName" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-navy-900 mb-1">Last Name</label>
                  <input v-model="form.lastName" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-navy-900 mb-1">Email</label>
                <input v-model="form.email" type="email" required
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-navy-900 mb-1">Phone</label>
                <input v-model="form.phone" type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-navy-900 mb-1">Message</label>
                <textarea v-model="form.message" rows="4"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition resize-none"></textarea>
              </div>

              <button type="submit"
                :class="[
                  'w-full py-4 rounded-lg font-bold text-lg transition-colors',
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                ]">
                <span v-if="submitted" class="flex items-center justify-center gap-2">
                  <Check class="w-5 h-5" /> Message Sent
                </span>
                <span v-else>Send Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Tractor, Fan, ArrowLeft, MessageSquare, Check, ShieldCheck } from 'lucide-vue-next'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const item = ref(null)
const loading = ref(true)
const activePhoto = ref(null)
const showForm = ref(false)
const submitted = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

function handleSubmit() {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    showForm.value = false
    Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', message: '' })
  }, 3000)
}

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
