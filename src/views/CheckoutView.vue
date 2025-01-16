<template>
    <v-container>
      <v-btn @click="goBack" rounded="xl" class="bg-orange-darken-2 font-weight-medium mb-4">
      <v-icon>mdi-arrow-left</v-icon> Back
    </v-btn>
      <h1>Checkout</h1>
      <v-form @submit.prevent="submitOrder">
        <v-text-field v-model="form.name" label="Full Name" required></v-text-field>
        <v-text-field v-model="form.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="form.address" label="Address" required></v-text-field>
        <v-text-field v-model="form.city" label="City" required></v-text-field>
        <v-text-field v-model="form.zip" label="ZIP Code" required></v-text-field>
        <v-btn type="submit" rounded="xl" class="bg-orange-darken-2 font-weight-medium">Place Order</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import { useRouter } from 'vue-router';
  
  const cartStore = useCartStore();
  const router = useRouter();
  
  const form = ref({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  
  const submitOrder = async () => {
    const order = {
      ...form.value,
      items: cartStore.items,
      totalPrice: cartStore.totalPrice,
    };
  
    try {
      console.log('Order submitted:', order);
      alert('Order placed successfully!');
      cartStore.clearCart();
      router.push('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const goBack = () => {
  router.go(-1);
};
  </script>