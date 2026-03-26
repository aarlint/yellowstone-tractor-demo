<template>
  <section id="services" class="py-24 bg-navy-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-2 mb-4">
          <Wrench class="w-5 h-5 text-amber-500" />
          <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">What We Do</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Service & Support
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          From routine maintenance to major repairs, our factory-trained team keeps your equipment running strong.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="svc in services" :key="svc.title"
          class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-colors">
          <component :is="iconMap[svc.icon]" class="w-10 h-10 text-amber-500 mb-5" />
          <h3 class="text-xl font-bold text-white mb-3">{{ svc.title }}</h3>
          <p class="text-gray-400 leading-relaxed">{{ svc.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Wrench, Truck, ClipboardCheck, Package, Cog, ShieldCheck } from 'lucide-vue-next'
import { services } from '../data/inventory.js'

const iconMap = { Wrench, Truck, ClipboardCheck, Package, Cog, ShieldCheck }
</script>
