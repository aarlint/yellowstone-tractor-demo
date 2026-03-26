<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-navy-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <Tractor class="w-5 h-5 text-amber-500" />
        <span class="font-bold text-sm">YT Admin</span>
      </div>
      <div class="flex items-center gap-3">
        <router-link to="/" class="text-gray-400 hover:text-white text-sm">
          <ExternalLink class="w-4 h-4" />
        </router-link>
        <button @click="logout" class="text-gray-400 hover:text-white">
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { Tractor, ExternalLink, LogOut } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const { logout } = useAuth()
</script>
