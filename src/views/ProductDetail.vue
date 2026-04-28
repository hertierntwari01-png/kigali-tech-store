<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Plus,
  Minus,
  Share2
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)

onMounted(async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
    product.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const incrementQty = () => quantity.value++
const decrementQty = () => {
  if (quantity.value > 1) quantity.value--
}

const addToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value)
  }
  // Optional: show toast or redirect
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center min-h-[500px]">
    <div class="h-16 w-16 border-4 border-kigali-blue border-t-transparent rounded-full animate-spin"></div>
  </div>

  <div v-else-if="product" class="space-y-12">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
      <button @click="router.back()" class="flex items-center gap-1 hover:text-kigali-blue transition-colors group">
        <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" /> Back
      </button>
      <span class="text-gray-300 dark:text-slate-800">/</span>
      <RouterLink to="/products" class="hover:text-kigali-blue transition-colors">All Products</RouterLink>
      <span class="text-gray-300 dark:text-slate-800">/</span>
      <span class="text-gray-900 dark:text-white truncate max-w-[200px]">{{ product.title }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
      <!-- Image Gallery -->
      <div class="bg-white dark:bg-slate-900 rounded-[3rem] p-12 md:p-20 border border-gray-100 dark:border-slate-800 flex items-center justify-center min-h-[500px] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-tr from-gray-50/50 dark:from-slate-800/20 to-transparent pointer-events-none"></div>
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="max-w-full max-h-[500px] object-contain hover:scale-110 transition-transform duration-700 relative z-10"
        >
      </div>

      <!-- Product Info -->
      <div class="space-y-10 py-4">
        <div class="space-y-4">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kigali-blue/10 text-kigali-blue text-[10px] font-black uppercase tracking-[0.2em]">
            {{ product.category }}
          </span>
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
            {{ product.title }}
          </h1>
          
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-kigali-yellow/10 px-3 py-1.5 rounded-xl">
              <Star :size="18" class="text-kigali-yellow fill-current" />
              <span class="font-black text-gray-900 dark:text-white">{{ product.rating.rate }}</span>
            </div>
            <span class="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest border-l pl-6 border-gray-200 dark:border-slate-800">
              {{ product.rating.count }} Customer Reviews
            </span>
          </div>
        </div>

        <p class="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
          {{ formatPrice(product.price) }}
        </p>

        <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium max-w-xl">
          {{ product.description }}
        </p>

        <!-- Actions -->
        <div class="space-y-8 pt-10 border-t border-gray-100 dark:border-slate-800">
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center bg-gray-100 dark:bg-slate-800 rounded-2xl p-1.5 border border-gray-200 dark:border-slate-700">
              <button @click="decrementQty" class="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-gray-500 dark:text-gray-400">
                <Minus :size="20" />
              </button>
              <span class="w-16 text-center font-black text-gray-900 dark:text-white text-xl">{{ quantity }}</span>
              <button @click="incrementQty" class="p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-gray-500 dark:text-gray-400">
                <Plus :size="20" />
              </button>
            </div>

            <button 
              @click="addToCart"
              class="flex-grow md:flex-grow-0 bg-kigali-blue hover:bg-kigali-blue/90 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-kigali-blue/30"
            >
              <ShoppingCart :size="22" />
              Add to Cart
            </button>

            <button 
              @click="wishlistStore.toggleWishlist(product)"
              class="p-5 border-2 border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-100 dark:hover:border-red-500/20 transition-all group"
              :class="{ 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20': wishlistStore.isInWishlist(product.id) }"
            >
              <Heart 
                :size="24" 
                :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-red-500'" 
              />
            </button>
          </div>

          <div class="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <button class="flex items-center gap-2 hover:text-kigali-blue transition-colors">
              <Share2 :size="18" /> Share Gadget
            </button>
          </div>
        </div>

        <!-- Features/Trust -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div class="flex flex-col gap-3 p-6 rounded-[2rem] bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
            <div class="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-kigali-blue">
              <Truck :size="20" />
            </div>
            <div>
              <p class="font-black text-gray-900 dark:text-white text-[10px] uppercase tracking-widest">Free Delivery</p>
              <p class="text-gray-500 text-[10px] font-bold">In Kigali City</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 p-6 rounded-[2rem] bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
            <div class="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-kigali-green">
              <ShieldCheck :size="20" />
            </div>
            <div>
              <p class="font-black text-gray-900 dark:text-white text-[10px] uppercase tracking-widest">1 Year Warranty</p>
              <p class="text-gray-500 text-[10px] font-bold">Genuine Product</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 p-6 rounded-[2rem] bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
            <div class="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-kigali-yellow">
              <RotateCcw :size="20" />
            </div>
            <div>
              <p class="font-black text-gray-900 dark:text-white text-[10px] uppercase tracking-widest">30 Days Return</p>
              <p class="text-gray-500 text-[10px] font-bold">Easy Exchange</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
