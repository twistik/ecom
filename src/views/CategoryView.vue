<template>
  <v-container>
    <v-btn @click="goBack" rounded="xl" class="bg-orange-darken-2 font-weight-medium mb-4">
      <v-icon>mdi-arrow-left</v-icon> Back
    </v-btn>
    <h1 class="pb-6">{{ category }} Products</h1>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card rounded="xl">
          <v-img :src="product.image" height="200" class="mx-6 my-6"></v-img>
          <div class=" rounded-xl mx-3 my-2"  >
          <v-card-title class="text-subtitle-1 font-weight-bold">{{ product.title }}</v-card-title>
          <v-card-text class="text-h6 font-weight-bold">${{ product.price }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addToCart(product)" class="bg-grey-darken-4" rounded="xl"><v-icon icon="mdi-cart-outline" size="x-large"></v-icon></v-btn>
            <v-btn :to="`/product/${product.id}`" rounded="xl" class="bg-orange-darken-2 font-weight-medium">View Details</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn @click="decrementQuantity(product)" :disabled="product.quantity <= 1" icon="mdi-minus">
            </v-btn>
            <v-text-field
              v-model.number="product.quantity"
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
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const category = ref(route.params.category);
const products = ref([]);


onMounted(() => {
  fetchProductsByCategory(category.value);
});

watch(
  () => route.params.category,
  (newCategory) => {
    category.value = newCategory;
    fetchProductsByCategory(newCategory);
  }
);

const fetchProductsByCategory = async (category) => {
  await productStore.fetchProductsByCategory(category);
    products.value = productStore.products.map((product) => ({
    ...product,
    quantity: 1, 
  }));
};

const incrementQuantity = (product) => {
  product.quantity += 1;
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity -= 1;
  }
};

const addToCart = (product) => {
  cartStore.addToCart(product, product.quantity);
  console.log(product.quantity);
};

const goBack = () => {
  router.go(-1);
};
</script>