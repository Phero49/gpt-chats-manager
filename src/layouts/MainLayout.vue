<template>
  <q-layout view="lHh LpR lff">
    <q-header v-if="$route.name != 'editChat'" elevated class="bg-white">
      <q-toolbar>
        <q-btn
          color="black"
          flat
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!leftDrawerOpen"
        />
        <q-toolbar-title class="text-black"
          ><q-icon name="work_history" /> Chats Manager
        </q-toolbar-title>

        <div>
          <q-btn
            icon="chat_bubble"
            to="/"
            :color="$route.path == '/' ? 'green' : 'black'"
            label="my chats "
            flat
          />
        </div>

        <div>
          <q-btn
            color="black"
            label="export database"
            dense
            flat
            @click="importdb"
          >
          </q-btn>
        </div>
        <div>
          <q-btn
            color="black"
            dense
            label="import database"
            flat
            @click="exportdb"
          >
          </q-btn>
        </div>

        <div>
          <q-btn
            color="red"
            flat
            dense
            label="delete dabase "
            @click="confirmDelete = true"
          />
        </div>

        <div>
          <q-btn
            flat
            @click="onClick"
            label="about"
            :color="$route.path == '/help' ? 'green' : 'black'"
          >
            <q-tooltip> learn about this app</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer
      v-if="$route.path == '/'"
      :elevated="false"
      :height-hint="20"
      class="bg-black transparent"
    >
      <div class="q-py-sm">
        <div>
          <q-card-actions align="center">
            <q-btn color="blue-6" round icon="bi-twitter" flat @click="onClick">
              <q-tooltip> follow me on twitter </q-tooltip>
            </q-btn>
            <q-btn color="blue-8" round icon="bi-linkedin" flat>
              <q-tooltip> follow me on linked </q-tooltip>
            </q-btn>
            <q-btn
              color="primary"
              round
              icon="bi-facebook"
              flat
              @click="onClick"
            >
              <q-tooltip> follow me on facebook </q-tooltip>
            </q-btn>
          </q-card-actions>
        </div>
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
      :class="$route.path === '/' ? 'bg-grey-10' : ''"
    >
      <chat-outline v-if="$route.name == 'editChat'" />
      <!--recent chats-->

      <q-list v-if="$route.path === '/'" separator class="text-white q-px-sm">
        <div
          class="text-body1 q-px-sm q-py-sm q-mb-sm row justify-between shadow-1 items-center bg-black"
          style="border-radius: 6px"
        >
          <div>Recently opened chats</div>
          <div>
            <q-btn
              color="white"
              icon="close"
              round
              flat=""
              @click="leftDrawerOpen = false"
            />
          </div>
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Your are about to delete all data on this extension are you sure
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes" color="red" @click="deletedb" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import * as cheerio from "cheerio";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { docStore } from "../stores/curentDocStore";
import { recent } from "src/stores/recent";

import ChatOutline from "src/components/chatOutline.vue";

//TODO:import not yet implemented

async function exportdb() {
  //this function exports  the whole db as a json
  const { data } = await $q.bex.send("exportdb");
  const a = document.createElement("a");
  const dataURI =
    "data:application/json;charset=utf-8," + encodeURIComponent(data);

  a.href = dataURI;
  a.download = "chats-manager.json";
  a.click();
  $q.notify({
    message: "data succefully exported",
    color: "green",
    badgeColor: "green",
    position: "bottom-left",
  });
}

const confirmDelete = ref(false);

async function deletedb() {
  await $q.bex.send("deletedb");
  confirmDelete.value = false;
  router.push("/");
}

const recentStore = recent();
const store = docStore();
const router = useRouter();
const $q = useQuasar();

const chatContents = store.contents;
const saveChat = async (chatStructure) => {
  //save for the first time
  const chatContents = chatStructure;
  await $q.bex.send("saveChats", {
    key: chatContents.url,
    content: chatContents,
  });
  router.push(`/exportDocs?url=${chatStructure.url}`);
};
$q.bex.once("get_chat", ({ data }) => {
  var chatStructure = {
    contents: [],
    htmlString: "",
    title: "",
    date: null,
    url: "",
    numberOfQuestions: 0,
  };

  if (data != null) {
    if (data.chat) {
      // If 'chat' property exists in the 'data' object
      const newChatData = data;
      chatContents.value = data.askedQuestions;

      const title = `${data.title}`;
      store.$reset();

      setTimeout(async () => {
        // Set the 'url' and 'title' in the 'store' object
        chatStructure.url = newChatData.chat_url;
        chatStructure.title = title;

        // Fetch chat data using the 'getSingleChat' endpoint

        const { data: chatData } = await $q.bex.send("getSingleChat", {
          key: chatStructure.url,
        });

        const oldChatData = chatData;
        console.log("old", oldChatData);
        if (oldChatData === null) {
          var date = new Date().toLocaleDateString();
          date = new Date(date).getTime();
          chatStructure.date = date;
          // If no previous chat data exists, update 'store.contents' and 'store.htmlString'
          chatStructure.contents = newChatData.askedQuestions;
          chatStructure.htmlString = newChatData.chat.join("");
          chatStructure.numberOfQuestions = chatStructure.contents.length;
          chatStructure.date = date;
          await saveChat(chatStructure);
        } else {
          chatStructure = oldChatData;
          // If previous chat data exists, handle the updates
          var { numberOfQuestions } = chatStructure;

          const newQuestionNumber = newChatData.askedQuestions.length;

          console.log(newQuestionNumber, numberOfQuestions);

          const questionNumberDiffernce = newQuestionNumber - numberOfQuestions;

          if (questionNumberDiffernce > 0) {
            // Calculate the difference in the number of questions
            //const difference = newQuestionNumber - numberOfQuestions;

            // Extract the new questions and additional chats to append

            numberOfQuestions -= 1;
            const newContent =
              newChatData.askedQuestions.splice(numberOfQuestions);

            const additionalChats = newChatData.chat.splice(numberOfQuestions);

            //  console.log("additional chats", additionalChats);

            // Concatenate newContent with contents and assign it back to contents
            console.log(newContent);

            chatStructure.contents = chatStructure.contents.concat(newContent);
            // Append additionalChats to htmlString
            console.log(oldChatData, "new chat", newChatData);

            const additionalChatsString = additionalChats.join("");

            chatStructure.htmlString =
              chatStructure.htmlString + additionalChatsString;
            chatStructure.numberOfQuestions += questionNumberDiffernce;
            console.log(chatStructure);
            await saveChat(chatStructure);
          } else {
            router.push(`/exportDocs?url=${chatStructure.url}`);
          }
        }

        // Redirect to "/exportDocs" after the timeout
      }, 1);
    }
  } else {
    // If 'chat' property does not exist in 'data', show an error dialog
    $q.dialog({
      message: `Error: Something went wrong. 
      Make sure your chat link ends with something 
      like c/5551925e-61ba-45f2-b5da-10258fc664de and
       not something like model=text-davinci-002-render-sha . 
       if it ends with model=text-davinci-002-render-sha refresh your chat page `,
      dark: true,
    });
  }
});

onUnmounted(() => {
  $q.bex.off("get_chat");
});

const leftDrawerOpen = ref(false);

leftDrawerOpen;
</script>
<style>
.headings::first-letter {
  text-transform: capitalize;
}
</style>
