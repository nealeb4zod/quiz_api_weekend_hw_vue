<template>
  <div id="numbers-wrapper">
    <div
      v-for="(question, index) in questions"
      :key="index"
      :class="{ 'answered-question': answeredQuestions.includes(question) }"
      class="unanswered-question"
      @click="skipToQuestion(question.questionNumber)"
    >
      {{ question.questionNumber }}
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'question-list',
  props: ['questions', 'answeredQuestions'],
  methods: {
    skipToQuestion(questionNumber) {
      eventBus.$emit('skip-to-question', questionNumber);
    },
  },
};
</script>

<style>
#numbers-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 10px;
}
.unanswered-question {
  border: 3px solid white;
  border-radius: 10px;
  padding: 10px;
  width: 45px;
  text-align: center;
}

.answered-question {
  border: 3px solid #1c75ff;
  border-radius: 10px;
  padding: 10px;
}
</style>
