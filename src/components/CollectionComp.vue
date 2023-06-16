<template>
  <div class="row justify-between">
    <div class="text-h6 q-my-md text-capitalize">chats collections</div>
  </div>
  <div class="row justify-between items-center q-mx-lg q-px-md">
    <div>
      <div class="" v-if="collectionNames.length > 0">
        <q-card-section>
          <q-card-actions>
            <div
              v-for="(colName, i) in collectionNames"
              :key="i"
              style="width: 220px; cursor: grab"
              @mouseenter="mouseOver = i"
              @mouseleave="mouseOver = null"
            >
              <q-card
                :class="mouseOver == i ? ' bg-blue-3 shadow-5' : ''"
                class="my-card q-mr-lg q-my-md"
              >
                <div class="text-right">
                  <q-btn
                    :style="mouseOver ? ' display:inline ;' : 'none'"
                    color="black"
                    size="sm"
                    flat
                    dense
                    style="margin: 0px"
                    icon="more_horiz"
                  >
                    <q-menu :persistent="mouseOver == i">
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
                      @click="
                        () => {
                          $router.push(`/chat-collection/${colName}`);
                        }
                      "
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
            </div>
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
              <template v-slot:prepend>
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

const proxy = ref();

const createCollection = async () => {
  if (addColName.value) {
    console.log(newCollectionName.value);
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
  console.log(data);
  collectionNames.value = data;
  respond();
}

onMounted(async () => {
  await getCollections();
});
</script>
