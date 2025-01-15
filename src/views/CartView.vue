<template>
  <v-container>
    <v-btn @click="goBack" rounded="xl" class="bg-orange-darken-2 font-weight-medium mb-4">
      <v-icon>mdi-arrow-left</v-icon> Back
    </v-btn>
    <h1>Shopping Cart</h1>
    <h2 v-if="cartItems.length === 0">No items</h2>
    <v-list v-else>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-title>{{ item.title }} (x{{ item.quantity }})</v-list-item-title>
        <v-list-item-subtitle>${{ item.price * item.quantity }}</v-list-item-subtitle>
        <v-card-actions>
          <!-- Quantity Selector -->
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
          <!-- Remove Button -->
          <v-btn @click="removeFromCart(item.id)" color="error">Remove</v-btn>
        </v-card-actions>
      </v-list-item>
    </v-list>
    <h3>Total Items: {{ totalItems }}</h3>
    <h3>Total Price: ${{ totalPrice }}</h3>
    <v-btn to="/checkout" rounded="xl" class="bg-orange-darken-2 font-weight-medium" :disabled="cartItems.length === 0">
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

// Get cart items and totals from the store
const cartItems = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

// Increment quantity
const incrementQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

// Decrement quantity
const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
};

// Remove item from cart
const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const goBack = () => {
  router.go(-1); // Go back to the previous page
};
</script>