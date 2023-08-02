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
        <div
          class="col-4"
          v-for="(key, index) in Object.keys(chats)"
          :key="index"
        >
          <q-card class="rounded q-ma-md">
            <div class="text-right">
              <q-btn color="black" icon="more_horiz" size="sm" flat>
                <q-menu>
                  <q-list style="min-width: 100px" dense separator>
                    <q-item clickable v-close-popup>
                      <q-item-section
                        @click="
                          removeFromCollection(
                            $route.params.collection,
                            key,
                            index
                          )
                        "
                      >
                        remove from collection
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="deleteChat(key)">
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-card-section
              class="text-subtitle1 text-weight-medium text-black text-center"
            >
              <div id="goTo" @click="open(key)">
                <q-item-label lines="1">
                  {{
                    cheerio
                      .load(
                        `${
                          chats[key]["title"] != undefined
                            ? chats[key]["title"]
                            : "null"
                        }`
                      )
                      .text()
                  }}
                </q-item-label>
                <q-tooltip>
                  {{
                    cheerio
                      .load(
                        `${
                          chats[key]["title"] != undefined
                            ? chats[key]["title"]
                            : "null"
                        }`
                      )
                      .text()
                  }}
                </q-tooltip>
              </div>
              <div class="text-grey-8">
                <small
                  ><q-icon name="bi-watch" />
                  <span class="q-mx-md">{{
                    new Date(chats[key]["date"]).toLocaleTimeString()
                  }}</span></small
                >
              </div>
            </q-card-section>
            <q-card-section>
              <a
                :href="key"
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
const router = useRouter();

const route = useRoute();
const { collection } = route.params;
const $q = useQuasar();
const chats = ref({});
function open(url) {
  router.push(`/exportDocs?url=${url}`);
}

const removeFromCollection = async (collectionName, url) => {
  const { data: singleChat } = await $q.bex.send("getSingleChat", {
    key: url,
  });
  const { data } = await $q.bex.send("removeFromCollection", {
    collectionName: collectionName,
    url: url,
  });

  const set = new Set();

  Array.from(singleChat["associatedCollections"]).forEach((value) => {
    set.add(value);
  });
  set.delete(collectionName);

  singleChat["associatedCollections"] = set;

  if (data) {
    await $q.bex.send("saveChats", singleChat);

    console.log(chats.value);
    delete chats.value[url];
  }
};

const collectionItem = async () => {
  if (collection != undefined) {
    const { data } = await $q.bex.send("getCollectionItems", {
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
