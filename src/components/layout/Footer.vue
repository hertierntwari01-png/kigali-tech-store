<script setup>
import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 pt-16 pb-8">
    <div class="container mx-auto px-4">
      <!-- Newsletter Section -->
      <div class="bg-kigali-blue rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-kigali-blue/20">
        <div class="max-w-md text-white">
          <h3 class="text-2xl font-black mb-2 font-display">Join the Kigali Tech Community</h3>
          <p class="text-white/80 text-sm">Subscribe for exclusive gadget deals and the latest tech news in Rwanda.</p>
        </div>
        <div class="w-full max-w-md">
          <form @submit.prevent="() => {}" class="flex gap-2">
            <input type="email" placeholder="your@email.com" class="flex-grow px-6 py-4 rounded-2xl bg-white text-gray-900 outline-none focus:ring-2 focus:ring-kigali-yellow">
            <button class="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shrink-0">
              Join Now
            </button>
          </form>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="space-y-6">
          <div class="flex items-center gap-2">
            <div class="bg-kigali-blue p-2 rounded-lg text-white">
              <Smartphone :size="24" />
            </div>
            <span class="text-xl font-bold tracking-tight text-white">
              Kigali<span class="text-kigali-blue">Tech</span>
            </span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            Kigali's premier destination for affordable, high-quality electronics and gadgets. Empowering the tech scene in Rwanda.
          </p>
          <div class="flex items-center gap-4">
            <button class="p-2 bg-gray-800 rounded-full hover:bg-kigali-blue transition-colors">
              <Facebook :size="18" />
            </button>
            <button class="p-2 bg-gray-800 rounded-full hover:bg-kigali-blue transition-colors">
              <Twitter :size="18" />
            </button>
            <button class="p-2 bg-gray-800 rounded-full hover:bg-kigali-blue transition-colors">
              <Instagram :size="18" />
            </button>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-6">Quick Links</h3>
          <ul class="space-y-4 text-sm">
            <li><RouterLink to="/" class="hover:text-kigali-blue transition-colors">Home</RouterLink></li>
            <li><RouterLink to="/products" class="hover:text-kigali-blue transition-colors">All Products</RouterLink></li>
            <li><RouterLink to="/wishlist" class="hover:text-kigali-blue transition-colors">Wishlist</RouterLink></li>
            <li><RouterLink to="/cart" class="hover:text-kigali-blue transition-colors">Shopping Cart</RouterLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-white font-semibold mb-6">Categories</h3>
          <ul class="space-y-4 text-sm">
            <li><RouterLink to="/products/category/electronics" class="hover:text-kigali-blue transition-colors capitalize">Electronics</RouterLink></li>
            <li><RouterLink to="/products/category/jewelery" class="hover:text-kigali-blue transition-colors capitalize">Jewelry</RouterLink></li>
            <li><RouterLink to="/products/category/men's clothing" class="hover:text-kigali-blue transition-colors capitalize">Men's Fashion</RouterLink></li>
            <li><RouterLink to="/products/category/women's clothing" class="hover:text-kigali-blue transition-colors capitalize">Women's Fashion</RouterLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-semibold mb-6">Contact Us</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <MapPin :size="18" class="text-kigali-blue mt-0.5" />
              <span>KN 2 St, Kigali, Rwanda<br>Kigali Heights, Floor 3</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone :size="18" class="text-kigali-blue" />
              <span>+250 788 123 456</span>
            </li>
            <li class="flex items-center gap-3">
              <Mail :size="18" class="text-kigali-blue" />
              <span>support@kigalitech.rw</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-800 text-center">
        <p class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} Kigali Tech Store. All rights reserved. Built for Rwanda's digital future.
        </p>
      </div>
    </div>
  </footer>
</template>
