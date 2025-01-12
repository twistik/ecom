import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProductsByCategor(category) {
        this.loading = true;
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/category/${category}`
          );
          this.products = response.data;
        } catch (error) {
          this.error = error;
        } finally {
          this.loading = false;
        }
      },
      searchProducts(query) {
        if (!query) {
          this.filteredProducts = this.products; // Reset to all products if no query
          return;
        }
        const lowerCaseQuery = query.toLowerCase();
        this.filteredProducts = this.products.filter(
          (product) =>
            product.title.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery)
        );
      },
  },
});