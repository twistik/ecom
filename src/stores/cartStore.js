import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // Store cart items
  }),
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        // If the product is already in the cart, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it with the specified quantity
        this.items.push({ ...product, quantity });
      }
    },
    updateQuantity(productId, newQuantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});