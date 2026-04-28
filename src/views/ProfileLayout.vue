<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const menuItems = [
  { name: 'My Profile', path: '/profile', icon: User },
  { name: 'Order History', path: '/profile/orders', icon: ShoppingBag },
  { name: 'Wishlist', path: '/wishlist', icon: Heart },
  { name: 'Settings', path: '/profile/settings', icon: Settings },
]
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Profile Sidebar -->
    <aside class="space-y-6">
      <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
        <div class="h-24 w-24 bg-kigali-blue/10 text-kigali-blue rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <User :size="40" />
        </div>
        <h2 class="text-xl font-bold text-gray-900">{{ authStore.user?.name }}</h2>
        <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
      </div>

      <nav class="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-2">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          :class="route.path === item.path ? 'bg-kigali-blue text-white font-bold' : 'text-gray-600 hover:bg-gray-50'"
        >
          <component :is="item.icon" :size="20" />
          {{ item.name }}
        </RouterLink>
        <button 
          @click="authStore.logout(); $router.push('/')"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut :size="20" />
          Logout
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="lg:col-span-3">
      <RouterView />
    </div>
  </div>
</template>
