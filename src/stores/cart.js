import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    cartTotal: (state) => {
      const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      const tax = Math.round(subtotal * 0.15) // 15% VAT in Rwanda
      const shipping = subtotal > 75000 ? 0 : 5000 // Free shipping over 75,000 Rwf
      return {
        subtotal,
        tax,
        shipping,
        total: subtotal + tax + shipping
      }
    }
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.persist()
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.persist()
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
        this.persist()
      }
    },
    clearCart() {
      this.items = []
      this.persist()
    },
    persist() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
})
