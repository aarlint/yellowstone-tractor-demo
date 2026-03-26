<template>
  <footer class="bg-navy-900 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <Tractor class="w-6 h-6 text-amber-500" />
            <span class="text-white font-bold text-lg">Yellowstone Tractor</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-md">
            Family-owned and operated since 1991. Your authorized LS Tractor and Bad Boy Mowers dealer serving western Montana from three convenient locations.
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.href">
              <a :href="'/' + link.href" class="text-gray-400 hover:text-amber-500 text-sm transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <div class="space-y-2 text-sm text-gray-400">
            <p>Belgrade: (406) 388-2423</p>
            <p>Victor: (406) 642-6090</p>
            <p>Kalispell: (406) 579-7297</p>
            <p class="pt-2">yellowstonetractor@yahoo.com</p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm">
          Demo site — modern redesign concept for Yellowstone Tractor & Equipment
        </p>
        <div class="flex items-center gap-4">
          <p class="text-gray-500 text-sm">
            Built on the notdone.dev platform
          </p>
          <router-link to="/admin/login" class="text-gray-600 hover:text-gray-400 text-xs transition-colors">
            Admin
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Tractor } from 'lucide-vue-next'

const links = [
  { href: '#about', label: 'About Us' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#services', label: 'Services' },
  { href: '#financing', label: 'Financing' },
  { href: '#locations', label: 'Locations' },
  { href: '#contact', label: 'Contact' }
]
</script>
