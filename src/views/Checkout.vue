<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { 
  CreditCard, 
  MapPin, 
  ChevronRight, 
  Lock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const step = ref(1) // 1: Shipping, 2: Payment
const isProcessing = ref(false)
const orderCompleted = ref(false)
const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)
const paymentError = ref(null)

const shippingForm = ref({
  fullName: authStore.user?.name || '',
  phone: '',
  address: '',
  city: 'Kigali',
  district: '',
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const handleShippingSubmit = async () => {
  step.value = 2
  // Initialize Stripe after step transition
  await initializeStripe()
}

const initializeStripe = async () => {
  stripe.value = await stripePromise
  if (!stripe.value) {
    console.error('Failed to load Stripe')
    return
  }

  elements.value = stripe.value.elements({
    appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#0066cc',
        colorBackground: '#ffffff',
        colorText: '#333333',
      },
    },
  })

  cardElement.value = elements.value.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  })

  const cardContainer = document.getElementById('card-element')
  if (cardContainer) {
    cardElement.value.mount('#card-element')
  }
}

const handlePayment = async () => {
  isProcessing.value = true
  paymentError.value = null

  try {
    // Create payment intent on backend
    const response = await axios.post('http://localhost:3001/api/create-payment-intent', {
      amount: cartStore.cartTotal.total,
    })

    const { clientSecret } = response.data

    // Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement.value,
        billing_details: {
          name: shippingForm.value.fullName,
          phone: shippingForm.value.phone,
          address: {
            line1: shippingForm.value.address,
            city: shippingForm.value.city,
          },
        },
      },
    })

    if (error) {
      paymentError.value = error.message
      isProcessing.value = false
      return
    }

    // Save order to profile
    const orders = JSON.parse(localStorage.getItem('orders')) || []
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items: [...cartStore.items],
      total: cartStore.cartTotal.total,
      status: 'Processing',
      paymentId: paymentIntent.id,
      shipping: { ...shippingForm.value }
    }
    orders.unshift(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    cartStore.clearCart()
    isProcessing.value = false
    orderCompleted.value = true
  } catch (error) {
    console.error('Payment error:', error)
    paymentError.value = 'Payment failed. Please try again.'
    isProcessing.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-RW').format(price) + ' Rwf'
}

