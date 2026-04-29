import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: null,
    searchQuery: '',
    sortBy: 'default', // 'price-low', 'price-high', 'rating'
  }),
  getters: {
    filteredProducts: (state) => {
      let result = [...state.products]
      
      if (state.selectedCategory) {
        result = result.filter(p => p.category === state.selectedCategory)
      }
      
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(p => p.title.toLowerCase().includes(query))
      }
      
      if (state.sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price)
      } else if (state.sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price)
      } else if (state.sortBy === 'rating') {
        result.sort((a, b) => b.rating.rate - a.rating.rate)
      }
      
      return result
    }
  },
  actions: {
    async fetchProducts() {
      if (this.products.length > 0) return
      this.loading = true
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        this.products = response.data.map(p => ({
          ...p,
          price: Math.round(p.price * 1300)
        }))
      } catch (err) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    async fetchCategories() {
      if (this.categories.length > 0) return
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories')
        this.categories = response.data
      } catch (err) {
        console.error('Failed to fetch categories', err)
      }
    },
    setCategory(category) {
      this.selectedCategory = category
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    setSortBy(sort) {
      this.sortBy = sort
    }
  }
})
