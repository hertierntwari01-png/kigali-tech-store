<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Bell, Lock, Shield, Eye, Save } from 'lucide-vue-next'

const authStore = useAuthStore()

const settings = ref({
  notifications: true,
  newsletter: false,
  privacyMode: false,
  twoFactor: true
})

const isSaving = ref(false)

const saveSettings = async () => {
  isSaving.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSaving.value = false
  // Show toast or something
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-12 transition-colors">
    <div>
      <h1 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Account Settings</h1>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Configure your security and notification preferences.</p>
    </div>

    <div class="space-y-10">
      <!-- Notifications -->
      <section class="space-y-6">
        <h2 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <Bell :size="16" class="text-kigali-blue" />
          Communication
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800/50 transition-all">
            <div>
              <p class="font-black text-gray-900 dark:text-white uppercase tracking-wide text-sm">Push Notifications</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Receive alerts about your order status.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.notifications" class="sr-only peer">
              <div class="w-12 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kigali-blue"></div>
            </label>
          </div>
          <div class="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800/50 transition-all">
            <div>
              <p class="font-black text-gray-900 dark:text-white uppercase tracking-wide text-sm">Email Newsletter</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Weekly updates on new tech in Kigali.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.newsletter" class="sr-only peer">
              <div class="w-12 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kigali-blue"></div>
            </label>
          </div>
        </div>
      </section>

      <!-- Security -->
      <section class="space-y-6">
        <h2 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
          <Shield :size="16" class="text-kigali-green" />
          Security
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800/50 transition-all">
            <div>
              <p class="font-black text-gray-900 dark:text-white uppercase tracking-wide text-sm">Two-Factor Auth</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Secure your account with SMS codes.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.twoFactor" class="sr-only peer">
              <div class="w-12 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kigali-blue"></div>
            </label>
          </div>
        </div>
      </section>
    </div>

    <div class="pt-10 border-t border-gray-100 dark:border-slate-800 flex justify-end">
      <button 
        @click="saveSettings"
        :disabled="isSaving"
        class="bg-kigali-blue text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-kigali-blue/20"
      >
        <span v-if="isSaving" class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <Save v-else :size="18" />
        Save Changes
      </button>
    </div>
  </div>
</template>
