<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/products/ProductCard.vue'
import { Filter, Search, Loader2 } from 'lucide-vue-next'

const route = useRoute()
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
  productStore.fetchCategories()
  
  if (route.params.category) {
    productStore.setCategory(route.params.category)
  }
})

watch(() => route.params.category, (newCategory) => {
  productStore.setCategory(newCategory || null)
})

const categories = [
  { id: null, name: 'All Products' },
  ...productStore.categories.map(c => ({ id: c, name: c }))
]
</script>

<template>
  <div class="space-y-8">
    <!-- Header & Filter Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 capitalize">
          {{ productStore.selectedCategory || 'Our Collection' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Showing {{ productStore.filteredProducts.length }} products</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <!-- Sort Dropdown -->
        <div class="relative min-w-[160px]">
          <select 
            @change="productStore.setSortBy($event.target.value)"
            class="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-kigali-blue outline-none appearance-none cursor-pointer shadow-sm text-gray-900 dark:text-white"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
          <Filter class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="16" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Filters -->
      <aside class="space-y-8">
        <!-- Categories -->
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            Categories
          </h3>
          <div class="space-y-2">
            <button 
              @click="productStore.setCategory(null)"
              class="w-full text-left px-4 py-2 rounded-lg text-sm transition-all"
              :class="!productStore.selectedCategory ? 'bg-kigali-blue/10 text-kigali-blue font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'"
            >
              All Categories
            </button>
            <button 
              v-for="cat in productStore.categories" 
              :key="cat"
              @click="productStore.setCategory(cat)"
              class="w-full text-left px-4 py-2 rounded-lg text-sm capitalize transition-all"
              :class="productStore.selectedCategory === cat ? 'bg-kigali-blue/10 text-kigali-blue font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Promo Card -->
        <div class="bg-kigali-blue rounded-2xl p-6 text-white overflow-hidden relative group">
          <div class="relative z-10">
            <h4 class="font-bold text-xl mb-2">New Tech in Kigali!</h4>
            <p class="text-sm text-white/80 mb-4">Up to 20% off on all electronics this week.</p>
            <button class="bg-white text-kigali-blue px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
              Explore Now
            </button>
          </div>
          <Smartphone class="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform" :size="120" />
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="lg:col-span-3">
        <div v-if="productStore.loading" class="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 class="animate-spin mb-4" :size="48" />
          <p class="font-medium">Discovering latest tech for you...</p>
        </div>

        <div v-else-if="productStore.filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search class="mb-4" :size="48" />
          <p class="font-medium text-lg text-gray-900">No products found</p>
          <p class="text-sm">Try adjusting your filters or search query</p>
          <button @click="productStore.setSearchQuery(''); productStore.setCategory(null)" class="mt-6 text-kigali-blue font-bold underline">
            Clear all filters
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in productStore.filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
