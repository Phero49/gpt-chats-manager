<template>
  <div class="row justify-between">
    <!--title-->
    <div class="text-h6 q-my-md text-capitalize">chats collections</div>
  </div>
  <div class="row justify-between items-center q-mx-lg q-px-md">
    <div>
      <div class="" v-if="collectionNames.length > 0">
        <div class="row">
          <div
            v-for="(colName, i) in collectionNames"
            :key="i"
            style="cursor: grab; position: relative"
            @mouseenter="mouseOver = i"
            @mouseleave="mouseOver = null"
          >
            <!--iterate the collections-->
            <div class="q-mr-lg q-my-md">
              <q-card
                class="my-card length"
                style="position: absolute; z-index: -1"
              >
                <div class="q-px-sm">
                  <div
                    @click="
                      () => {
                        $router.push(`/chat-collection/${colName}`);
                      }
                    "
                    class="flex q-pt-sm flex-center"
                  >
                    <q-avatar
                      size="50px"
                      font-size="40px"
                      color="black"
                      :text-color="mouseOver == i ? 'primary' : 'white'"
                      icon="folder"
                    />
                  </div>

                  <q-card-section>
                    <div
                      v-if="edit == null || edit != i"
                      class="text-medium ellipsis text-center"
                      :class="mouseOver == i ? 'white' : 'black'"
                    >
                      {{ colName }}
                    </div>
                    <div v-if="edit == i">
                      <q-input
                        v-model="editName"
                        type="text"
                        label="editColName"
                        dense
                      >
                        <template #append>
                          <div>
                            <q-icon name="edit" />
                          </div>
                        </template>
                      </q-input>
                      <q-btn
                        color="green"
                        icon="send"
                        class="full-width"
                        dense
                        size="sm"
                        unelevated
                        label="save"
                        @click="submitChange(i)"
                      />
                    </div>
                  </q-card-section>
                </div>
              </q-card>
              <q-card
                :style="mouseOver == i ? 'opacity:1;' : 'opacity:0;'"
                class="length"
                style="background-color: rgba(8, 8, 8, 0)"
              >
                <div class="row">
                  <div
                    style="height: 120px"
                    class="col-grow"
                    @click="
                      () => {
                        $router.push(`/chat-collection/${colName}`);
                      }
                    "
                  ></div>

                  <div class="text-right">
                    <q-btn
                      :style="
                        mouseOver == i ? ' display:inline ;' : 'display:none'
                      "
                      color="black"
                      flat
                      dense
                      style="margin: 0px"
                      icon="more_horiz"
                    >
                      <q-menu :persistent="mouseOver == i">
                        <q-list style="min-width: 100px">
                          <q-item
                            @click="exportCollection(colName, i)"
                            clickable
                            v-close-popup
                          >
                            <q-item-section>
                              <q-item-label caption>
                                export collection
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            @click="deleteCollection(colName, i)"
                            clickable
                            v-close-popup
                          >
                            <q-item-section>
                              <q-item-label caption>
                                delete collection
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator />
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <q-card-section>
          <div class="text-capitalize text-h6 text-bold text-grey">
            No chat collections found
          </div>
        </q-card-section>
      </div>
    </div>
    <div>
      <q-card class="my-card" flat>
        <div></div>
      </q-card>
    </div>
  </div>

  <div class="row justify-center items-center q-my-md">
    <q-card-section v-if="prewiew">
      <div></div>
      <div class="text-center">
        <q-btn
          color="primary"
          unelevated
          rounded
          v-show="!addColName"
          :icon="'add'"
          no-caps
          label="create a chat collection"
        >
        </q-btn>
      </div>

      <q-popup-proxy
        ref="proxy"
        @before-show="addColName = true"
        @before-hide="
          () => {
            addColName = false;
            colNameErr = false;
          }
        "
      >
        <q-banner>
          <div>
            <q-input
              autofocus
              v-model="newCollectionName"
              type="text"
              :error="colNameErr"
              label="collection name"
            >
              <template #prepend>
                <div>
                  <q-icon name="folder" />
                </div>
              </template>
            </q-input>
          </div>
          <div>
            <q-btn
              color="green"
              rounded
              icon-rigth="send"
              class="full-width"
              dense
              unelevated
              label="create collection"
              @click="createCollection"
            />
          </div>
        </q-banner>
      </q-popup-proxy>
    </q-card-section>

    <div>
      <q-btn
        v-if="collectionNames.length > 0 && prewiew"
        color="black"
        icon-right="folder"
        no-caps
        unelevated
        rounded
        label="view all collections"
        to="/chat-collections"
      />
    </div>
  </div>
</template>

<script setup>
//TODO:implement import
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";

const props = defineProps({
  prewiew: {
    type: Boolean,
    default: true,
  },
});
const mouseOver = ref(null);
const addColName = ref(false);
const colNameErr = ref(false);
const newCollectionName = ref();
const $q = useQuasar();
const collectionNames = ref([]);
const edit = ref(null);
const editName = ref();

const submitChange = async (index) => {
  const { data } = await $q.bex.send("editCollection", {
    key: collectionNames.value[index],
    newName: editName.value,
  });
  if (data) {
    edit.value = null;
    collectionNames.value[index] = editName.value;
  }
};

const deleteCollection = async (collectionName, index) => {
  const { data } = await $q.bex.send("deleteCollection", {
    key: collectionName,
  });
  if (data) {
    collectionNames.value.splice(index, 1);
  }
};

const proxy = ref();

const exportCollection = async (key) => {
  const { data } = await $q.bex.send("getCollectionItems", { key: key });
  if (data != null) {
    $q.loading.show();

    const a = document.createElement("a");
    const dataURI =
      "data:application/json;charset=utf-8," + encodeURIComponent(data);

    a.href = dataURI;
    a.download = `${key} chats_collection.json`;
    a.click();
    $q.loading.hide();
    $q.notify({
      message: "collection succefully exported",
      color: "green",
      badgeColor: "green",
      position: "bottom-left",
    });
  }
};
const createCollection = async () => {
  if (addColName.value) {
    const res = await $q.bex.send("createCollection", {
      collectionName: newCollectionName.value,
    });

    if (res.data["error"] == false) {
      proxy.value.hide();
      if (collectionNames.value > 3) {
        collectionNames.value.pop();
        collectionNames.value.unshift(newCollectionName.value);
      } else {
        collectionNames.value.unshift(newCollectionName.value);
      }

      $q.notify({
        color: "green",
        position: "top-right",
        message: `${newCollectionName.value} collection was created succefully `,
        icon: "thumb_up",
      });
    } else {
      addColName.value = true;
      colNameErr.value = true;
      $q.notify({
        color: "red",
        message: `error ${newCollectionName.value} ${res.data["msg"]}`,
      });
    }
  }
};

async function getCollections() {
  const { data, respond } = await $q.bex.send("getCollections", {
    all: props.prewiew ? false : true,
  });
  collectionNames.value = data;
  respond();
}

onMounted(async () => {
  await getCollections();
});
</script>
<style scoped>
.length {
  width: 200px;
  height: 120px;
}
</style>
