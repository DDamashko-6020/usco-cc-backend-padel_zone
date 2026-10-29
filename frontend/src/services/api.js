const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function getToken() {
  try {
    const raw = localStorage.getItem('padelzone_user')
    if (!raw) return null
    const u = JSON.parse(raw)
    return u?.token || u?.accessToken || null
  } catch {
    return null
  }
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}/api${path}`
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(url, { ...options, headers })
  const json = await res.json().catch(() => ({ ok: false, data: null, message: 'Error' }))
  if (!res.ok || json.ok === false) {
    const err = new Error(json.message || `Error ${res.status}`)
    err.status = res.status
    err.data = json.data
    throw err
  }
  return json.data
}

class Api {
  // AUTH
  register(body) { return request('/auth/register', { method: 'POST', body: JSON.stringify(body) }) }
  login(body) { return request('/auth/login', { method: 'POST', body: JSON.stringify(body) }) }
  getMe() { return request('/auth/me').catch(() => request('/profile')) }
  updateProfile(body) { return request('/profile', { method: 'PATCH', body: JSON.stringify(body) }) }

  // COURTS
  getCourts(params = {}) {
    const qs = new URLSearchParams()
    if (params.page) qs.set('page', params.page)
    if (params.limit) qs.set('limit', params.limit)
    return request(`/courts${qs.toString() ? `?${qs}` : ''}`)
  }
  getCourtById(id) { return request(`/courts/${id}`) }
  getCourtAvailability(id, fecha) { return request(`/courts/${id}/availability?fecha=${encodeURIComponent(fecha)}`) }

  // RESERVATIONS
  createReservation(body) { return request('/reservations', { method: 'POST', body: JSON.stringify(body) }) }
  getMyReservations() { return request('/reservations/mine') }
  cancelReservation(id) { return request(`/reservations/${id}`, { method: 'DELETE' }) }

  // CLASSES
  getClasses() { return request('/classes') }
  getClassById(id) { return request(`/classes/${id}`) }
  enrollClass(id, body = {}) { return request(`/classes/${id}/enroll`, { method: 'POST', body: JSON.stringify(body) }) }
  getMyEnrollments() { return request('/classes/enrollments/mine') }
  cancelEnrollment(id) { return request(`/classes/enrollments/${id}`, { method: 'DELETE' }) }

  // TOURNAMENTS
  getTournaments() { return request('/tournaments') }
  getTournamentById(id) { return request(`/tournaments/${id}`) }
  registerTournament(id, body = {}) { return request(`/tournaments/${id}/register`, { method: 'POST', body: JSON.stringify(body) }) }
  payTournament(participanteId) { return request(`/tournaments/registrations/${participanteId}/pay`, { method: 'POST' }) }
  getMyTournamentRegistrations() { return request('/tournaments/registrations/mine') }
  cancelTournamentRegistration(id) { return request(`/tournaments/registrations/${id}`, { method: 'DELETE' }) }

  // PRODUCTS
  getProducts() { return request('/products') }
  getProductById(id) { return request(`/products/${id}`) }

  // CART - keep in localStorage as requested
  _cartKey = 'padelzone_cart'
  getCart() {
    try {
      const raw = localStorage.getItem(this._cartKey)
      return Promise.resolve(raw ? JSON.parse(raw) : [])
    } catch { return Promise.resolve([]) }
  }
  addToCart({ productId, qty = 1 }) {
    return this.getCart().then(cart => {
      const idx = cart.findIndex(c => c.productId === productId || c.id === productId)
      if (idx >= 0) cart[idx].qty += qty
      else cart.push({ productId, qty })
      localStorage.setItem(this._cartKey, JSON.stringify(cart))
      // return enriched
      return this.getProducts().then(prods => {
        return cart.map(ci => {
          const pid = ci.productId || ci.id
          const p = prods.find(x => String(x.id) === String(pid))
          return p ? { ...p, qty: ci.qty, id: p.id } : null
        }).filter(Boolean)
      })
    })
  }
  updateQty({ productId, qty }) {
    return this.getCart().then(cart => {
      const idx = cart.findIndex(c => c.productId === productId || c.id === productId)
      if (idx >= 0) {
        if (qty <= 0) cart.splice(idx, 1)
        else cart[idx].qty = qty
      }
      localStorage.setItem(this._cartKey, JSON.stringify(cart))
      return this.getProducts().then(prods => {
        return cart.map(ci => {
          const pid = ci.productId || ci.id
          const p = prods.find(x => String(x.id) === String(pid))
          return p ? { ...p, qty: ci.qty, id: p.id } : null
        }).filter(Boolean)
      })
    })
  }
  removeFromCart(productId) {
    return this.getCart().then(cart => {
      cart = cart.filter(c => String(c.productId || c.id) !== String(productId))
      localStorage.setItem(this._cartKey, JSON.stringify(cart))
      return this.getProducts().then(prods => {
        return cart.map(ci => {
          const pid = ci.productId || ci.id
          const p = prods.find(x => String(x.id) === String(pid))
          return p ? { ...p, qty: ci.qty, id: p.id } : null
        }).filter(Boolean)
      })
    })
  }
  clearCart() {
    localStorage.setItem(this._cartKey, JSON.stringify([]))
    return Promise.resolve([])
  }

  // ORDERS
  createOrder({ items, shipping = 0, method = 'card', address } = {}) {
    // server recalculates; send minimal
    const payload = {
      items: (items || []).map(i => ({ productId: i.id || i.productId, qty: i.qty })),
      shipping,
      method,
      address,
    }
    return request('/orders', { method: 'POST', body: JSON.stringify(payload) }).then(res => {
      this.clearCart()
      return res
    })
  }
  getMyOrders() { return request('/orders/mine') }
  payOrder(id) { return request(`/orders/${id}/pay`, { method: 'POST' }) }
}

export const api = new Api()
export default api
