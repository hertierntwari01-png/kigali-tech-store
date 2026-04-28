<script setup>
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  ArrowLeft,
  Smartphone
} from 'lucide-vue-next'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const moveToCart = (product) => {
  cartStore.addToCart(product)
  wishlistStore.removeFromWishlist(product.id)
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Wishlist</h1>
      <span class="bg-kigali-yellow/10 text-gray-900 dark:text-kigali-yellow px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{{ wishlistStore.items.length }} items</span>
    </div>

    <div v-if="wishlistStore.items.length === 0" class="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 shadow-inner">
      <div class="bg-gray-50 dark:bg-slate-800 p-8 rounded-full mb-6">
        <Heart :size="64" class="text-gray-300 dark:text-gray-600" />
      </div>
      <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Your wishlist is empty</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center font-medium">Save items you're interested in and they'll show up here!</p>
      <RouterLink 
        to="/products" 
        class="bg-kigali-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 hover:bg-kigali-blue/90 transition-all shadow-xl shadow-kigali-blue/20"
      >
        <ArrowLeft :size="18" /> Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div 
        v-for="item in wishlistStore.items" 
        :key="item.id"
        class="group bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2"
      >
        <div class="relative aspect-square overflow-hidden bg-gray-50 dark:bg-slate-800 p-8">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700">
          
          <button 
            @click="wishlistStore.removeFromWishlist(item.id)"
            class="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-gray-400 hover:text-red-500 rounded-full transition-colors"
          >
            <Trash2 :size="16" />
          </button>
        </div>

        <div class="p-6 flex flex-col flex-grow space-y-4">
          <div class="space-y-1">
            <span class="text-[10px] uppercase font-black text-kigali-blue tracking-widest block">{{ item.category }}</span>
            <RouterLink :to="`/products/${item.id}`" class="block group-hover:text-kigali-blue transition-colors">
              <h3 class="font-bold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug h-10">
                {{ item.title }}
              </h3>
            </RouterLink>
          </div>
          
          <p class="text-xl font-black text-gray-900 dark:text-white">{{ formatPrice(item.price) }}</p>

          <button 
            @click="moveToCart(item)"
            class="mt-auto w-full bg-gray-900 dark:bg-kigali-blue text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg"
          >
            <ShoppingCart :size="18" />
            Move to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
