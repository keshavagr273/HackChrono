export function getApiBase() {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl && /^https?:\/\//.test(envUrl)) {
    if (envUrl.includes('localhost:517')) return 'http://localhost:5000'
    return envUrl
  }
  return 'http://localhost:5000'
}

export async function apiGet(path, opts = {}) {
  const res = await fetch(`${getApiBase()}${path}`, opts)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiAuthGet(path) {
  const token = localStorage.getItem('token')
  return apiGet(path, { headers: { Authorization: `Bearer ${token}` } })
}

export async function apiAuthPost(path, body) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${getApiBase()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}


