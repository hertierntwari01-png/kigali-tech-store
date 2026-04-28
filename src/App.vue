<script setup>
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme()
})

// Watch for changes and apply to DOM (already done in store, but this adds extra reactivity safety)
watch(() => themeStore.isDark, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <!-- The 'dark' class here ensures components inside get the dark: styles if the html class fails -->
  <div :class="{ 'dark': themeStore.isDark }">
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main class="flex-grow container mx-auto px-4 py-8">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-slate-900;
}
::-webkit-scrollbar-thumb {
  @apply bg-kigali-blue/50 rounded-full hover:bg-kigali-blue;
}
</style>
