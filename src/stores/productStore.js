import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    allProducts: [], // Store all products
    products: [], // Cached products
    displayedProducts: [],
    filteredProducts: [],
    categoryProducts: {}, // Cache products by category
    loading: false,
    error: null,
    currentPage: 1, // Track the current page
    productsPerPage: 6, // Number of products to load per page
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
        this.displayedProducts = this.allProducts.slice(0, this.productsPerPage);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    loadMoreProducts() {
      const nextPage = this.currentPage + 1;
      const startIndex = (nextPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;

      // Add the next chunk of products to the displayed products
      this.displayedProducts = [
        ...this.displayedProducts,
        ...this.allProducts.slice(startIndex, endIndex),
      ];

      this.currentPage = nextPage; // Update the current page
    },

    /*async fetchProductsByCategory(category) {
      this.loading = true;
      this.products = this.allProducts.filter(
        (product) => product.category === category
      );
    },*/
    async fetchProductsByCategory(category) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        this.products = response.data; // Store filtered products
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(productId) {
      this.loading = true;
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return response.data; // Return the fetched product
      } catch (error) {
        this.error = error;
        return null;
      } finally {
        this.loading = false;
      }
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