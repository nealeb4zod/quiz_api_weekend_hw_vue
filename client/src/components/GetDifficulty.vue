<template>
  <div class="input-box" id="select-difficulty">
    <form v-on:submit.prevent="updateSelectedDifficulty" class="flex-form">
      <h2>One more thing {{ player.name }} - please select a diffculty.</h2>
      <label for="difficulties">Difficulties: </label>
      <select
        name="difficulties"
        id="difficulties"
        v-model="selectedDifficulty"
      >
        <option
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :value="difficulty"
          >{{ difficulty | capitalise }}</option
        >
      </select>
      <input type="submit" value="Select Difficulty" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "get-difficulties",
  props: ["difficulties", "player"],
  data() {
    return {
      selectedDifficulty: null,
    };
  },
  methods: {
    updateSelectedDifficulty() {
      eventBus.$emit("updated-selected-difficulty", this.selectedDifficulty);
    },
  },
};
</script>

<style></style>
