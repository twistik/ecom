import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    allProducts: [],
    products: [],
    displayedProducts: [],
    filteredProducts: [],
    categoryProducts: {},
    loading: false,
    error: null,
    currentPage: 1,
    productsPerPage: 6,
  }),
  actions: {
    async fetchProducts() {
      if (this.allProducts.length > 0) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.allProducts = response.data;
        this.products = response.data;
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

      this.displayedProducts = [
        ...this.displayedProducts,
        ...this.allProducts.slice(startIndex, endIndex),
      ];

      this.currentPage = nextPage;
    },

    async fetchProductsByCategory(category) {
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
    
    async fetchProductById(productId) {
      this.loading = true;
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return response.data;
      } catch (error) {
        this.error = error;
        return null;
      } finally {
        this.loading = false;
      }
    },
    resetProducts() {
      this.products = this.allProducts;
    },
      searchProducts(query) {
        if (!query) {
          this.filteredProducts = this.products;
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