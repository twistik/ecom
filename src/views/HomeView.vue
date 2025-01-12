<template>
  <v-container>
    <h1>Products</h1>
    <v-progress-linear v-if="productStore.loading" indeterminate color="primary"></v-progress-linear>
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
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const productStore = useProductStore();
const cartStore = useCartStore();

const searchQuery = ref('');

// Fetch all products only once when the component is mounted
onMounted(() => {
  if (productStore.allProducts.length === 0) {
    productStore.fetchProducts();
  }
  productStore.resetProducts(); // Reset products to show all products
});
// Categories for filtering
const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

// Computed property to filter products based on search query
const filteredProducts = computed(() => {
  let products = productStore.products;

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