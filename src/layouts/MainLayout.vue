<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$route.name != 'editChat'" elevated class="bg-grey-8">
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
          <q-btn icon="event" label="calender" flat @click="onClick">
            <q-menu>
              <q-date v-model="date" minimal />
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
      v-if="false"
      reveal
      elevated
      :height-hint="20"
      class="bg-black transparent"
    >
      <div class="q-py-sm">
        <div>
          <q-card-actions align="center">
            <q-btn color="black" icon="bi-twitter" flat @click="onClick" />
            <q-btn color="black" icon="bi-linkedin" flat @click="onClick" />
            <q-btn color="black" icon="bi-facebook" flat @click="onClick" />
          </q-card-actions>
        </div>
        <div
          class="text-center q-py-sm text-subtitle1 text-capitalize text-black"
        >
          <div><q-icon name="copyright" />pemphero mkuka</div>
        </div>
      </div>
    </q-footer>
    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list v-mutation="handler">
        <q-item-label header>chat Contents </q-item-label>
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
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { makeEven } from "src/js/getIds";
import { docStore } from "../stores/curentDocStore";
import { parse } from "postcss";
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
console.log(date.value);

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

  // $q.bex.off()
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
