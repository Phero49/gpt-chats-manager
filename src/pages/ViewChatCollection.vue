<template>
  <q-page padding>
    <div>
      <div
        class="text-center text-capitalize text-center q-py-md q-my-sm text-h6"
        style="text-size-adjust: 100%"
      >
        {{ $route.params.collection }} Collection
      </div>
    </div>
    <q-card-section>
      <div class="row items-start q-gutter-y-lg">
        <div class="col-4" v-for="(values, index) in chats" :key="index">
          <q-card class="rounded q-ma-md">
            <div class="text-right">
              <q-btn color="black" icon="more_horiz" size="sm" flat>
                <q-menu>
                  <q-list style="min-width: 100px" dense separator>
                    <q-item clickable v-close-popup>
                      <q-item-section> remove from collection </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section> Share </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="deleteChat(values.url, values.title, index)"
                    >
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-card-section
              class="text-subtitle1 text-weight-medium text-black text-center"
            >
              <div id="goTo" @click="open(index, values, values.url)">
                <q-item-label lines="1">
                  {{
                    cheerio
                      .load(
                        `${values.title != undefined ? values.title : "null"}`
                      )
                      .text()
                  }}
                </q-item-label>
                <q-tooltip>
                  {{
                    cheerio
                      .load(
                        `${values.title != undefined ? values.title : "null"}`
                      )
                      .text()
                  }}
                </q-tooltip>
              </div>
              <div class="text-grey-8">
                <small
                  ><q-icon name="bi-watch" />
                  <span class="q-mx-md">{{
                    new Date(values.date).toLocaleTimeString()
                  }}</span></small
                >
              </div>
            </q-card-section>
            <q-card-section>
              <a
                :href="values.url"
                style="text-decoration: none"
                class="text-blue text-subtitle1 text-center"
                target="_blank"
                >Go to chat</a
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import * as cheerio from "cheerio";
import { useRoute, useRouter } from "vue-router";
import { docStore } from "src/stores/curentDocStore";
const store = docStore();
const router = useRouter();

const route = useRoute();
const { collection } = route.params;
const $q = useQuasar();
const chats = ref([]);
function open(index, doc, url) {
  store.$patch({ ...doc });
  router.push(`/exportDocs?${url}`);
}
const collectionItem = async () => {
  if (collection != undefined) {
    const { data, respond } = await $q.bex.send("getCollectionItems", {
      key: collection,
    });

    chats.value = data;
    console.log(data);
  }
};
onMounted(async () => {
  await collectionItem();
});
</script>
<style scoped>
#goTo:hover {
  cursor: grab;
  color: rgb(8, 44, 248);
}
</style>
