<template>
  <div class="row justify-between">
    <div class="text-h6 q-my-md text-capitalize">chats collections</div>
    <q-btn
      v-if="prewiew"
      flat
      color="puple"
      icon="more"
      label="view more collections"
      to="/chat-collections"
    />
  </div>
  <div class="row q-gutter-x-md">
    <div class="col-9">
      <div class="" v-if="collectionNames.length > 0">
        <q-card-section>
          <q-card-actions>
            <q-card
              class="my-card q-mr-md q-my-md text-3xl"
              v-for="(colName, i) in collectionNames"
              :key="i"
              style="width: 200px"
            >
              <div class="text-right">
                <q-btn
                  color="black"
                  size="sm"
                  flat
                  dense
                  rounded
                  style="margin: 0px"
                  icon="more_vert"
                  @click="onClick"
                >
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item
                        @click="deleteCollection(colName, i)"
                        clickable
                        v-close-popup
                      >
                        <q-item-section>delete collection</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        @click="editCollectiname(colName, i)"
                      >
                        <q-item-section>edit collection name</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div class="q-px-md">
                <div
                  @click="
                    () => {
                      $router.push(`/chat-collection/${colName}`);
                    }
                  "
                  class="flex q-pt-sm flex-center"
                >
                  <q-avatar
                    size="70px"
                    font-size="50px"
                    color="teal"
                    text-color="white"
                    icon="folder"
                  />
                </div>

                <q-card-section>
                  <div
                    @click="
                      () => {
                        $router.push(`/chat-collection/${colName}`);
                      }
                    "
                    v-if="edit == null || edit != i"
                    class="text-medium ellipsis text-center"
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
                      <template v-slot:append>
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
          </q-card-actions>
        </q-card-section>
      </div>
      <div v-else>
        <q-card-section>
          <div class="text-capitalize text-h6 text-bold text-grey">
            No chat collections found
          </div>
        </q-card-section>
      </div>
    </div>
  </div>
  <q-card-section v-if="prewiew">
    <q-btn
      color="primary"
      flat
      :icon="addColName ? 'save' : 'add'"
      :label="addColName ? 'Save name' : 'create a chat collection'"
      @click="createCollection"
    >
      <q-popup-proxy
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
              dense
              v-model="newCollectionName"
              type="text"
              :error="colNameErr"
              label="collection name"
            >
              <template v-slot:prepend>
                <div>
                  <q-icon name="folder" />
                </div>
              </template>
            </q-input>
          </div>
        </q-banner>
      </q-popup-proxy>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";

const props = defineProps({
  prewiew: {
    type: Boolean,
    default: true,
  },
});
const addColName = ref(false);
const colNameErr = ref(false);
const newCollectionName = ref();
const $q = useQuasar();
const collectionNames = ref([]);
const edit = ref(null);
const editName = ref();
const editCollectiname = async (collName, index) => {
  editName.value = collName;
  edit.value = index;
};

const submitChange = async (index) => {
  if (editName.value != collectionNames[index]) {
  }
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
  const { data, respond } = await $q.bex.send("deleteCollection", {
    key: collectionName,
  });
  if (data) {
    collectionNames.value.splice(index, 1);
  }
};
const createCollection = async () => {
  if (addColName.value) {
    const res = await $q.bex.send("createCollection", {
      colName: newCollectionName.value,
    });
    if (res.data["error"] == false) {
      $q.notify({
        color: "green",
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
