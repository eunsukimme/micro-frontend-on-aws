<script lang="ts" setup>
import { Product } from "types/product";
import { PropType } from "vue";
import ProductCard from "./ProductCard.vue";

defineProps({
  products: { type: Object as PropType<Array<Product>>, required: true },
});
</script>

<template>
  <div :class="$style.container">
    <ProductCard
      v-for="{ id, title, price, thumbnail, rating } in products"
      :id="id"
      :title="title"
      :price="price"
      :thumbnail="thumbnail"
      :rating="rating"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px 20px;
}
</style>
