<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>E-Commerce App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Home</v-btn>
      <v-btn to="/cart">Cart ({{ totalItems }})</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>