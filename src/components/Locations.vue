<template>
  <section id="locations" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-2 mb-4">
          <MapPin class="w-5 h-5 text-amber-500" />
          <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Find Us</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4">
          Three Locations Across Montana
        </h2>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Serving the Gallatin Valley, Bitterroot Valley, and Flathead Valley with sales, service, and parts.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="loc in locations" :key="loc.city"
          class="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-5">
            <MapPin class="w-6 h-6 text-amber-500" />
          </div>
          <h3 class="text-2xl font-bold text-navy-900 mb-1">{{ loc.city }}</h3>
          <p class="text-sm text-amber-600 font-medium mb-4">{{ loc.note }}</p>

          <div class="space-y-3 text-sm text-gray-600">
            <div class="flex items-start gap-3">
              <Navigation class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span>{{ loc.address }}<br />{{ loc.city }}, {{ loc.state }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-4 h-4 text-gray-400 flex-shrink-0" />
              <a :href="'tel:' + loc.phone.replace(/[^0-9]/g, '')"
                class="hover:text-amber-500 transition-colors">{{ loc.phone }}</a>
            </div>
            <div class="flex items-center gap-3">
              <Clock class="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{{ loc.hours }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin, Navigation, Phone, Clock } from 'lucide-vue-next'
import { locations } from '../data/inventory.js'
</script>
