<template>
    <v-container>
      <h1>Shopping Cart</h1>
      <v-list>
        <v-list-item v-for="item in cartItems" :key="item.id">
          <v-list-item-title>{{ item.title }} (x{{ item.quantity }})</v-list-item-title>
          <v-list-item-subtitle>${{ item.price * item.quantity }}</v-list-item-subtitle>
          <v-btn @click="removeFromCart(item.id)" color="error">Remove</v-btn>
        </v-list-item>
      </v-list>
      <h3>Total: ${{ totalPrice }}</h3>
      <v-btn to="/checkout" color="primary" :disabled="cartItems.length === 0">
      Proceed to Checkout
    </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cartStore';
  import { storeToRefs } from 'pinia';
  
  const cartStore = useCartStore();
  const { items: cartItems, totalPrice } = storeToRefs(cartStore);
  const { removeFromCart } = cartStore;
  </script>