<template>
  <section id="contact" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <MessageSquare class="w-5 h-5 text-amber-500" />
            <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Ready to Find Your Equipment?
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            Fill out the form and our team will get back to you within one business day. Or call any of our locations directly — we're happy to help.
          </p>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Phone class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div class="font-semibold text-navy-900">Belgrade (Main)</div>
                <a href="tel:4063884599" class="text-gray-500 hover:text-amber-500 transition-colors">(406) 388-4599</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Mail class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div class="font-semibold text-navy-900">Email</div>
                <span class="text-gray-500">info@yellowstonetractor.com</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
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
              <label class="block text-sm font-semibold text-navy-900 mb-1">Interested In</label>
              <select v-model="form.interest"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition bg-white">
                <option value="">Select an option</option>
                <option>Compact Tractors</option>
                <option>Utility Tractors</option>
                <option>Zero-Turn Mowers</option>
                <option>Service & Repair</option>
                <option>Parts</option>
                <option>Other</option>
              </select>
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
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { MessageSquare, Phone, Mail, Check } from 'lucide-vue-next'

const submitted = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  interest: '',
  message: ''
})

function handleSubmit() {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' })
  }, 3000)
}
</script>
