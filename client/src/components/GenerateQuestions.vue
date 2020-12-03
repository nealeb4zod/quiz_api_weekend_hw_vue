<template>
  <div class="input-box">
    <h2>
      You have selected "{{ this.selectedDifficulty }}" questions from the
      category "{{ this.selectedCategory.name }}".
    </h2>
    <button @click="sendGenerateQuestions()">
      Generate Quiz
    </button>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'generate-questions',
  props: ['selectedDifficulty', 'selectedCategory'],
  methods: {
    sendGenerateQuestions() {
      eventBus.$emit('send-generate-questions');
    },
  },
};
</script>

<style></style>
