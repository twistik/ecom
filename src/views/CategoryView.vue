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
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const category = ref(route.params.category);
const products = ref([]);

// Define the function BEFORE using it in the watch
const fetchProductsByCategory = async (category) => {
  await productStore.fetchProductsByCategory(category);
  products.value = productStore.products;
};

// Watch for changes in the route parameter
watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory;
    fetchProductsByCategory(newCategory); // Now this works because the function is defined
  },
  { immediate: true } // Fetch products immediately when the component is mounted
);

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>