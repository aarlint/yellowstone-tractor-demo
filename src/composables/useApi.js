export function useApi() {
  function getHeaders() {
    const token = localStorage.getItem('yt_token')
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
  }

  async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: { ...getHeaders(), ...options.headers }
    })
    if (res.status === 401) {
      localStorage.removeItem('yt_token')
      window.location.href = '/admin/login'
      throw new Error('Unauthorized')
    }
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }

  async function apiUpload(url, formData, method = 'POST') {
    const token = localStorage.getItem('yt_token')
    const res = await fetch(url, {
      method,
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    })
    if (res.status === 401) {
      localStorage.removeItem('yt_token')
      window.location.href = '/admin/login'
      throw new Error('Unauthorized')
    }
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }

  return { apiFetch, apiUpload }
}
