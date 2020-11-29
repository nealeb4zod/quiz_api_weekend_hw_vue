<template>
  <div id="get-name">
    <form v-on:submit.prevent="updatePlayerName">
      <label for="name">Enter your name: </label>
      <input type="text" name="name" id="name" v-model="player.name" />
      <input type="submit" value="Add Name" />
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
