<script lang="ts" setup>
defineProps({
  id: { type: Number, required: true },
  title: String,
  price: Number,
  rating: Number,
  thumbnail: String,
});

const handleClick = (id: number) => {
  const customClickEvent = new CustomEvent("item-click", { detail: { id } });
  window.dispatchEvent(customClickEvent);
};
</script>

<template>
  <div :class="$style.container" @click="handleClick(id)">
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
  height: 200px;
  max-height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
  overflow: hidden;
}
.title {
  margin-top: 10px;
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
