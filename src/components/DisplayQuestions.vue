<template>
  <div>
    <div v-for="(question, index) in questions" :key="index">
      <individual-question
        :question="question"
        :questionIndex="index"
        :lastAnsweredQuestion="lastAnsweredQuestion"
      ></individual-question>
    </div>
  </div>
</template>

<script>
import IndividualQuestionVue from "./IndividualQuestion.vue";
export default {
  name: "display-questions",
  props: ["questions", "lastAnsweredQuestion"],
  components: {
    "individual-question": IndividualQuestionVue,
  },
};
</script>

<style></style>
