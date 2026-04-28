<script setup>
import { onMounted, computed } from 'vue'
import { useProductStore } from '../stores/products'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ArrowRight, Smartphone, Laptop, Watch, Tv } from 'lucide-vue-next'
import ProductCard from '../components/products/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
  productStore.fetchCategories()
})

const featuredProducts = computed(() => productStore.products.slice(0, 6))

const categoryIcons = {
  "electronics": Smartphone,
  "jewelery": Watch,
  "men's clothing": Laptop, // Using Laptop as a placeholder for "tech" focus
  "women's clothing": Tv
}
</script>

<template>
  <div class="space-y-24 pb-20">
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-[2.5rem] bg-gray-900 min-h-[600px] flex items-center shadow-2xl shadow-kigali-blue/10">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
          alt="Tech in Kigali" 
          class="w-full h-full object-cover object-center opacity-70"
        >
      </div>

      <div class="relative z-10 container mx-auto px-8 md:px-16 py-20">
        <div class="max-w-2xl space-y-10 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-kigali-blue border border-white/10 backdrop-blur-xl">
            <span class="flex h-2 w-2 rounded-full bg-kigali-blue animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em]">New: Next-Gen Smartphones</span>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tight">
            Elevate Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-kigali-blue via-kigali-yellow to-kigali-green">Digital Life</span>
          </h1>
          
          <p class="text-xl text-gray-300 max-w-lg leading-relaxed font-medium">
            The premier gadget destination in the heart of Rwanda. Experience cutting-edge tech with same-day delivery in Kigali.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <RouterLink 
              to="/products" 
              class="bg-kigali-blue hover:bg-kigali-blue/90 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-[1.05] active:scale-[0.98] flex items-center gap-3 shadow-xl shadow-kigali-blue/30"
            >
              Shop Collection
              <ArrowRight :size="20" />
            </RouterLink>
            <RouterLink 
              to="/products?category=electronics" 
              class="bg-white/5 hover:bg-white/10 text-white backdrop-blur-2xl px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all border border-white/10"
            >
              Explore Tech
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="container mx-auto">
      <div class="flex items-end justify-between mb-12 px-4">
        <div class="space-y-2">
          <h2 class="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Categories</h2>
          <div class="h-1.5 w-20 bg-kigali-blue rounded-full"></div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <RouterLink 
          v-for="cat in productStore.categories" 
          :key="cat"
          :to="`/products/category/${cat}`"
          class="group relative overflow-hidden bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
        >
          <div class="relative z-10 space-y-6">
            <div class="h-14 w-14 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-kigali-blue group-hover:bg-kigali-blue group-hover:text-white transition-all duration-500 shadow-inner">
               <component :is="categoryIcons[cat] || Smartphone" :size="28" />
            </div>
            <div>
              <h3 class="font-black text-gray-900 dark:text-white capitalize group-hover:text-kigali-blue transition-colors text-xl">{{ cat }}</h3>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Browse Items</p>
            </div>
          </div>
          <div class="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.05] transform rotate-12 group-hover:opacity-10 dark:group-hover:opacity-20 transition-all duration-700">
             <component :is="categoryIcons[cat] || Smartphone" :size="160" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Featured Products Slider -->
    <section class="container mx-auto px-4">
      <div class="flex items-end justify-between mb-12">
        <div class="space-y-2">
          <h2 class="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Trending Now</h2>
          <div class="h-1.5 w-20 bg-kigali-yellow rounded-full"></div>
        </div>
        <RouterLink to="/products" class="text-kigali-blue font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">
          View All <ArrowRight :size="18" />
        </RouterLink>
      </div>

      <Swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :space-between="24"
        :autoplay="{ delay: 5000 }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '640': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 },
          '1280': { slidesPerView: 4 }
        }"
        class="pb-16"
      >
        <SwiperSlide v-for="product in featuredProducts" :key="product.id">
          <ProductCard :product="product" />
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Kigali Tech Benefits -->
    <section class="container mx-auto px-4">
      <div class="bg-gray-100 dark:bg-slate-900 rounded-[3rem] p-12 md:p-20 border border-gray-200 dark:border-slate-800 transition-colors">
        <div class="grid md:grid-cols-3 gap-16">
          <div class="space-y-6">
            <div class="h-16 w-16 bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-xl shadow-kigali-blue/5 flex items-center justify-center text-kigali-blue">
              <Smartphone :size="32" />
            </div>
            <div class="space-y-2">
              <h4 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Quality Tech</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">All gadgets undergo 20+ quality inspection points before being listed.</p>
            </div>
          </div>
          <div class="space-y-6">
            <div class="h-16 w-16 bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-xl shadow-kigali-yellow/5 flex items-center justify-center text-kigali-yellow">
              <Watch :size="32" />
            </div>
            <div class="space-y-2">
              <h4 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Rapid Kigali</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Same-day delivery within 3 hours for orders placed before 3 PM in Kigali.</p>
            </div>
          </div>
          <div class="space-y-6">
            <div class="h-16 w-16 bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-xl shadow-kigali-green/5 flex items-center justify-center text-kigali-green">
              <Tv :size="32" />
            </div>
            <div class="space-y-2">
              <h4 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Secure MoMo</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Fully encrypted payments supporting Stripe and all local MoMo networks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-kigali-blue;
}
</style>
