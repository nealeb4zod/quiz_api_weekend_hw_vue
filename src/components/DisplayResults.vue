<template>
  <div>
    <div>
      <h1>You scored {{ score }} out of 10!</h1>
    </div>
    <div>
      <p>Here are your results:</p>
      <div
        class="input-box"
        id="answers-box"
        v-for="(answer, index) in this.answeredQuestions"
        :key="index"
      >
        <span>Question {{ answer.questionNumber }}.</span>
        <br />
        <span v-html="answer.question"></span>
        <br />
        <div
          :class="{
            'correct-answers': answer.selectedAnswer.correct,
            'wrong-answers': !answer.selectedAnswer.correct,
          }"
          class=""
        >
          <span>Your answer: </span>
          <span v-html="answer.selectedAnswer.answer"></span>
          <br />
          <span>Correct answer: </span>
          <span v-html="answer.correct_answer"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayResults",
  props: ["answeredQuestions"],
  mounted() {},
  computed: {
    score() {
      const correctAnswers = this.answeredQuestions.filter(
        (question) => question.selectedAnswer.correct === true
      );
      console.log(correctAnswers);
      return correctAnswers.length;
    },
  },
};
</script>

<style></style>
