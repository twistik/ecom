import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    allProducts: [], // Store all products
    products: [], // Cached products
    filteredProducts: [],
    categoryProducts: {}, // Cache products by category
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      if (this.allProducts.length > 0) {
        // If products are already cached, do not fetch again
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.allProducts = response.data; // Store all products
        this.products = response.data; // Initialize products with all products
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    fetchProductsByCategory(category) {
      this.products = this.allProducts.filter(
        (product) => product.category === category
      );
    },
    resetProducts() {
      this.products = this.allProducts; // Reset products to all products
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