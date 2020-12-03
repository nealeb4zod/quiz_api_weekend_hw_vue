<template>
  <div class="nav-box">
    <div id="previous">
      <button @click="updateCurrentQuestion('previous')">Previous</button>
    </div>
    <div id="next">
      <button @click="updateCurrentQuestion('next')">Next</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'question-navigation',
  methods: {
    updateCurrentQuestion(update) {
      eventBus.$emit('update-current-question', update);
    },
  },
};
</script>

<style>
.nav-box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 25px;
  background: lightcyan;
  text-align: center;
  border-radius: 15px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  margin-top: 10px;
}
</style>
