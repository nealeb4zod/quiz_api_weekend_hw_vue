<template>
  <div
    class="input-box"
    v-if="lastAnsweredQuestion + 1 === this.questionNumber"
  >
    <div>
      <h2>Question {{ this.questionNumber }}.</h2>
      <h3 v-html="question.question"></h3>
    </div>
    <div>
      <form v-for="(answer, index) in answers" :key="index">
        <input
          type="radio"
          id="index"
          :value="answer"
          v-model="selectedAnswer"
        />
        <label for="index" v-html="answer.answer"></label>
        <br />
      </form>
      <button v-if="selectedAnswer" @click="confirmAnswer">
        Confirm Answer
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "individual-question",
  data() {
    return {
      individualQuestion: this.question,
      questionNumber: this.questionIndex + 1,
      selectedAnswer: null,
    };
  },
  props: ["question", "questionIndex", "lastAnsweredQuestion"],
  computed: {
    correctAnswer() {
      const correctAnswer = {
        answer: this.question.correct_answer,
        correct: true,
      };
      return correctAnswer;
    },
    incorrectAnswers() {
      const incorrectAnswers = this.question.incorrect_answers.map(
        (eachAnswer) => {
          let incorrectAnswer = {};
          incorrectAnswer.answer = eachAnswer;
          incorrectAnswer.correct = false;
          return incorrectAnswer;
        }
      );
      return incorrectAnswers;
    },
    answers() {
      let answersArray = [];
      answersArray.push(this.correctAnswer);
      answersArray = [...answersArray, ...this.incorrectAnswers];
      answersArray.sort(function(a, b) {
        var answerA = a.answer.toUpperCase(); // ignore upper and lowercase
        var answerB = b.answer.toUpperCase(); // ignore upper and lowercase
        if (answerA < answerB) {
          return -1;
        }
        if (answerA > answerB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      return answersArray;
    },
  },

  methods: {
    confirmAnswer() {
      this.individualQuestion.selectedAnswer = this.selectedAnswer;
      this.individualQuestion.questionNumber = this.questionNumber;
      eventBus.$emit("answered-question", this.individualQuestion);
    },
  },
};
</script>

<style></style>
