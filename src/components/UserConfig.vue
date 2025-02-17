<template>
  <div id="nav-container">
    <v-card class="pa-5">
      <v-card-title>Configuração do Jogador</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Nome do Jogador" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="startGame">Iniciar Jogo</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const username = ref('');
const emit = defineEmits(['startGame']);

const startGame = () => {
  if (username.value.trim() !== '') {
    emit('startGame', username.value);
  }
};
</script>

<style scoped>
.v-card {
  max-width: 400px;
  margin: auto;
}
</style>
