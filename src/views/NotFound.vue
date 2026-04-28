<script setup>
import { RouterLink } from 'vue-router'
import { Home, Search, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <div class="relative mb-8">
      <h1 class="text-[12rem] font-black text-gray-100 leading-none">404</h1>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="p-6 bg-white rounded-3xl shadow-xl border border-gray-50">
          <Search :size="64" class="text-kigali-blue" />
        </div>
      </div>
    </div>
    
    <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Oops! This gadget doesn't exist</h2>
    <p class="text-gray-500 max-w-md mb-10">
      We couldn't find the page you're looking for. It might have been moved or doesn't exist in our Kigali store.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <button @click="$router.back()" class="flex items-center gap-2 px-8 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
        <ArrowLeft :size="20" /> Go Back
      </button>
      <RouterLink to="/" class="flex items-center gap-2 px-8 py-4 bg-kigali-blue text-white rounded-xl font-bold hover:bg-kigali-blue/90 transition-all shadow-lg shadow-kigali-blue/20">
        <Home :size="20" /> Back to Home
      </RouterLink>
    </div>
  </div>
</template>
