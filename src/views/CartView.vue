<template>
  <v-container>
    <v-btn @click="goBack" rounded="xl" class="bg-orange-darken-2 font-weight-medium mb-4">
      <v-icon>mdi-arrow-left</v-icon> Back
    </v-btn>
    <h1 class="mb-4">Shopping Cart</h1>
    <h2 v-if="cartItems.length === 0" class="mb-4">No items</h2>
    <v-list v-else rounded="lg" class="mb-4">
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-title>{{ item.title }} (x{{ item.quantity }})</v-list-item-title>
        <v-list-item-subtitle>${{ item.price * item.quantity }}</v-list-item-subtitle>
        <v-card-actions>
          <v-btn @click="decrementQuantity(item)" :disabled="item.quantity <= 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model.number="item.quantity"
            type="number"
            min="1"
            outlined
            dense
            style="max-width: 60px;"
          ></v-text-field>
          <v-btn @click="incrementQuantity(item)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="removeFromCart(item.id)" color="error">Remove</v-btn>
        </v-card-actions>
      </v-list-item>
    </v-list>
    <h3>Total Items: {{ totalItems }}</h3>
    <h3>Total Price: ${{ totalPrice }}</h3>
    <v-btn to="/checkout" rounded="xl" class="bg-orange-darken-2 font-weight-medium mt-4 " :disabled="cartItems.length === 0">
      Proceed to Checkout
    </v-btn>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

const incrementQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const goBack = () => {
  router.go(-1);
};
</script>