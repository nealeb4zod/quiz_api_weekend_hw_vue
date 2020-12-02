<template>
  <div id="numbers-wrapper">
    <div v-for="(question, index) in questions" :key="index">
      <div
        :class="{ 'answered-question': answeredQuestions.includes(question) }"
        class="unanswered-question"
      >
        {{ question.questionNumber }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-list',
  props: ['questions', 'answeredQuestions'],
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
  border-radius: 5px;
  padding: 10px;
}

.answered-question {
  border: 3px solid green;
  border-radius: 5px;
  padding: 10px;
}
</style>
