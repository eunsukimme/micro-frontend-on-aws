<template>
  <div v-if="!products">loading products...</div>
  <div v-else :class="$style['product-list']">
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts" setup>
import ProductList from "components/ProductList.vue";
import { Product } from "types/product";
import { onMounted, ref } from "vue";
const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products);
});
</script>

<style lang="scss" module>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
