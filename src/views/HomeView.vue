<template>
  <v-container>
    <h1>Products</h1>
    <v-row>
      <v-col cols="12">
        <!-- Search Input -->
        <v-text-field
          v-model="searchQuery"
          label="Search products"
          outlined
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>Categories</h2>
        <v-btn
          v-for="category in categories"
          :key="category"
          :to="`/category/${category}`"
          color="primary"
          class="mr-2 mb-2"
        >
          {{ category }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
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
import { ref, computed, watch } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { useRoute } from 'vue-router';

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();

const searchQuery = ref('');

// Fetch all products on component mount
productStore.fetchProducts();

// Categories for filtering
const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

// Computed property to filter products based on search query and category
const filteredProducts = computed(() => {
  let products = productStore.products;

  // Filter by category if on a category page
  if (route.params.category) {
    products = products.filter(
      (product) => product.category === route.params.category
    );
  }
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    products = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  return products;
});

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>