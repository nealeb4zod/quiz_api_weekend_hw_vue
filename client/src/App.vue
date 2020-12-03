<template>
  <div id="main-container">
    <transition name="component-fade" mode="out-in">
      <get-name v-if="!this.player.name"></get-name>
      <get-category
        v-if="!this.selectedCategory && this.player.name"
        :categories="categories"
        :player="player"
      ></get-category>
      <get-difficulty
        v-if="
          !this.selectedDifficulty && this.selectedCategory && this.player.name
        "
        :difficulties="difficulties"
        :player="player"
      ></get-difficulty>
      <generate-questions
        v-if="
          this.player.name &&
            this.selectedDifficulty &&
            this.selectedCategory &&
            this.questions.length === 0
        "
        :selectedCategory="this.selectedCategory"
        :selectedDifficulty="this.selectedDifficulty"
      ></generate-questions>
      <display-questions
        v-if="this.questions.length > 0 && this.answeredQuestions.length != 10"
        :questions="questions"
        :currentQuestion="currentQuestion"
        :answeredQuestions="answeredQuestions"
      ></display-questions>
      <display-results
        v-if="this.answeredQuestions.length === 10"
        :answeredQuestions="answeredQuestions"
        :player="player"
      ></display-results>
    </transition>
  </div>
</template>

<script>
import DisplayQuestionsVue from './components/DisplayQuestions.vue';
import DisplayResultsVue from './components/DisplayResults.vue';
import GenerateQuestionsVue from './components/GenerateQuestions.vue';
import GetCategoryVue from './components/GetCategory.vue';
import GetDifficultyVue from './components/GetDifficulty.vue';
import GetNameVue from './components/GetName.vue';
import IndividualQuestionVue from './components/IndividualQuestion.vue';

import { eventBus } from './main.js';

export default {
  name: 'app',
  data() {
    return {
      // selectedCategory: { name: '', id: '9' },
      // selectedDifficulty: 'easy',
      // questions: [],
      // categories: [],
      // difficulties: ['easy', 'medium', 'hard'],
      // player: { name: 'Neale', score: 0 },
      selectedCategory: null,
      selectedDifficulty: null,
      questions: [],
      categories: [],
      difficulties: ['easy', 'medium', 'hard'],
      player: { name: null },
      answeredQuestions: [],
      currentQuestion: 0,
    };
  },
  methods: {
    getCategories() {
      let url = 'https://opentdb.com/api_category.php';
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.categories = data.trivia_categories;
        });
    },
    generateQuestions(category, difficulty) {
      let url = `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${difficulty}&type=multiple`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.questions = data.results.map((question, index) => {
            question.questionNumber = index + 1;
            return question;
          });
        });
    },
  },
  mounted() {
    this.getCategories();
    eventBus.$on('updated-player-name', (name) => {
      this.player.name = name;
    });
    eventBus.$on('updated-selected-difficulty', (difficulty) => {
      this.selectedDifficulty = difficulty;
    });
    eventBus.$on('updated-selected-category', (category) => {
      this.selectedCategory = category;
    });
    eventBus.$on('answered-question', (question) => {
      if (this.answeredQuestions.includes(question)) {
        const index = this.answeredQuestions.indexOf(question);
        this.answeredQuestions.splice(index, 1, question);
      } else {
        this.answeredQuestions.push(question);
      }
    });
    eventBus.$on('send-generate-questions', () => {
      this.currentQuestion = 1;
      this.generateQuestions(this.selectedCategory, this.selectedDifficulty);
    });
    eventBus.$on('update-current-question', (update) => {
      if (update === 'next') {
        this.currentQuestion++;
      } else {
        this.currentQuestion--;
      }
    });
    eventBus.$on('skip-to-question', (questionNumber) => {
      this.currentQuestion = questionNumber;
    });
  },
  computed: {},
  components: {
    'get-name': GetNameVue,
    'get-category': GetCategoryVue,
    'get-difficulty': GetDifficultyVue,
    'display-questions': DisplayQuestionsVue,
    'display-results': DisplayResultsVue,
    'individual-question': IndividualQuestionVue,
    'generate-questions': GenerateQuestionsVue,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body {
  font-family: 'Itim', cursive;
  background: rgb(199, 232, 243);
  height: 100vh;
}

button {
  width: 150px;
  height: 30px;
  border-radius: 10px;
}
#main-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.input-box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 25px;
  background: lightcyan;
  text-align: center;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 300px;
}

.flex-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: auto;
}
flex-form > label,
select,
input {
  margin: 10px;
}
.correct-answers {
  border: 3px solid green;
  border-radius: 5px;
  padding: 10px;
}
.wrong-answers {
  border: 3px solid red;
  border-radius: 5px;
  padding: 10px;
}

#answers-box {
  margin: 10px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
