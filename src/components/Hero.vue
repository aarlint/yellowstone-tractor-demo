<template>
  <section class="relative min-h-screen flex items-center bg-navy-900 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900"></div>
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-80 h-80 bg-amber-600 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="flex items-center gap-2 mb-6">
          <Award class="w-5 h-5 text-amber-500" />
          <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">LS Dealer Excellence Award Winner</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Montana's Trusted
          <span class="text-amber-500">Equipment Dealer</span>
        </h1>

        <p class="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          Family-owned since 1991. Three locations serving western Montana with premium tractors, mowers, and expert service.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/#equipment"
            class="bg-amber-500 hover:bg-amber-600 text-navy-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center">
            Browse Equipment
          </a>
          <a href="/#contact"
            class="border-2 border-white/20 hover:border-amber-500 text-white hover:text-amber-500 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center">
            Contact Us
          </a>
        </div>

        <div class="mt-16 grid grid-cols-3 gap-8 max-w-lg">
          <div>
            <div class="text-3xl font-extrabold text-white">35+</div>
            <div class="text-gray-400 text-sm">Years in Business</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-white">3</div>
            <div class="text-gray-400 text-sm">MT Locations</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-white">2</div>
            <div class="text-gray-400 text-sm">Premium Brands</div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block">
        <img src="/images/hero-tractor.jpg" alt="LS Tractor"
          class="w-full rounded-2xl shadow-2xl shadow-black/30 border border-white/10" />
      </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Award } from 'lucide-vue-next'
</script>
