<template>
  <nav class="fixed top-0 w-full z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center gap-2">
          <Tractor class="w-7 h-7 text-amber-500" />
          <span class="text-white font-bold text-lg">Yellowstone Tractor</span>
        </router-link>

        <button @click="open = !open" class="md:hidden text-white">
          <Menu v-if="!open" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>

        <div class="hidden md:flex items-center gap-6">
          <a v-for="link in links" :key="link.href" :href="'/' + link.href"
            class="text-gray-300 hover:text-amber-500 text-sm font-medium transition-colors">
            {{ link.label }}
          </a>
          <a href="/#contact"
            class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Get a Quote
          </a>
        </div>
      </div>

      <div v-if="open" class="md:hidden pb-4 space-y-2">
        <a v-for="link in links" :key="link.href" :href="'/' + link.href" @click="open = false"
          class="block text-gray-300 hover:text-amber-500 py-2 text-sm font-medium transition-colors">
          {{ link.label }}
        </a>
        <a href="/#contact" @click="open = false"
          class="block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors">
          Get a Quote
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Tractor, Menu, X } from 'lucide-vue-next'

const open = ref(false)

const links = [
  { href: '#about', label: 'About' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#services', label: 'Services' },
  { href: '#financing', label: 'Financing' },
  { href: '#locations', label: 'Locations' }
]
</script>
