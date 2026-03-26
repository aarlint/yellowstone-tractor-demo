import { ref } from 'vue'
import { useRouter } from 'vue-router'

const token = ref(localStorage.getItem('yt_token') || null)

export function useAuth() {
  const router = useRouter()

  async function login(username, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    token.value = data.token
    localStorage.setItem('yt_token', data.token)
    return data
  }

  function logout() {
    token.value = null
    localStorage.removeItem('yt_token')
    router.push('/admin/login')
  }

  return { token, login, logout }
}
