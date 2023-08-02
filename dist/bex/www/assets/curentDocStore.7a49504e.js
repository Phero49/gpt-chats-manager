import { at as defineStore } from "./index.d7888b57.js";
const docStore = defineStore("counter", {
  state: () => ({
    contents: [],
    htmlString: "",
    title: "",
    date: "",
    url: "",
    numberOfQuestions: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment(questinCount) {
      if (questinCount > this.numberOfQuestions) {
        this.numberOfQuestions = questinCount;
      }
    }
  }
});
export { docStore as d };
