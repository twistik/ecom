<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title >E-Commerce App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Home</v-btn>
      <v-btn to="/cart">Cart ({{ totalItems }})</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    <v-footer height="100">
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="12" class="text-center">          
          <v-icon size="x-large" class="mdi-github">=</v-icon>
          <v-icon size="x-large" class="mdi-linkedin">=</v-icon>
        </v-col>
        <v-col cols="12" md="12" class="text-center mt-4">          
              <p>A E-Commerce App built by Vladylav Novak with 💜</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</v-main>
  </v-app>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>