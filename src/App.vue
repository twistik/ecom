<template>
  <v-app>
    <HeaderSection></HeaderSection>
    <v-main>
      <router-view></router-view>
      <FooterSection></FooterSection>
</v-main>
  </v-app>
</template>

<script setup>
import FooterSection from './components/FooterSection.vue';
import HeaderSection from './components/HeaderSection.vue';
</script>