<template>
  <div class="input-box" id="get-name">
    <form v-on:submit.prevent="updatePlayerName" class="flex-form">
      <h1>Welcome to Trivia Quiz.</h1>
      <label for="name">Please enter your name: </label>
      <input type="text" name="name" id="name" v-model="player.name" />
      <input type="submit" value="Continue..." />
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "get-name",
  data() {
    return {
      player: { name: "", score: 0 },
    };
  },
  methods: {
    updatePlayerName() {
      eventBus.$emit("updated-player-name", this.player.name);
    },
  },
};
</script>

<style></style>
