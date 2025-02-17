<template>
  <div id="MemoDino2">

    <div id="nav-container">
      <h2 @click="()=> gameOver()">🦕 Memo Dino 2</h2>
      <div class="d-flex flex-row justify-between align-center">
        <h2>Nível: </h2>
        <!-- lista para trocar dificuldade -->
        <v-select
          v-model="difficulty"
          :items="[{ title: 'Fácil', value: 'easy' }, { title: 'Médio', value: 'medium' }, { title: 'Difícil', value: 'hard' }]"
          outlined
          style="width: 150px;"
          hide-details
          @update:model-value="changeLevel()"
        ></v-select>
      </div>
      <div v-if="username" class="d-flex flex-row justify-between align-center">
        <h2>{{ username }}</h2>
        <v-btn color="white"  @click="sair()" class="ml-4">Sair</v-btn>
      </div>
      <div v-if="!username" class="d-flex flex-row justify-between align-center items-center">
        <!-- input with username -->
        <v-text-field v-model="usernamefield" 
        label="Digite seu nome" 
        style="width: 200px;"
        hide-details="true"
        variant="outlined"></v-text-field>
        <v-btn color="white" height="56" class="ml-4 font-bold" @click="updateName(usernamefield)">Salvar</v-btn>
      </div>
      <div v-if="false">
        <h3>{{ username }}</h3>
      </div>
      <div v-if="false">
        <h3>{{ username }}</h3>
      </div>
      <h3>
        Tentativas: {{ score }}
<!--         <span v-if="difficulty === 'easy'"> / 6</span>
        <span v-if="difficulty === 'medium'"> / 10</span>
        <span v-if="difficulty === 'hard'"> / 16</span> -->
      </h3>
    </div>

    <GameBoard v-if="Cards" :Cards="Cards" @flip="handleFlip" :difficulty="difficulty"/>
</div>

<v-dialog
  v-model="GameOver"
  fullscreen
  hide-overlay
  >
  <div style="background-color: #0008;" class="game-over">

    <h1>Game Over!</h1>
    <h2>Erros: {{ score }}</h2>
    <h3>Parabéns, {{ username }}!</h3>
    <div class="placar-gameover">

      <h3 class="text-center">Placar</h3>
      <table v-if="geralScore">
        <tr v-for="(score, date) in geralScore" :key="date">
          <td>{{ score.name }}        </td>
          <td>{{ new Date(date).toLocaleString() }}</td>     
          <td>{{ score.difficulty }}</td>
          <td>{{ score.score }}</td>
        </tr>
      </table>
    </div>
    <v-btn size="x-large" class="btn-jogardenovo" color="green" @click="restart()">Jogar de novo!</v-btn>

  </div>
</v-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import game from './game.js';
import GameBoard from './GameBoard.vue';
// import UserConfig from './UserConfig.vue';

const username = ref('');
const usernamefield = ref('');
const score = ref(0);
const difficulty = ref('');
const MemoDino2Data = ref({});
const geralScore = ref({});

const GameOver = ref(false);
const Cards = ref([]);

const loadMemoDino2Data = async () => {
  MemoDino2Data.value = JSON.parse(localStorage.getItem('MemoDino2Data') || '{}');
  username.value = MemoDino2Data.value.username || '';
  usernamefield.value = MemoDino2Data.value.username || '';
  difficulty.value = MemoDino2Data.value.difficulty || 'medium';
  score.value = MemoDino2Data.value.score || 0;
  geralScore.value = MemoDino2Data.value.geralScore || {};
  console.log('MemoDino2Data', MemoDino2Data.value);
};

const saveMemoDino2Data = () => {
  localStorage.setItem('MemoDino2Data', JSON.stringify(MemoDino2Data.value));
};

const updateName = (newName) => {
  username.value = newName;
  MemoDino2Data.value.username = newName;
  saveMemoDino2Data();
};

const sair = () => {
  username.value = '';
  usernamefield.value = ''; 
  score.value = 0;
  MemoDino2Data.value = {};
  saveMemoDino2Data();
};

const startGame = () => {
  GameOver.value = false;
  game.setDifficulty(difficulty.value);
  Cards.value = game.createCardsFromTechs();
  console.log('Cards', Cards.value);
};

const restart = () => {
  game.clearCards();
  game.setDifficulty(difficulty.value);
  GameOver.value = false;
  score.value = 0;
  Cards.value = game.createCardsFromTechs();
}

const changeLevel = () => {
  MemoDino2Data.value.difficulty = difficulty.value;
  saveMemoDino2Data();
  restart();
};

const gameOver = () => {
const dataSave = { name: username.value, difficulty: difficulty.value, score: score.value };
 let novoPlacar = {
    ...MemoDino2Data.value.geralScore,
    [new Date().toISOString()]: dataSave,
  }
  geralScore.value = Object.values(novoPlacar).sort((a, b) => b.score - a.score);
  MemoDino2Data.value.geralScore = novoPlacar;

  saveMemoDino2Data();
  GameOver.value = true;
  game.clearCards();
}

function handleFlip(card) {
  game.flipCard(card.id, () => {
    // Game Over Callback
    gameOver();
  }, () => {
    // No Match Callback
    score.value += 1;
    Cards.value = [...game.cards];
  });
  Cards.value = [...game.cards];
}

onMounted(() => {
  loadMemoDino2Data();
  startGame();
});

</script>

<style>
#MemoDino2 #nav-container {
  color: #fff;
  background-color: #124c74;
  border-bottom: #124c74AA 4px solid;
  padding: 4px 20px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-over {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
  font-size: 2rem;
  color: #fff;
  background-color: #0009;
}

.btn-jogardenovo {
  padding: 10px 20px;
  font-size: 2rem;
  border-radius: 10px;
  font-weight: 900;
}

.placar-gameover {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000;
  background-color: #ededed;
  font-size: 1rem;
  padding: 4px;
  border-radius: 6px;
}

.placar-gameover table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 6px;
}
.placar-gameover table tr:nth-child(odd) { 
  background-color: #fff;
}
.placar-gameover table tr td {
  padding: 8px;
  border: 1px solid #000;
}


@media screen and (max-width: 1024px) {
  #MemoDino2 #nav-container {
    max-width: 100vw;
    flex-wrap: wrap;
  }
  
}
</style>
