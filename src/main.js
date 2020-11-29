import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

export const eventBus = new Vue();

Vue.filter("capitalise", function(text) {
  let names = text.split(" ");
  let capitalisedNames = names.map((name) => {
    return name[0].toUpperCase() + name.slice(1);
  });
  return capitalisedNames.join(" ");
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