onMounted(() => {
  if (step.value === 2) {
    initializeStripe()
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <!-- Success State -->
    <div v-if="orderCompleted" class="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl text-center space-y-6 fade-in">
      <div class="flex justify-center">
        <div class="h-20 w-20 bg-kigali-green/10 text-kigali-green rounded-full flex items-center justify-center">
          <CheckCircle2 :size="48" />
        </div>
      </div>
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">Murakoze Cyane!</h1>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Your order has been placed successfully. We'll deliver your gadgets to your doorstep in Kigali shortly.</p>
      <div class="pt-6">
        <RouterLink to="/profile/orders" class="bg-kigali-blue text-white px-8 py-3 rounded-xl font-bold transition-all hover:bg-kigali-blue/90 shadow-lg shadow-kigali-blue/20">
          View Your Orders
        </RouterLink>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Checkout Flow -->
      <div class="lg:col-span-8 space-y-8">
        <!-- Progress Steps -->
        <div class="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
          <div :class="step >= 1 ? 'text-kigali-blue' : 'text-gray-400 dark:text-gray-600'" class="flex items-center gap-2">
            <span class="h-8 w-8 rounded-full border-2 flex items-center justify-center border-current bg-white dark:bg-slate-900">1</span>
            Shipping
          </div>
          <div class="h-px w-12 bg-gray-200 dark:bg-slate-800"></div>
          <div :class="step >= 2 ? 'text-kigali-blue' : 'text-gray-400 dark:text-gray-600'" class="flex items-center gap-2">
            <span class="h-8 w-8 rounded-full border-2 flex items-center justify-center border-current bg-white dark:bg-slate-900">2</span>
            Payment
          </div>
        </div>

        <!-- Step 1: Shipping -->
        <div v-if="step === 1" class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-8">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-kigali-blue/10 text-kigali-blue rounded-2xl">
              <MapPin :size="24" />
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Shipping Details</h2>
          </div>

          <form @submit.prevent="handleShippingSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2 space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
              <input v-model="shippingForm.fullName" required type="text" placeholder="John Doe" class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
              <input v-model="shippingForm.phone" required type="tel" placeholder="+250 788 000 000" class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest">City</label>
              <select v-model="shippingForm.city" class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white appearance-none">
                <option>Kigali</option>
                <option>Musanze</option>
                <option>Rubavu</option>
                <option>Huye</option>
              </select>
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Delivery Address</label>
              <textarea v-model="shippingForm.address" required rows="3" placeholder="Street Name, Apartment, Landmark..." class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-kigali-blue transition-all outline-none text-gray-900 dark:text-white"></textarea>
            </div>

            <div class="md:col-span-2 pt-4">
              <button type="submit" class="w-full bg-gray-900 dark:bg-kigali-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-kigali-blue/10">
                Continue to Payment
                <ChevronRight :size="18" />
              </button>
            </div>
          </form>
        </div>

        <!-- Step 2: Payment -->
        <div v-if="step === 2" class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-8">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-kigali-blue/10 text-kigali-blue rounded-2xl">
              <CreditCard :size="24" />
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Secure Payment</h2>
          </div>

          <div class="space-y-6">
            <div class="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl flex gap-3 text-sm text-blue-700 dark:text-blue-400">
              <Lock :size="18" class="shrink-0" />
              <p>Your payment is secure. We use Stripe for encrypted card processing. We also support MoMo Pay.</p>
            </div>

            <!-- Real Stripe Card Input -->
            <div class="space-y-4">
              <label class="text-xs font-black text-gray-400 uppercase tracking-widest">Credit or Debit Card</label>
              <div id="card-element" class="p-5 border-2 border-gray-100 dark:border-slate-800 rounded-2xl bg-gray-50 dark:bg-slate-800"></div>
              <p v-if="paymentError" class="text-xs text-red-500 font-bold">{{ paymentError }}</p>
              <p class="text-[10px] text-gray-400 uppercase font-bold">Test Mode: Use card 4242 4242 4242 4242 with any future date and CVC</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                @click="step = 1" 
                class="flex-1 py-5 border-2 border-gray-100 dark:border-slate-800 rounded-2xl font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
              >
                Go Back
              </button>
              <button 
                @click="handlePayment" 
                :disabled="isProcessing"
                class="flex-[2] bg-kigali-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-kigali-blue/20"
              >
                <span v-if="isProcessing" class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span v-else>Pay {{ formatPrice(cartStore.cartTotal.total) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Sidebar (Sticky) -->
      <div class="lg:col-span-4">
        <div class="sticky top-24 space-y-6">
          <div class="bg-gray-900 dark:bg-slate-900 border dark:border-slate-800 text-white p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 class="text-xl font-black uppercase tracking-wider">Your Order</h3>
            
            <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                <div class="h-14 w-14 bg-white rounded-xl shrink-0 p-1.5 shadow-inner">
                  <img :src="item.image" class="h-full w-full object-contain">
                </div>
                <div class="min-w-0 flex-grow">
                  <p class="text-xs font-bold text-white line-clamp-1">{{ item.title }}</p>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Quantity: {{ item.quantity }}</p>
                </div>
                <p class="text-xs font-black text-kigali-yellow ml-auto whitespace-nowrap">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <div class="pt-6 border-t border-white/10 space-y-3">
              <div class="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartStore.cartTotal.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>VAT (15%)</span>
                <span>{{ formatPrice(cartStore.cartTotal.tax) }}</span>
              </div>
              <div class="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Shipping</span>
                <span class="text-kigali-green">{{ cartStore.cartTotal.shipping === 0 ? 'FREE' : formatPrice(cartStore.cartTotal.shipping) }}</span>
              </div>
              <div class="pt-6 flex justify-between items-end border-t border-white/5">
                <span class="text-sm font-black uppercase tracking-[0.2em]">Total</span>
                <span class="text-3xl font-black text-kigali-yellow">{{ formatPrice(cartStore.cartTotal.total) }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 flex gap-4 shadow-sm transition-colors">
            <div class="h-10 w-10 bg-kigali-yellow/10 text-kigali-yellow rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle :size="20" />
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              <p class="font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1">Standard Delivery</p>
              <p>Estimated arrival: {{ new Date(Date.now() + 86400000).toLocaleDateString('en-RW', { day: 'numeric', month: 'long' }) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-white/20 rounded-full;
}
</style>
