<template>
  <div v-if="!products">loading products...</div>
  <div v-else>
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts" setup>
import ProductList from "./components/ProductList.vue";
import { Product } from "types/product";
import { onMounted, ref } from "vue";
const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = await fetch("https://dummyjson.com/products?limit=20")
    .then((res) => res.json())
    .then((data) => data.products);
});
</script>
