<template>
    <v-container>
      <h1>{{ category }} Products</h1>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card>
            <v-img :src="product.image" height="200"></v-img>
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-text>${{ product.price }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
              <v-btn :to="`/product/${product.id}`">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useProductStore } from '@/stores/productStore';
  import { useCartStore } from '@/stores/cartStore';
  import { onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const productStore = useProductStore();
  const cartStore = useCartStore();
  
  const category = computed(() => route.params.category);
  const products = computed(() => productStore.products);
  
  onMounted(() => {
    productStore.fetchProductsByCategory(category.value);
  });
  
  const addToCart = (product) => {
    cartStore.addToCart(product);
  };
  </script>