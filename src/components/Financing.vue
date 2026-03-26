<template>
  <section id="financing" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <BadgeDollarSign class="w-5 h-5 text-amber-500" />
            <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Financing</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Flexible Payment Options
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            We work with multiple lending partners to find the right financing for your budget. Whether you're purchasing a compact tractor for your acreage or outfitting a commercial operation, we'll help you get the equipment you need.
          </p>

          <div class="space-y-4">
            <div v-for="partner in financingPartners" :key="partner.name"
              class="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100">
              <div class="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 class="font-bold text-navy-900">{{ partner.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ partner.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-navy-900 rounded-2xl p-10 text-white">
          <Calculator class="w-12 h-12 text-amber-500 mb-6" />
          <h3 class="text-2xl font-bold mb-4">Why Finance With Us?</h3>
          <ul class="space-y-4">
            <li v-for="benefit in benefits" :key="benefit" class="flex items-start gap-3">
              <Check class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-300">{{ benefit }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BadgeDollarSign, Building2, Calculator, Check } from 'lucide-vue-next'
import { financingPartners } from '../data/inventory.js'

const benefits = [
  'Competitive rates from multiple lenders',
  'Quick approval process — often same day',
  'Seasonal payment plans for agricultural operations',
  'Trade-in valuations to lower your payment',
  'No prepayment penalties on most plans',
  'Dedicated financing specialist at each location'
]
</script>
