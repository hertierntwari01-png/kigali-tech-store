import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        // Mock authentication since Fake Store API auth is limited
        // In a real app, you'd call axios.post('https://fakestoreapi.com/auth/login', { username, password })
        if (email && password) {
          const mockUser = {
            id: 1,
            email: email,
            name: 'Kigali Tech Enthusiast',
          }
          const mockToken = 'mock-jwt-token-12345'
          
          this.user = mockUser
          this.token = mockToken
          
          localStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('token', this.token)
          return true
        }
      } catch (err) {
        this.error = 'Invalid credentials'
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    register(userData) {
      // Mock registration
      this.user = { id: Date.now(), ...userData }
      this.token = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('token', this.token)
    }
  }
})
