import { defineStore } from 'pinia';

export const docStore = defineStore('counter', {
  state: () => ({
    contents: [],
    htmlString: "",
    title: "",
    date: "",
    url: "",
    numberOfQuestions: 0

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment(questinCount) {
      if (questinCount > this.numberOfQuestions) {
        this.numberOfQuestions = questinCount;

      }
    },
  },
});
