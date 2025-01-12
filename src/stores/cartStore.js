import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
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