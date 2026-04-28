import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  actions: {
    toggleWishlist(product) {
      const index = this.items.findIndex(item => item.id === product.id)
      if (index > -1) {
        this.items.splice(index, 1)
      } else {
        this.items.push(product)
      }
      this.persist()
    },
    isInWishlist(productId) {
      return this.items.some(item => item.id === productId)
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.persist()
    },
    persist() {
      localStorage.setItem('wishlist', JSON.stringify(this.items))
    }
  }
})
