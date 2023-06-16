import { defineStore } from "pinia";

export const recent = defineStore("recent", {
    state: () => ({
        recent: Object
    })
})
