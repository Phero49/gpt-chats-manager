<!-- eslint-disable vue/require-default-prop -->
<template>
  <div
    @mouseenter="onMouseOver = true"
    @mouseleave="onMouseOver = false"
    style="cursor: grab; position: relative"
  >
    <q-card
      class="q-ma-lg"
      bordered
      :class="onMouseOver ? 'bg-blue-grey-8' : ''"
    >
      <div class="text-right">
        <q-btn
          color="white"
          icon="more_horiz"
          size="sm"
          :style="onMouseOver ? ' display:inline ;' : 'none'"
          flat
        >
          <q-menu :persistent="onMouseOver">
            <q-list style="min-width: 100px" dense separator>
              <q-item
                clickable
                v-close-popup
                @click="
                  emits('selectCollection', {
                    key: values.url,
                    date: values.date,
                    title: values.title,
                  })
                "
              >
                <q-item-section>add to collection </q-item-section>
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
        class="text-body1 text-center"
        :class="onMouseOver ? 'text-white' : 'text-black'"
      >
        <div @click="open({ date: key, url: values.url })">
          <q-item-label lines="2" style="cursor: grab">
            {{
              cheerio
                .load(`${values.title != undefined ? values.title : "null"}`)
                .text()
            }}
          </q-item-label>
          <q-tooltip>
            {{
              cheerio
                .load(
                  `${values.title != undefined ? values.title : "null"}` ////l
                )
                .text()
            }}
          </q-tooltip>
        </div>

        <div
          class="text-grey-8 q-my-md"
          :class="onMouseOver ? 'text-white' : ''"
        >
          <small :class="onMouseOver ? 'text-white' : ''"
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
          :class="onMouseOver ? 'text-white' : ''"
          class="text-primary text-body2 text-weight-medium text-center"
          target="_blank"
          >Go to chat</a
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import * as cheerio from "cheerio";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const onMouseOver = ref(false);
const $q = useQuasar();
// eslint-disable-next-line vue/require-default-prop
defineProps({ values: {} });
const emits = defineEmits(["selectCollection", "removed"]);
function open(data) {
  const { url } = data;

  router.push(`/exportDocs?url=${url}`);
}

async function deleteChat(url, title) {
  title = cheerio.load(`${title != undefined ? title : "null"}`).text();
  const deleted = await $q.bex.send("removeChat", {
    url: url,
  });

  emits("removed");

  if (deleted) {
    $q.notify({
      message: `${title} , chat successfully removed`,
      color: "red-7",
      textColor: "black",
    });
  }
}
</script>
