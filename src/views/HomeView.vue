<template>
  <HeroSesction></HeroSesction>
  <v-container>
    <h1>Products</h1>
    <v-progress-linear v-if="productStore.loading" indeterminate color="primary"></v-progress-linear>
    <v-row>
      <v-col cols="12">
        <!-- Search Input -->
        <v-text-field
          v-model="searchQuery"
          label="Search products"
          clearable
          hide-details="true"
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
          color="grey-darken-4"
          class="mr-2 mb-2"
          rounded="xl"
        >
          {{ category }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
        <v-card rounded="xl">
          <v-img :src="product.image" height="200" class="mx-6 my-6"></v-img>
          <div class=" rounded-xl mx-3 my-2"  >
          <v-card-title class="text-subtitle-1 font-weight-bold">{{ product.title }}</v-card-title>
          <v-card-text  class="text-h6 font-weight-bold">${{ product.price }}</v-card-text>
          <v-card-actions class="">
              
            <v-btn @click="addToCart(product)" class="bg-grey-darken-4" rounded="xl"><v-icon icon="mdi-cart-outline" size="x-large"></v-icon>
            </v-btn>
            <v-btn :to="`/product/${product.id}`" rounded="xl" class="bg-orange-darken-2 font-weight-medium">View Details</v-btn>
          </v-card-actions>
          <v-card-actions class="">
            <v-btn @click="decrementQuantity(product)" :disabled="productQuantities[product.id] <= 1" icon="mdi-minus">
        </v-btn>
        <v-text-field
          v-model.number="productQuantities[product.id]"
          style="max-width: 50px;"
          density="compact"
          center-affix
          variant="outlined"
          hide-details="true"
        ></v-text-field>
            <v-btn @click="incrementQuantity(product)" icon="mdi-plus">
        </v-btn>
          </v-card-actions>
        </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="showLoadMore">
      <v-col cols="12" class="text-center">
        <v-btn @click="loadMore" :loading="productStore.loading"  color="grey-darken-4"
          class="mr-2 mb-2"
          rounded="xl">
          Load More
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import HeroSesction from '@/components/HeroSesction.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const searchQuery = ref(''); // Default quantity// Default quantity

const productQuantities = ref({});

// Initialize quantities for each product
watch(
  () => productStore.displayedProducts,
  (newProducts) => {
    newProducts.forEach(product => {
      if (!productQuantities.value[product.id]) {
        productQuantities.value[product.id] = 1; // Default quantity
      }
    });
  },
  { immediate: true } // Initialize immediately
);
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
// Add quantity property to each product
const filteredProducts = computed(() => {
  let products = productStore.displayedProducts.map((product) => ({
    ...product,
    quantity: 1, // Default quantity
  }));
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
// Check if there are more products to load
const showLoadMore = computed(() => {
  return productStore.displayedProducts.length < productStore.allProducts.length;
});

// Load more products
const loadMore = () => {
  productStore.loadMoreProducts();
};
// Add to cart with the selected quantity
/*const addToCart = (product) => {
  cartStore.addToCart(product, product.quantity);
  product.quantity = 1; // Reset quantity after adding to cart
};*/
// Increment quantity
// Increment quantity
const incrementQuantity = (product) => {
  productQuantities.value[product.id] += 1;
  console.log(productQuantities.value[product.id])
};

const decrementQuantity = (product) => {
  if (productQuantities.value[product.id] > 1) {
    productQuantities.value[product.id] -= 1;
  }
};


const addToCart = (product) => {
  const quantity = productQuantities.value[product.id];
  cartStore.addToCart(product, quantity ); // Use the selected quantity
  console.log(product.quantity)
  productQuantities.value[product.id] = 1;
};

</script>