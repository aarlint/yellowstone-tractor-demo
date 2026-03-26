<template>
  <div class="min-h-screen bg-navy-900 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Yellowstone Tractor</h1>
        <p class="text-gray-400 text-sm">Admin Login</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input v-model="username" type="text" placeholder="Username" autocomplete="username"
            class="w-full px-4 py-4 rounded-xl bg-navy-800 text-white placeholder-gray-500 border border-navy-700 focus:border-amber-500 focus:outline-none text-lg" />
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" autocomplete="current-password"
            class="w-full px-4 py-4 rounded-xl bg-navy-800 text-white placeholder-gray-500 border border-navy-700 focus:border-amber-500 focus:outline-none text-lg" />
        </div>

        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

        <button type="submit" :disabled="submitting"
          class="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-lg transition-colors disabled:opacity-50">
          {{ submitting ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link to="/" class="text-gray-500 text-sm hover:text-gray-400">Back to site</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

async function handleLogin() {
  error.value = ''
  submitting.value = true
  try {
    await login(username.value, password.value)
    router.push('/admin/equipment')
  } catch (e) {
    error.value = 'Invalid username or password'
  } finally {
    submitting.value = false
  }
}
</script>
