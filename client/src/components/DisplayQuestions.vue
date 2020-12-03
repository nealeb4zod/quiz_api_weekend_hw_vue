<template>
  <div id="question-wrapper">
    <div>
      <question-list
        :questions="questions"
        :answeredQuestions="answeredQuestions"
      ></question-list>
    </div>
    <div v-for="(question, index) in questions" :key="index">
      <individual-question
        :question="question"
        :currentQuestion="currentQuestion"
      ></individual-question>
    </div>
    <div>
      <question-navigation></question-navigation>
    </div>
  </div>
</template>

<script>
import IndividualQuestionVue from './IndividualQuestion.vue';
import QuestionListVue from './QuestionList.vue';
import QuestionNavigationVue from './QuestionNavigation.vue';
export default {
  name: 'display-questions',
  props: ['questions', 'currentQuestion', 'answeredQuestions'],
  data() {
    return {};
  },
  components: {
    'individual-question': IndividualQuestionVue,
    'question-navigation': QuestionNavigationVue,
    'question-list': QuestionListVue,
  },
};
</script>

<style>
#question-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
</style>
