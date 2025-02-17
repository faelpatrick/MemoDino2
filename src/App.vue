<template>
  <v-app>
      <MemoDino2 />
  </v-app>
</template>

<script setup>
import MemoDino2 from './components/MemoDino2.vue';
</script>
<style>
* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

#app {
	font-family: 'Righteous', sans-serif;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 100vh;
	/* background-color: #c7cdd3; */
	background-image: -o-linear-gradient(274deg, #03d400, #153e15);
	background-image: linear-gradient(176deg, #03d400, #153e15);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

/* #app{
	font-family: 'Righteous', sans-serif;
  background-color: #000000;
  margin: 0;
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}
*/

#app .v-application__wrap {
    width: 100vw;
  	background-image: -o-linear-gradient(274deg, #03d400, #153e15);
	background-image: linear-gradient(176deg, #03d400, #153e15);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
