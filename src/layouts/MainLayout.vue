<template>
  <q-layout view="lHh LpR fff">
    <q-header
      v-if="$route.name != 'editChat'"
      :elevated="false"
      bordered
      class="bg-grey-8"
    >
      <q-toolbar>
        <q-toolbar-title
          ><q-icon name="manager" /> Chats Manager
        </q-toolbar-title>

        <div>
          <q-btn
            icon="folder"
            to="/"
            :color="$route.path == '/' ? 'green' : 'white'"
            label="my chats "
            flat
          />
        </div>

        <div>
          <q-btn icon="backup" label="backup" flat>
            <q-menu>
              <q-list>
                <q-item clickable v-ripple @click="authi">
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        src="src/assets/Google_Drive_icon_(2020).svg"
                        alt=""
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Google drive</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <div>
          <q-btn
            :color="$route.path == '/help' ? 'green' : 'white'"
            icon="help"
            label="help"
            flat
            to="/help"
          />
        </div>
        <div>
          <q-btn flat @click="onClick" label="about">
            <q-tooltip> learn about this app</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer
      v-if="$route.path == '/'"
      elevated
      :height-hint="20"
      class="bg-black transparent"
    >
      <div class="q-py-sm">
        <div></div>
        <div
          class="text-center q-py-sm text-subtitle1 text-capitalize text-black"
        >
          <div><q-icon name="copyright" />pemphero mkuka</div>
        </div>
      </div>
    </q-footer>

    <q-drawer
      v-if="$route.name !== 'collectionsItems' && $route.name !== 'collections'"
      bordered
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-list v-mutation="handler" v-if="$route.name == 'editChat'">
        <div class="text-body1 text-weight-medium text-center q-my-md">
          Chat outline
        </div>
        <div
          id="container"
          @click="
            (e) => {
              e.preventDefault();
            }
          "
        >
          <div
            :draggable="true"
            v-for="(item, index) in store.contents"
            :key="index"
            dropzone="move"
            aria-dropeffect="popup"
            @dragover="
              (e) => {
                e.preventDefault();
              }
            "
            @dragstart="onDragEnter(index, $event)"
            @drop="onDrop(index, $event)"
            :id="`item-${index}`"
          >
            <q-item @click="scrollTo(index)" clickable>
              <q-item-section top avatar>
                <q-avatar color="black" size="sm" text-color="white">
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  lines="2"
                  class="text-subtitle1 headings"
                  caption
                  >{{ item }}</q-item-label
                >
              </q-item-section>
              <q-item-section side v-if="selectedItem == index">
                <q-card-actions>
                  <q-btn
                    round
                    dense
                    size="sm"
                    flat
                    icon="delete"
                    @click="clickHandler1"
                  />
                </q-card-actions>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
      <!--recent chats-->
      <q-scroll-area
        style="overflow-x: hidden"
        class="fit"
        :thumb-style="{
          right: '2px',
          borderRadius: '5px',
          backgroundColor: 'white',
          width: '5px',
          opacity: '0.75',
        }"
      >
        <q-list
          v-if="$route.path === '/'"
          separator
          class="bg-grey-10 text-white q-px-sm"
        >
          <div class="text-body1 q-py-md">
            <q-icon name="recent" /> Recently opened chats
          </div>

          <q-item
            v-for="(key, i) in Object.keys(recentStore.recent)"
            :to="`/exportDocs?url=${key}`"
            :key="i"
          >
            <q-item-label lines="1" class="text-white" caption>
              {{ cheerio.load(recentStore.recent[key]).text() }}
            </q-item-label>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import * as cheerio from "cheerio";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { makeEven } from "src/js/getIds";
import { docStore } from "../stores/curentDocStore";
import { recent } from "src/stores/recent";
import DriveIcon from "src/assets/DriveIcon.vue";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();
const apiKey = auth.app.options.apiKey;

const authi = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);

  $q.notify("Text has been highlighted");
};
const clientID =
  "468883781787-l5l5p17fsl57h0c9b129c3ju3ldmsfol.apps.googleusercontent.com";
