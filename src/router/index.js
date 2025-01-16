import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductView from '@/views/ProductView.vue';
import CartView from '@/views/CartView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CategoryView from '@/views/CategoryView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/product/:id', component: ProductView, props: true },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView }, 
  { path: '/category/:category', component: CategoryView, props: true }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;