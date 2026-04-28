<script setup>
import { useAuthStore } from '../stores/auth'
import { MapPin, Phone, Mail, Calendar } from 'lucide-vue-next'

const authStore = useAuthStore()
</script>

<template>
  <div class="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-12 transition-colors">
    <div>
      <h1 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Account Details</h1>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Manage your personal information and delivery preferences in Kigali.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-8">
        <div class="flex items-center gap-4">
          <div class="p-4 bg-gray-50 dark:bg-slate-800 text-kigali-blue rounded-2xl shadow-inner">
            <User :size="20" />
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Full Name</p>
            <p class="text-gray-900 dark:text-white font-black text-lg">{{ authStore.user?.name }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="p-4 bg-gray-50 dark:bg-slate-800 text-kigali-blue rounded-2xl shadow-inner">
            <Mail :size="20" />
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email Address</p>
            <p class="text-gray-900 dark:text-white font-black text-lg">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div class="flex items-center gap-4">
          <div class="p-4 bg-gray-50 dark:bg-slate-800 text-kigali-blue rounded-2xl shadow-inner">
            <Phone :size="20" />
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Phone Number</p>
            <p class="text-gray-900 dark:text-white font-black text-lg">+250 788 123 456</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="p-4 bg-gray-50 dark:bg-slate-800 text-kigali-blue rounded-2xl shadow-inner">
            <Calendar :size="20" />
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member Since</p>
            <p class="text-gray-900 dark:text-white font-black text-lg">April 2026</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-10 border-t border-gray-100 dark:border-slate-800">
      <button class="bg-gray-900 dark:bg-kigali-blue text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl shadow-kigali-blue/20">
        Edit Profile
      </button>
    </div>
  </div>
</template>