const scope =
  "https://www.googleapis.com/auth/drive.appdata,https://www.googleapis.com/auth/drive.appfolder";
async function SignupWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const user = await signInWithPopup(auth, provider);
    const { accessToken } = user.user;

    if (user != null) {
      //   console.log(user);
      try {
        const response = await api.get("/login", {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        const customToken = response.data;

        setPersistence(auth, browserLocalPersistence)
          .then(() => {
            return signInWithCustomToken(auth, customToken);
          })
          .then((u) => {
            console.log(u);
            console.log(auth.currentUser);
          });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function backup(params) {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
    } else {
      SignupWithGoogle();
    }
  });
}

const recentStore = recent();
const store = docStore();
const router = useRouter();
const $q = useQuasar();
function today() {
  let dayDate = new Date().toLocaleDateString("YYYYMMDD");
  let dateArray = dayDate.split("/");

  let fixedDate = dateArray.map((item) => {
    if (item.length < 2) {
      return `0${item}`;
    } else {
      return item;
    }
  });

  let mothDay = fixedDate.splice(0, 2);
  console.log(fixedDate.concat(mothDay).join("/"));
  return fixedDate.concat(mothDay).join("/");
}

const date = ref(today());

const chatContents = store.contents;
const selectedItem = ref(0);

function scrollTo(index) {
  selectedItem.value = index;
  const element = document.querySelector(`#group-${makeEven(index)}`);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  element.classList.add("bg-yellow-4");

  setTimeout(() => {
    element.classList.remove("bg-yellow-4");
  }, 3000);
}

$q.bex.once("get_chat", (data) => {
  if (data.data.chat) {
    const mydata = data.data;
    chatContents.value = data.data.req;

    const title = `<h6>${data.data.title}</h6>`;
    store.$reset();
    setTimeout(() => {
      store.contents = mydata.req;

      store.url = mydata.chat_url;
      store.title = title;
      store.htmlString = mydata.chat.join("");

      router.push("/exportDocs");
    }, 400);

    console.log(data, "mydata");
  }
});

onUnmounted(() => {
  $q.bex.off("get_chat");
});

const leftDrawerOpen = ref(false);
function handler() {}
leftDrawerOpen,
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

const dr = ref();
const draggedItemIndex = ref();
function onDragEnter(index, e) {
  dr.value = e.target;
  draggedItemIndex.value = index;

  console.log(e);
}

const exportchat = async () => {
  const { data, respond } = await $q.bex.send("exportChat", {});
};
function onDrop(index, e) {
  // Get the dragged item and remove it from the contents array
  let draggedItem = store.contents.splice(draggedItemIndex.value, 1)[0];

  // Insert the dragged item at the new index
  store.contents.splice(index, 0, draggedItem);

  console.log(index + 1, "drop", draggedItemIndex.value + 1);

  // Get the parent node and its children
  const parentNode = document.querySelector("#editorContent");
  const children = Array.from(parentNode.children);

  console.log(children);

  // If there is more than one child element
  if (children.length > 1) {
    // Get the element to replace

    const draggedGroup = children[draggedItemIndex.value];
    const id1 = draggedGroup.getAttribute("id");

    // Get the element to replace with
    const replaceOn = children[index];
    const dropedId = replaceOn.getAttribute("id");
    const dropedIdInt = parseInt(dropedId.split("-")[1]);
    console.log(dropedId, id1);

    // Replace the elements by inserting them before/after each other

    const insertedNode = parentNode.insertBefore(draggedGroup, replaceOn);

    scrollTo(draggedItemIndex.value);
    setTimeout(() => {
      for (let i = 0; i < children.length; i++) {
        const element = insertedNode.parentElement.children[i];
        element.id = `group-${makeEven(i)}`;
        console.log(element, element.id);
      }
    }, 1000);
    //console.log(insertedNode, replaceOn, index);
    // parentNode.insertBefore(draggedGroup, insertedNode);
    // parentNode.insertBefore(draggedGroup, cc);

    //  console.log(draggedGroup, draggedResponse);
  }
}
</script>
<style>
.headings::first-letter {
  text-transform: capitalize;
}
</style>
