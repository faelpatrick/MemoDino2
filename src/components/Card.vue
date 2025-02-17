<template>
  <v-card class="card" :class="{ flipped: card.flipped }" @click="$emit('flip', card)">
    <div class="card-content">
      <!-- Frente da carta -->
      <div v-if="card.flipped" class="card-front">
        <img class="icon" :src="`/assets/images/${card.icon}.png`" :alt="card.icon">
      </div>

      <!-- Verso da carta -->
      <div v-else class="card-back">
        <div class="egg">&#129370;</div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  card: Object, // Agora `card` é um objeto completo, não apenas uma string
});
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  perspective: 1000px;
}

.card.flipped {
  background: white;
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front img {
  width: 80%;
  height: 80%;
}

.card-back {
  background: lightgray;
}

.egg {
  font-size: 3rem;
}
</style>
