<template>
    <v-container>
      <v-btn @click="goBack" rounded="xl" class="bg-orange-darken-2 font-weight-medium mb-4">
      <v-icon>mdi-arrow-left</v-icon> Back
    </v-btn>
      <v-card v-if="product">
        <v-img :src="product.image" height="400" class="mx-6 my-6"></v-img>
        <div class="rounded-xl mx-3 my-2">
        <v-card-title>{{ product.title }}</v-card-title>
        <v-card-text>${{ product.price }}</v-card-text>
        <v-card-text>{{ product.description }}</v-card-text>
        <v-card-actions>
          <v-btn rounded="xl" class="bg-orange-darken-2 font-weight-medium" @click="addToCart(product)">Add to Cart</v-btn>
        </v-card-actions>
        <v-card-actions>
                            <!-- Quantity Selector -->
        <v-btn @click="decrementQuantity" :disabled="quantity <= 1" icon="mdi-minus">
        </v-btn>
        <v-text-field
          v-model.number="quantity"
          style="max-width: 50px;"
          density="compact"
          center-affix
          variant="outlined"
          hide-details="true"
        ></v-text-field>
        <v-btn @click="incrementQuantity" icon="mdi-plus">
        </v-btn>
        </v-card-actions>
      </div>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(null);
const quantity = ref(1); 

onMounted(() => {
  fetchProduct(route.params.id);
});

watch(
  () => route.params.id,
  (newId) => {
    fetchProduct(newId);
  }
);

const fetchProduct = async (productId) => {
  const fetchedProduct = await productStore.fetchProductById(productId);
  if (fetchedProduct) {
    product.value = fetchedProduct;
  } else {
    console.log('Product not found');
    product.value = null;
  }
};

const incrementQuantity = () => {
  quantity.value += 1;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

const addToCart = (product) => {
  cartStore.addToCart(product, quantity.value);
  console.log(quantity.value)
};

const goBack = () => {
  router.go(-1);
};
</script>