<script lang="ts" setup>
defineProps({
  title: String,
  price: Number,
  rating: Number,
  thumbnail: String,
});
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.thumbnailContainer">
      <img :src="thumbnail" :class="$style.thumbnail" />
    </div>
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style['price-section']">
      <div :class="$style.price">$ {{ price }}</div>
      <div :class="$style.rating">⭐️ {{ rating }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  height: 240px;
  max-height: 240px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.4);
    }
  }
}
.rating {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 10px;
  width: fit-content;
}
.thumbnailContainer {
  overflow: hidden;
}
.thumbnail {
  width: 100%;
  height: 110px;
  max-height: 110px;
  object-fit: cover;
  transition: transform 0.3s;
  overflow: hidden;
}
.title {
  margin-top: 4px;
  font-size: 18px;
  height: 40px;
}
.price-section {
  display: flex;
  justify-content: space-between;
}
.price {
  font-size: 16px;
  font-weight: bold;
}
</style>
