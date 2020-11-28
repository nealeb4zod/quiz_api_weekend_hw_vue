<template>
  <div>
    <form>
      <label for="categories">Categorie: </label>
      <select
        name="categories"
        id="categories"
        @change="onChange"
        v-model="selectedCategory"
      >
        <option value="">All categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          >{{ category.name }}</option
        >
      </select>
      <label for="difficulties">Difficulties: </label>
      <select
        name="difficulties"
        id="difficulties"
        @change="onChange"
        v-model="selectedDifficulty"
      >
        <option value="">All difficulties</option>
        <option
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :value="difficulty"
          >{{ difficulty }}</option
        >
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      selectedCategory: null,
      selectedDifficulty: null,
      questions: [],
      categories: [],
      difficulties: ["Easy", "Medium", "Hard"],
    };
  },
  methods: {
    getCategories() {
      let url = "https://opentdb.com/api_category.php";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.categories = data.trivia_categories;
        });
    },

    getQuestions() {
      let url =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.questions = data.results;
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style></style>
