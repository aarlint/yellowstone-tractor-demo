<template>
  <section id="about" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <Users class="w-5 h-5 text-amber-500" />
            <span class="text-amber-500 font-semibold text-sm uppercase tracking-wider">Our Story</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-6">
            Family-Owned Since 1991
          </h2>

          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded by Darrell Haugland in Belgrade, Montana, Yellowstone Tractor has grown from a single-location dealership into western Montana's trusted source for premium equipment.
            </p>
            <p>
              With three locations now serving the Gallatin Valley, Bitterroot Valley, and Flathead Valley, we bring the same family values and hands-on expertise that started it all over three decades ago.
            </p>
            <p>
              Our team of factory-trained technicians and knowledgeable sales staff are passionate about matching the right equipment to every customer's needs — from hobby farms to full-scale ranching operations.
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-10 text-white">
          <Award class="w-12 h-12 text-amber-500 mb-6" />
          <h3 class="text-2xl font-bold mb-4">LS Dealer Excellence Award</h3>
          <p class="text-gray-300 leading-relaxed mb-6">
            Recognized for outstanding sales, service, and customer satisfaction. This award reflects our commitment to going above and beyond for every customer.
          </p>
          <div class="grid grid-cols-2 gap-6">
            <div class="border-l-2 border-amber-500 pl-4">
              <div class="font-bold text-lg">Expert Service</div>
              <div class="text-gray-400 text-sm">Factory-trained techs</div>
            </div>
            <div class="border-l-2 border-amber-500 pl-4">
              <div class="font-bold text-lg">Parts In-Stock</div>
              <div class="text-gray-400 text-sm">Same-day availability</div>
            </div>
            <div class="border-l-2 border-amber-500 pl-4">
              <div class="font-bold text-lg">Mobile Repair</div>
              <div class="text-gray-400 text-sm">We come to you</div>
            </div>
            <div class="border-l-2 border-amber-500 pl-4">
              <div class="font-bold text-lg">3 Locations</div>
              <div class="text-gray-400 text-sm">Across western MT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Award } from 'lucide-vue-next'
</script>
