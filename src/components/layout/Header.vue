<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/products'
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X,
  LogOut,
  Smartphone,
  Sun,
  Moon
} from 'lucide-vue-next'
import { useThemeStore } from '../../stores/theme'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const productStore = useProductStore()
const themeStore = useThemeStore()

const isMenuOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  productStore.setSearchQuery(searchQuery.value)
  if (router.currentRoute.value.path !== '/products') {
    router.push('/products')
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
    <!-- Top bar (Rwanda Flag Colors) -->
    <div class="h-1 w-full flex">
      <div class="h-full bg-kigali-blue flex-grow-[2]"></div>
      <div class="h-full bg-kigali-yellow flex-grow"></div>
      <div class="h-full bg-kigali-green flex-grow"></div>
    </div>

    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="bg-kigali-blue p-2 rounded-lg text-white group-hover:bg-kigali-green transition-colors">
            <Smartphone :size="24" />
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Kigali<span class="text-kigali-blue">Tech</span>
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors">Home</RouterLink>
          <RouterLink to="/products" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors">Shop</RouterLink>
          <div class="relative group">
            <button class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors flex items-center gap-1 py-4">
              Categories
            </button>
            <!-- Dropdown Menu -->
            <div class="absolute top-full left-0 w-56 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div v-if="productStore.categories.length === 0" class="p-4 text-center">
                <div class="h-4 w-4 border-2 border-kigali-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
              <template v-else>
                <RouterLink 
                  v-for="cat in productStore.categories" 
                  :key="cat"
                  :to="`/products/category/${cat}`"
                  class="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-kigali-blue/5 dark:hover:bg-slate-800 hover:text-kigali-blue rounded-xl capitalize transition-colors"
                >
                  {{ cat }}
                </RouterLink>
              </template>
            </div>
          </div>
        </nav>

        <!-- Search Bar -->
        <div class="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Search gadgets in Kigali..." 
              class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue rounded-full text-sm transition-all outline-none text-gray-900 dark:text-white"
            >
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
          </div>
        </div>

        <!-- Actions & Tools -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Main Actions -->
          <div class="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-2 py-1">
            <RouterLink to="/wishlist" class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors">
              <Heart :size="18" />
              <span v-if="wishlistStore.items.length > 0" class="absolute top-1 right-1 h-4 w-4 bg-kigali-yellow text-[10px] font-bold text-gray-900 rounded-full flex items-center justify-center">
                {{ wishlistStore.items.length }}
              </span>
            </RouterLink>

            <RouterLink to="/cart" class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors">
              <ShoppingCart :size="18" />
              <span v-if="cartStore.totalItems > 0" class="absolute top-1 right-1 h-4 w-4 bg-kigali-blue text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                {{ cartStore.totalItems }}
              </span>
            </RouterLink>

            <div class="h-4 w-px bg-gray-300 dark:bg-slate-700 mx-1"></div>

            <button 
              @click="themeStore.toggleTheme()"
              class="p-2 text-gray-600 dark:text-gray-400 hover:text-kigali-blue transition-colors"
              title="Toggle Theme"
            >
              <Sun v-if="themeStore.isDark" :size="18" />
              <Moon v-else :size="18" />
            </button>
          </div>

          <!-- Auth & Profile -->
          <div class="flex items-center gap-3">
            <template v-if="authStore.isAuthenticated">
              <RouterLink to="/profile" class="flex items-center gap-2 p-1.5 border-2 border-gray-100 dark:border-slate-800 rounded-full hover:border-kigali-blue transition-all">
                <div class="h-7 w-7 bg-kigali-blue/10 text-kigali-blue rounded-full flex items-center justify-center">
                  <User :size="16" />
                </div>
              </RouterLink>
              <button @click="logout" class="hidden md:block text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">
                Logout
              </button>
            </template>
            <template v-else>
              <RouterLink to="/login" class="hidden sm:block text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-kigali-blue">
                Login
              </RouterLink>
              <RouterLink to="/register" class="bg-kigali-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-kigali-blue/90 transition-all shadow-lg shadow-kigali-blue/20">
                Join
              </RouterLink>
            </template>

            <!-- Mobile Menu Toggle -->
            <button @click="toggleMenu" class="md:hidden p-2 text-gray-600 dark:text-gray-400">
              <Menu v-if="!isMenuOpen" :size="24" />
              <X v-else :size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-4 px-4 shadow-lg">
        <nav class="flex flex-col gap-4">
          <RouterLink @click="isMenuOpen = false" to="/" class="text-lg font-medium text-gray-900 dark:text-white">Home</RouterLink>
          <RouterLink @click="isMenuOpen = false" to="/products" class="text-lg font-medium text-gray-900 dark:text-white">Shop</RouterLink>
          <RouterLink @click="isMenuOpen = false" to="/wishlist" class="text-lg font-medium text-gray-900 dark:text-white">Wishlist</RouterLink>
          <RouterLink @click="isMenuOpen = false" to="/cart" class="text-lg font-medium text-gray-900 dark:text-white">Cart</RouterLink>
          <div v-if="authStore.isAuthenticated" class="pt-4 border-t border-gray-100 dark:border-slate-800">
            <RouterLink @click="isMenuOpen = false" to="/profile" class="text-lg font-medium text-gray-900 dark:text-white">Profile</RouterLink>
            <button @click="logout(); isMenuOpen = false" class="mt-4 text-lg font-medium text-red-500 w-full text-left">Logout</button>
          </div>
          <div v-else class="pt-4 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
            <RouterLink @click="isMenuOpen = false" to="/login" class="text-lg font-medium text-gray-900 dark:text-white">Login</RouterLink>
            <RouterLink @click="isMenuOpen = false" to="/register" class="bg-kigali-blue text-white text-center py-3 rounded-xl font-medium">Create Account</RouterLink>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>
