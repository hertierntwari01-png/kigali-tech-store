<script setup>
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ArrowRight, 
  ArrowLeft,
  Smartphone
} from 'lucide-vue-next'

const cartStore = useCartStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW').format(price) + ' Rwf'
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Your Cart</h1>
      <span class="bg-kigali-blue/10 text-kigali-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{{ cartStore.totalItems }} items</span>
    </div>

    <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 shadow-inner">
      <div class="bg-gray-50 dark:bg-slate-800 p-8 rounded-full mb-6">
        <ShoppingCart :size="64" class="text-gray-300 dark:text-gray-600" />
      </div>
      <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Your cart is empty</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center font-medium">Looks like you haven't added any tech yet. Start shopping to fill it up!</p>
      <RouterLink 
        to="/products" 
        class="bg-kigali-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 hover:bg-kigali-blue/90 transition-all shadow-xl shadow-kigali-blue/20"
      >
        <ArrowLeft :size="18" /> Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Items List -->
      <div class="lg:col-span-2 space-y-4">
        <div 
          v-for="item in cartStore.items" 
          :key="item.id"
          class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-center shadow-sm hover:shadow-xl transition-all"
        >
          <div class="h-28 w-28 bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 flex items-center justify-center shrink-0 shadow-inner">
            <img :src="item.image" :alt="item.title" class="max-h-full max-w-full object-contain hover:scale-110 transition-transform">
          </div>
          
          <div class="flex-grow min-w-0 text-center sm:text-left">
            <span class="text-[10px] uppercase font-black text-kigali-blue tracking-widest mb-1 block">{{ item.category }}</span>
            <RouterLink :to="`/products/${item.id}`" class="font-bold text-gray-900 dark:text-white hover:text-kigali-blue transition-colors line-clamp-1 text-lg">
              {{ item.title }}
            </RouterLink>
            <p class="text-xl font-black text-gray-900 dark:text-white mt-1">{{ formatPrice(item.price) }}</p>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl p-1 border border-gray-100 dark:border-slate-700">
              <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400">
                <Minus :size="14" />
              </button>
              <span class="w-10 text-center font-black text-gray-900 dark:text-white text-sm">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400">
                <Plus :size="14" />
              </button>
            </div>

            <button 
              @click="cartStore.removeFromCart(item.id)"
              class="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
              title="Remove Item"
            >
              <Trash2 :size="20" />
            </button>
          </div>
        </div>

        <div class="pt-6">
          <RouterLink to="/products" class="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2 hover:text-kigali-blue transition-colors">
            <ArrowLeft :size="18" /> Back to Shop
          </RouterLink>
        </div>
      </div>

      <!-- Summary Card -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl sticky top-28 space-y-8">
          <h3 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Summary</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between text-gray-600 dark:text-gray-400 font-bold text-sm">
              <span class="uppercase tracking-widest">Subtotal</span>
              <span class="text-gray-900 dark:text-white">{{ formatPrice(cartStore.cartTotal.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400 font-bold text-sm">
              <span class="uppercase tracking-widest">VAT (15%)</span>
              <span class="text-gray-900 dark:text-white">{{ formatPrice(cartStore.cartTotal.tax) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400 font-bold text-sm">
              <span class="uppercase tracking-widest">Shipping</span>
              <span v-if="cartStore.cartTotal.shipping === 0" class="text-kigali-green uppercase tracking-widest">FREE</span>
              <span v-else class="text-gray-900 dark:text-white">{{ formatPrice(cartStore.cartTotal.shipping) }}</span>
            </div>
            <div class="pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-between items-end">
              <span class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Total</span>
              <div class="text-right">
                <p class="text-3xl font-black text-kigali-blue leading-none">
                  {{ formatPrice(cartStore.cartTotal.total) }}
                </p>
                <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Currency: RWF</p>
              </div>
            </div>
          </div>

          <RouterLink 
            to="/checkout" 
            class="w-full bg-kigali-blue hover:bg-kigali-blue/90 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-kigali-blue/20"
          >
            Checkout
            <ArrowRight :size="20" />
          </RouterLink>

          <div class="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-4">
            <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <Smartphone :size="16" class="text-kigali-green" />
              <span>MoMo & Card Supported</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
