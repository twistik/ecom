<template>
<v-app-bar rounded>
    <v-btn><v-toolbar-title lin>E-Commerce App</v-toolbar-title></v-btn>
    <v-spacer></v-spacer>
    <v-btn to="/">Home</v-btn>
    <v-btn to="/cart">Cart ({{ totalItems }})</v-btn>
  </v-app-bar>
</template>
<script setup>
import { useCartStore } from '@/stores/cartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>