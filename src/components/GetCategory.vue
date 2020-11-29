<template>
  <div id="category-form">
    <form v-on:submit.prevent="updateSelectedCategory">
      <label for="categories">Category: </label>
      <select name="categories" id="categories" v-model="selectedCategory">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category"
          >{{ category.name }}</option
        >
      </select>
      <input type="submit" value="Select Category" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "get-categories",
  props: ["categories"],
  data() {
    return {
      selectedCategory: null,
    };
  },
  methods: {
    updateSelectedCategory() {
      eventBus.$emit("updated-selected-category", this.selectedCategory);
    },
  },
};
</script>

<style></style>
