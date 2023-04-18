import { defineStore } from 'pinia';

export const docStore = defineStore('counter', {
  state: () => ({
    contents: [],
    htmlString: String,
    title: String,
    url: String

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
