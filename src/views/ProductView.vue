<template>
    <v-container>
      <v-card v-if="product">
        <v-img :src="product.image" height="400"></v-img>
        <v-card-title>{{ product.title }}</v-card-title>
        <v-card-text>${{ product.price }}</v-card-text>
        <v-card-text>{{ product.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { useProductStore } from '@/stores/productStore';
  import { useCartStore } from '@/stores/cartStore';
  import { computed } from 'vue';
  
  const props = defineProps(['id']);
  const productStore = useProductStore();
  const cartStore = useCartStore();
  
  const product = computed(() =>
    productStore.products.find((p) => p.id === parseInt(props.id))
  );
  
  const addToCart = (product) => {
    cartStore.addToCart(product);
  };
  </script>