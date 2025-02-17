<template>
  <div class="game-board" :class="`grid-${difficulty}`">
    <div v-for="(card, index) in props.Cards" :key="index" >
        <div
          class="game-card"
          :class="{ flip: card.flipped }"
          @click="flipCard(card, index)"
        >
          <v-card-text class="card_front" v-if="card.flipped">
            <img class="w-75" :src="getImageSrc(card.icon)" alt="">
          </v-card-text>
          <v-card-text class="card_back" v-else>
            &#129370;
          </v-card-text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  Cards: Array,
  difficulty: String,
});

console.log('Cards board', props.Cards);

const emit = defineEmits(['flip']);

function flipCard(card, index) {
  if (!card.flipped) {
    emit('flip', { ...card, index });
  }
}
function getImageSrc(icon) {
  return new URL(`../assets/imagens/${icon}.png`, import.meta.url).href;
}
</script>

<style scoped>
.game-board {
  margin: 0 auto;
  margin: 4px auto;
  display: grid;
  gap: 10px;
  padding: 2px 20px;
  justify-content: center;
  justify-items: center;
  /* grid-template-columns: auto auto auto auto auto; */
}

.grid-easy {
  grid-template-columns: repeat(4, auto);
}
.grid-medium {
  grid-template-columns: repeat(5, auto);
}
.grid-hard {
  grid-template-columns: repeat(8, auto);
}

.game-card {
  width: 150px;
	height: 150px;
	position: relative;
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transition: -webkit-transform .5s;
	transition: -webkit-transform .5s;
	-o-transition: transform .5s;
	transition: transform .5s;
	transition: transform .5s, -webkit-transform .5s;
}

.card_back {
	width: 100%;
	height: 100%;
	position: absolute;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-radius: 20px;
	-webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.45);
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.45);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	color: #101c2c;
	background-color: #0da100;
	font-size: 60px;
	text-align: center;
}

.card_front {
	width: 100%;
	height: 100%;
	position: absolute;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-radius: 20px;
	-webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.45);
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.45);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transform: rotateY(180deg);
	transform: rotateY(180deg);
	background-color: #ffffff;
}
.card_front img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.flip {
	-webkit-transform: rotateY(180deg);
	transform: rotateY(180deg);
}

/* .game-card {
box-sizing: border-box;
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  padding: auto;
  border: solid 2px #000;
}
.game-card * {
  pointer-events: none;
  font-size: 4rem;
}
 */


 @media screen and (max-width: 1024px) {
  .game-board {
    grid-template-columns: repeat(4, auto);
    gap: 5px;
  }

  .game-card {
    width: 90px;
    height: 90px;
  }
  
 }

</style>
