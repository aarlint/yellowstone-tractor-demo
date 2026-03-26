<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-2 mb-4">
          <Star class="w-5 h-5 text-amber-500" />
          <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Our Brands</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Premium Equipment Lines
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
          <div class="flex items-center gap-4 mb-6">
            <img src="/images/ls-tractor-logo.png" alt="LS Tractor" class="h-10 w-auto" />
          </div>
          <p class="text-gray-600 leading-relaxed mb-6">
            South Korea's leading tractor manufacturer, delivering reliable power and advanced features at an exceptional value. From 24 HP compact models to 73+ HP utility tractors — built for real work.
          </p>
          <ul class="space-y-3">
            <li v-for="feature in lsFeatures" :key="feature" class="flex items-center gap-3 text-gray-700">
              <Check class="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
          <div class="flex items-center gap-4 mb-6">
            <img src="/images/badboy-logo.svg" alt="Bad Boy Mowers" class="h-10 w-auto" />
          </div>
          <p class="text-gray-600 leading-relaxed mb-6">
            American-made zero-turn mowers engineered for performance and durability. From residential lawns to commercial properties — Bad Boy builds mowers that don't quit.
          </p>
          <ul class="space-y-3">
            <li v-for="feature in bbFeatures" :key="feature" class="flex items-center gap-3 text-gray-700">
              <Check class="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star, Tractor, Fan, Check } from 'lucide-vue-next'

const lsFeatures = [
  '24–73+ HP range for any operation',
  'Industry-leading warranty coverage',
  'HST and shuttle shift transmissions',
  'Cab and ROPS configurations'
]

const bbFeatures = [
  'Heavy-duty welded steel decks',
  'Commercial-grade hydro systems',
  'Residential through commercial models',
  'Industry-best seat comfort'
]
</script>
