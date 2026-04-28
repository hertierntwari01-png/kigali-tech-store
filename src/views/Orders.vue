<script setup>
import { ref, onMounted } from 'vue'
import { Package, ChevronRight, MapPin, Calendar } from 'lucide-vue-next'

const orders = ref([])

onMounted(() => {
  orders.value = JSON.parse(localStorage.getItem('orders')) || []
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-RW', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-8">
    <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <h1 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Order History</h1>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Track and manage your recent tech purchases in Kigali.</p>
    </div>

    <div v-if="orders.length === 0" class="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 shadow-inner">
      <div class="bg-gray-50 dark:bg-slate-800 p-8 rounded-full mb-6">
        <Package :size="64" class="text-gray-300 dark:text-gray-600" />
      </div>
      <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">No orders yet</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center font-medium">Your order history will appear here once you make your first purchase.</p>
      <RouterLink 
        to="/products" 
        class="bg-kigali-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 hover:bg-kigali-blue/90 transition-all shadow-xl shadow-kigali-blue/20"
      >
        Start Shopping <ChevronRight :size="18" />
      </RouterLink>
    </div>

    <div v-else class="space-y-8">
      <div 
        v-for="order in orders" 
        :key="order.id"
        class="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 group"
      >
        <div class="bg-gray-50 dark:bg-slate-800/50 p-8 flex flex-wrap items-center justify-between gap-8 border-b border-gray-100 dark:border-slate-800">
          <div class="space-y-1">
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Order ID</p>
            <p class="text-gray-900 dark:text-white font-black text-sm uppercase tracking-tighter">{{ order.id }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date Placed</p>
            <div class="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xs uppercase">
              <Calendar :size="14" class="text-kigali-blue" />
              {{ formatDate(order.date) }}
            </div>
          </div>
          <div class="space-y-1">
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Amount</p>
            <p class="text-gray-900 dark:text-white font-black text-lg">{{ formatPrice(order.total) }}</p>
          </div>
          <div>
            <span class="px-5 py-2 rounded-full bg-kigali-green/10 text-kigali-green text-[10px] font-black uppercase tracking-widest border border-kigali-green/20">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="p-8">
          <div class="flex flex-wrap gap-4 mb-8">
            <div v-for="item in order.items" :key="item.id" class="h-20 w-20 bg-white dark:bg-slate-800 rounded-2xl p-3 border border-gray-100 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-transform">
              <img :src="item.image" :alt="item.title" class="max-h-full max-w-full object-contain" :title="item.title">
            </div>
          </div>

          <div class="flex items-start gap-4 p-6 bg-gray-50 dark:bg-slate-800/30 rounded-[2rem] border border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400 max-w-md shadow-inner">
            <div class="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-kigali-blue">
              <MapPin :size="18" />
            </div>
            <div>
              <p class="font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">Delivered to:</p>
              <div class="font-bold space-y-0.5">
                <p>{{ order.shipping.fullName }}</p>
                <p>{{ order.shipping.address }}, {{ order.shipping.city }}</p>
                <p class="text-kigali-blue">{{ order.shipping.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
