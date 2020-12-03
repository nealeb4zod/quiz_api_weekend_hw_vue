<template>
  <div class="input-box" v-if="currentQuestion === question.questionNumber">
    <div>
      <h2>Question {{ question.questionNumber }}.</h2>
      <br />
      <h3 v-html="question.question"></h3>
      <br />
    </div>
    <div>
      <form>
        <input
          type="radio"
          id="answer0"
          :value="answers[0]"
          v-model="selectedAnswer"
        />
        <label for="answer0" v-html="answers[0].answer"></label>
        <br />
        <input
          type="radio"
          id="answer1"
          :value="answers[1]"
          v-model="selectedAnswer"
        />
        <label for="answer1" v-html="answers[1].answer"></label>
        <br />
        <input
          type="radio"
          id="answer2"
          :value="answers[2]"
          v-model="selectedAnswer"
        />
        <label for="answer2" v-html="answers[2].answer"></label>
        <br />
        <input
          type="radio"
          id="answer3"
          :value="answers[3]"
          v-model="selectedAnswer"
        />
        <label for="answer3" v-html="answers[3].answer"></label>
        <br />
      </form>
      <button v-if="selectedAnswer" @click="confirmAnswer">
        Confirm Answer
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
  name: 'individual-question',
  data() {
    return {
      individualQuestion: this.question,
      selectedAnswer: null,
    };
  },
  props: ['question', 'currentQuestion'],
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
      eventBus.$emit('answered-question', this.individualQuestion);
    },
  },
};
</script>

<style></style>
