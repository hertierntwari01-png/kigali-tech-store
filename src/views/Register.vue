<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Smartphone, Mail, Lock, UserPlus, User } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const handleRegister = async () => {
  isSubmitting.value = true
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  authStore.register({ name: name.value, email: email.value })
  router.push('/profile')
  isSubmitting.value = false
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
      <div class="text-center space-y-2">
        <div class="inline-flex items-center justify-center p-3 bg-kigali-yellow/10 text-kigali-yellow rounded-2xl mb-4">
          <UserPlus :size="32" />
        </div>
        <h1 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Join the Future</h1>
        <p class="text-gray-500 dark:text-gray-400 font-medium">Create your Kigali Tech account today</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="space-y-2">
          <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
          <div class="relative">
            <input 
              v-model="name" 
              required 
              type="text" 
              placeholder="Your Name" 
              class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white"
            >
            <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
          <div class="relative">
            <input 
              v-model="email" 
              required 
              type="email" 
              placeholder="kigali@tech.rw" 
              class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white"
            >
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
          <div class="relative">
            <input 
              v-model="password" 
              required 
              type="password" 
              placeholder="••••••••" 
              class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white"
            >
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full bg-gray-900 dark:bg-kigali-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-kigali-blue/20 disabled:opacity-50"
        >
          <span v-if="isSubmitting" class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <template v-else>
            Create Account
          </template>
        </button>
      </form>

      <div class="text-center pt-6 border-t border-gray-100 dark:border-slate-800">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Already have an account? 
          <RouterLink to="/login" class="text-kigali-blue font-black hover:underline uppercase tracking-widest text-xs">Log in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
