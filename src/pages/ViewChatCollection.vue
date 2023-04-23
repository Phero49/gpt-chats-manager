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
      <div class="row q-gutter-x-md items-start q-gutter-y-lg">
        <q-card class="col-3 card_bg" v-for="(values, index) in 5" :key="index">
          <div class="text-right">
            <q-btn color="white" icon="more_horiz" size="sm" flat>
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
            class="text-subtitle1 text-bold text-white text-center"
          >
            <div @click="open(index, values, values.url)">
              <q-item-label lines="2">
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
            <div class="text-grey-4">
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
              class="text-white text-subtitle1 text-center"
              target="_blank"
              >Go to chat</a
            >
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import * as cheerio from "cheerio";
import { useRoute } from "vue-router";
const route = useRoute();
const { collection } = route.params;
const $q = useQuasar();
const chats = ref([]);
const collectionItem = async () => {
  if (collection != undefined) {
    $q.bex.send("getCollectionItems", collection);
  }
};
onMounted(async () => {});
</script>
