<script setup>
import { RouterLink } from 'vue-router'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'USD', // Keep USD for FakeStoreAPI, but could be RWF
  }).format(price)
}
</script>

<template>
  <div class="group bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">
    <!-- Image Container -->
    <div class="relative aspect-square overflow-hidden bg-gray-50 dark:bg-slate-800/50 p-10">
      <img 
        :src="product.image" 
        :alt="product.title"
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
      >
      
      <!-- Badges -->
      <div v-if="product.rating.rate > 4.5" class="absolute top-5 left-5">
        <span class="bg-kigali-yellow text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-kigali-yellow/20 border border-white/20">
          Best Seller
        </span>
      </div>

      <!-- Quick Actions (Overlay) -->
      <div class="absolute inset-0 bg-white/10 dark:bg-slate-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
        <button 
          @click="wishlistStore.toggleWishlist(product)"
          class="p-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-2xl shadow-2xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all transform hover:scale-110 active:scale-90"
          :class="{ 'text-red-500 bg-red-50 dark:bg-red-500/10': wishlistStore.isInWishlist(product.id) }"
          title="Add to Wishlist"
        >
          <Heart :size="20" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" />
        </button>
        <RouterLink 
          :to="`/products/${product.id}`"
          class="p-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-2xl shadow-2xl hover:bg-kigali-blue hover:text-white transition-all transform hover:scale-110 active:scale-90"
          title="View Details"
        >
          <Eye :size="20" />
        </RouterLink>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow space-y-4">
      <div class="space-y-2">
        <span class="text-[10px] uppercase font-black text-kigali-blue tracking-[0.2em] block">{{ product.category }}</span>
        <RouterLink :to="`/products/${product.id}`" class="block group-hover:text-kigali-blue transition-colors">
          <h3 class="font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] text-sm leading-tight">
            {{ product.title }}
          </h3>
        </RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex gap-0.5 text-kigali-yellow">
          <Star v-for="i in 5" :key="i" :size="12" :fill="i <= Math.round(product.rating.rate) ? 'currentColor' : 'none'" />
        </div>
        <span class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">({{ product.rating.count }})</span>
      </div>

      <div class="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-slate-800">
        <span class="text-xl font-black text-gray-900 dark:text-white tracking-tighter">{{ formatPrice(product.price) }}</span>
        <button 
          @click="cartStore.addToCart(product)"
          class="p-3 bg-gray-900 dark:bg-kigali-blue text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-kigali-blue/20"
          title="Add to Cart"
        >
          <ShoppingCart :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
