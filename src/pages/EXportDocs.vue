<template>
  <q-dialog v-model="selectChat" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >You are currently not connected to any network.</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-page padding>
    <q-card-section>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-editor
          ref="editorRef"
          flat
          :toolbar-color="'blue'"
          :toolbar-text-color="'white'"
          :toolbar-bg="'blue'"
          class="bg-grey-3"
          v-model="editor"
          min-height="5rem"
          :toolbar="toolbar"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
        />
      </transition-group>
    </q-card-section>
    <q-card-section> </q-card-section>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" expand>
      <q-card-actions align="center" vertical>
        <q-btn
          unelevated
          label="export as pdf"
          no-caps
          color="red-5"
          @click="toPdf"
        />
        <q-btn unelevated color="green" no-caps>
          <a :href="store.url" style="text-decoration: none; color: white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="1.5"
              class=""
            >
              <path
                d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                fill="currentColor"
              ></path>
            </svg>
            <span class="q-ml-sm q-mb-lg">Go to chat</span>
          </a>
        </q-btn>
        <q-btn
          unelevated
          no-caps
          label="merge with another chat"
          color="primary"
          @click="selectChat = true"
        />
      </q-card-actions>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { useQuasar } from "quasar";
import { docStore } from "../stores/curentDocStore";
import jsPDF from "jspdf";
import { useRoute } from "vue-router"; //import { htmlToDocx } from 'html-docx-js';
import * as Cheerio from "cheerio";
import { PDFDocument } from "pdf-lib";

import { makeEven } from "../js/getIds";

const pdf = new jsPDF({ unit: "pt", compress: true, format: "a4" });
const route = useRoute();
const { url, date } = route.query;
const selectChat = ref(false);
const get_chat = async () => {
  if (store.htmlString.length < 1) {
    if (date != undefined && url != undefined) {
      const { data, respond } = await $q.bex.send("getChats", {
        key: url,
        all: false,
        date: date,
      });

      if (data.stutus) {
        store.$state = data.item;
      } else {
        $q.dialog({
          message: "something went wrong , chat was not found ",
        });
      }
    } else {
      console.log("no chats");
    }
  }
};

const store = docStore();
const $q = useQuasar();
onUnmounted(() => {
  store.$reset();
});
const editorRef = ref();

const toPdf = async () => {
  const html = editorRef.value.getContentEl();
  $q.loading.show({
    spinnerColor: "red",
    spinnerSize: "100px",
    message: "exporting chat to pdf this might take some time ",
  });
  //TODO::load font forms

  const co = html.querySelector("#editorContent");
  const $ = Cheerio.load(html.innerHTML);
  const content = $("#editorContent");

  const bodyContent = ref("");
  console.log(content.children().length);
  for (let i = 0; i < content.children().length; i++) {
    const element = content.children(`#group-${makeEven(i)}`);
    const lastChild = element.find(".markdown");
    lastChild.removeAttr("class");
    const font = window.getComputedStyle(co).fontFamily;
    lastChild.css({ "line-eight": 1.76, "font-family": "sans-serif" });
    bodyContent.value += lastChild.parent().text();
    console.log(lastChild.parent().text(), "\n", `#group-${makeEven(i)}`, i);
  }

  pdf.text(bodyContent, 0, 0).save("ok.pdf");
  //const output = await inlinecss(temp, {});
  //console.log(output);
  //window.open(pdfs);

  $q.loading.hide();
};

const toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "strike", "underline", "subscript", "superscript"],
  ["token", "hr", "link", "custom_btn"],
  ["print", "fullscreen"],
  [
    {
      label: $q.lang.editor.formatting,

      icon: $q.iconSet.editor.formatting,
      list: "no-icons",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "default_font",
        "arial",
        "arial_black",
        "comic_sans",
        "courier_new",
        "impact",
        "lucida_grande",
        "times_new_roman",
        "verdana",
      ],
    },
    "removeFormat",
  ],
  ["quote", "unordered", "ordered", "outdent", "indent"],

  ["undo", "redo"],
];

//process the html like removing buttons

//proced html
var editor = ref("");
const processHtml = async () => {
  const $ = Cheerio.load(`
  <div class="page">
    <div style="text-align:center"> ${store.title}
      <a href="${store.url}">
      <b>go to chat </b>
      </a> <br/>
      </div>
      <div id="editorContent">
        ${store.htmlString}
         </div>
    </div>
   `);
  $("button").remove();
  editor.value = $.html();
};
const save = async () => {
  const content = editorRef.value.getContentEl();
  const date = new Date().toISOString();

  const chatContents = { date: date, ...store.$state };
  const { data, respond } = await $q.bex.send("saveChats", chatContents);
  if (data) {
    console.log("saved", chatContents);
    $q.notify({
      message: `chat saved`,
      color: "red-7",
      textColor: "white",
    });
  }
};

onMounted(async () => {
  await get_chat();
  processHtml().then(() => {
    const contentStyle = {
      fontFamily: "Calibri",
      maxWidth: "205mm",
      fontSize: "12pt",
      lineHeight: "1.5",
      height: "100%",
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "left",
    };

    const contentClass = "default-styles q-card  shadow-5 page";
    const page = document.querySelector(".page");

    page.className = contentClass;
    page.setAttribute(
      "style",
      `
    max-width: 210mm;
     lineHeight: 2;
     overflow-y: hidden;
    display: block;
    padding:94.5px;
    margin-right: auto;
    margin-left: auto;`
    );

    const element = page;
  });

  //TODO:attempting to display the content in pages

  /*
  const hasOverflowed = element.scrollHeight > element.clientHeight;

  if (hasOverflowed) {
    const overflowAmount = element.scrollHeight - element.clientHeight;
    const overflowedContent = element.innerHTML.slice(-overflowAmount);
    console.log(overflowedContent);
  }*/
});

if (store.contents.length > 0) {
  setTimeout(async () => {
    const content = editorRef.value.getContentEl();
    const date = new Date().toISOString();

    const chatContents = { date: date, ...store.$state };
    const { data, respond } = await $q.bex.send("saveChats", chatContents);
    if (data) {
      console.log("saved", chatContents);
      $q.notify({
        message: `chat saved`,
        color: "red-7",
        textColor: "white",
      });
    }
    //await $q.bex.send("storage.set", { key: store.url, value: chatContents });
  }, 3000);
}
</script>
<style>
.default-styles {
  padding: 6%;
  margin-top: 4%;
  font-family: Calibri;
  font-size: 11pt;
  line-height: 1.15;
  text-align: left;
}

.default-styles p {
  margin-bottom: 8pt;
  margin-top: 0pt;
}

.default-styles h1 {
  font-size: 16pt;
  font-weight: bold;
  margin-bottom: 12pt;
  margin-top: 0pt;
}

.default-styles h2 {
  font-size: 14pt;
  font-weight: bold;
  margin-bottom: 8pt;
  margin-top: 12pt;
}

.default-styles h3 {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 6pt;
  margin-top: 12pt;
}

.default-styles h4 {
  font-weight: bold;
  margin-bottom: 4pt;
  margin-top: 12pt;
}

.default-styles h5 {
  font-weight: bold;
  margin-bottom: 4pt;
  margin-top: 12pt;
}

.default-styles h6 {
  font-weight: bold;
  margin-bottom: 4pt;
  margin-top: 12pt;
}

.default-styles a {
  color: #0563c1;
  text-decoration: underline;
}

.default-styles table {
  border-collapse: collapse;
  margin-bottom: 8pt;
  margin-top: 8pt;
  width: 100%;
}

.default-styles th {
  border: 1pt solid #000000;
  background-color: #cccccc;
  font-weight: bold;
  padding-bottom: 6pt;
  padding-left: 5pt;
  padding-right: 5pt;
  padding-top: 6pt;
  text-align: center;
}

.default-styles td {
  border: 1pt solid #000000;
  padding-bottom: 6pt;
  padding-left: 5pt;
  padding-right: 5pt;
  padding-top: 6pt;
}

code,
kbd,
pre,
samp {
  font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace;
  font-size: 1em;
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-code);
  font-size: 0.875em;
  font-weight: 600;
}

.prose :where(a code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}

.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}

.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(thead th code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(table):not(:where([class~="not-prose"] *)) {
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-bottom: 2em;
  margin-top: 2em;
  table-layout: auto;
  text-align: left;
  width: 100%;
}

.prose :where(thead):not(:where([class~="not-prose"] *)) {
  border-bottom-color: var(--tw-prose-th-borders);
  border-bottom-width: 1px;
}

.prose :where(thead th):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
  padding-right: 0.5714286em;
  vertical-align: bottom;
}

.prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
  border-bottom-color: var(--tw-prose-td-borders);
  border-bottom-width: 1px;
}

.prose :where(tbody tr:last-child):not(:where([class~="not-prose"] *)) {
  border-bottom-width: 0;
}

.prose :where(tbody td):not(:where([class~="not-prose"] *)) {
  vertical-align: baseline;
}

.prose :where(tfoot):not(:where([class~="not-prose"] *)) {
  border-top-color: var(--tw-prose-th-borders);
  border-top-width: 1px;
}

.prose :where(tfoot td):not(:where([class~="not-prose"] *)) {
  vertical-align: top;
}

::-webkit-backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  --tw-shadow: 0 0 transparent;
  --tw-shadow-colored: 0 0 transparent;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  --tw-shadow: 0 0 transparent;
  --tw-shadow-colored: 0 0 transparent;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

.prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #020202;
  --tw-prose-bullets: #020202;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgba(0, 0, 0, 0.5);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}

code,
pre {
  font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
}
code[class="language-plaintext"] {
  white-space: pre-line;
}
code.hljs,
code[class*="language-"],
pre[class*="language-"] {
  word-wrap: normal;
  background: none;
  color: #fff;
  -webkit-hyphens: none;
  hyphens: none;
  line-height: 1.5;
  tab-size: 4;
  text-align: left;
  white-space: pre;
  word-break: normal;
  word-spacing: normal;
}
pre[class*="language-"] {
  border-radius: 0.3em;
  overflow: auto;
}
@media screen and (-ms-high-contrast: active) {
  code[class*="language-"],
  pre[class*="language-"] {
    background: window;
    color: windowText;
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: window;
  }
  .token.important {
    background: highlight;
    color: window;
    font-weight: 400;
  }
  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.selector {
    font-weight: 700;
  }
  .token.attr-value,
  .token.comment,
  .token.doctype,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.property,
  .token.string {
    color: highlight;
  }
  .token.attr-value,
  .token.url {
    font-weight: 400;
  }
}
.token.important {
  background: highlight;
  color: window;
  font-weight: 400;
}

:not(pre) > code.hljs,
:not(pre) > code[class*="language-"] {
  border-radius: 0.3em;
  padding: 0.1em;
  white-space: normal;
}
.\!whitespace-pre {
  white-space: pre !important;
}
.whitespace-pre-line {
  white-space: pre-line;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.hljs-comment {
  color: hsla(0, 0%, 100%, 0.5);
}
.hljs-meta {
  color: hsla(0, 0%, 100%, 0.6);
}
.hljs-built_in,
.hljs-class .hljs-title {
  color: #e9950c;
}
.hljs-doctag,
.hljs-formula,
.hljs-keyword,
.hljs-literal {
  color: #2e95d3;
}
.hljs-addition,
.hljs-attribute,
.hljs-meta-string,
.hljs-regexp,
.hljs-string {
  color: #00a67d;
}
.hljs-attr,
.hljs-number,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-pseudo,
.hljs-template-variable,
.hljs-type,
.hljs-variable {
  color: #df3079;
}
.hljs-bullet,
.hljs-link,
.hljs-selector-id,
.hljs-symbol,
.hljs-title {
  color: #f22c3d;
}
.overflow-y-auto {
  overflow-y: auto;
}
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
  color: #a9aec1;
}
.token.punctuation {
  color: #fefefe;
}
.token.constant,
.token.deleted,
.token.property,
.token.symbol,
.token.tag {
  color: #ffa07a;
}
.token.boolean,
.token.number {
  color: #00e0e0;
}
.token.attr-name,
.token.builtin,
.token.char,
.token.inserted,
.token.selector,
.token.string {
  color: #abe338;
}
.language-css .token.string,
.style .token.string,
.token.entity,
.token.operator,
.token.url,
.token.variable {
  color: #00e0e0;
}
.token.atrule,
.token.attr-value,
.token.function {
  color: gold;
}
.token.keyword {
  color: #00e0e0;
}
.token.important,
.token.regex {
  color: gold;
}
.token.bold,
.token.important {
  font-weight: 700;
}
.token.italic {
  font-style: italic;
}
.p-4 {
  padding: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.prose :where([class~="lead"]):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-bottom: 1.2em;
  margin-top: 1.2em;
}
.prose :where(a):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-links);
  font-weight: 500;
  text-decoration: underline;
}
.prose :where(strong):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.prose :where(a strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(blockquote strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(thead th strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(ol):not(:where([class~="not-prose"] *)) {
  list-style-type: decimal;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-left: 1.625em;
}
.prose :where(ol[type="A"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-alpha;
}
.prose :where(ol[type="a"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-alpha;
}
.prose :where(ol[type="A s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-alpha;
}
.prose :where(ol[type="a s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-alpha;
}
.prose :where(ol[type="I"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-roman;
}
.prose :where(ol[type="i"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-roman;
}
.prose :where(ol[type="I s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-roman;
}
.prose :where(ol[type="i s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-roman;
}
.prose :where(ol[type="1"]):not(:where([class~="not-prose"] *)) {
  list-style-type: decimal;
}
.prose :where(ul):not(:where([class~="not-prose"] *)) {
  list-style-type: disc;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-left: 1.625em;
}
.prose :where(ol > li):not(:where([class~="not-prose"] *))::marker {
  color: var(--tw-prose-counters);
  font-weight: 400;
}
.prose :where(ul > li):not(:where([class~="not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.prose :where(hr):not(:where([class~="not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-bottom: 3em;
  margin-top: 3em;
}
.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
  border-left-color: var(--tw-prose-quote-borders);
  border-left-width: 0.25rem;
  color: var(--tw-prose-quotes);
  font-style: italic;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 1.6em;
  margin-top: 1.6em;
  padding-left: 1em;
  quotes: "\201C""\201D""\2018""\2019";
}
.prose
  :where(blockquote p:first-of-type):not(:where([class~="not-prose"]
      *)):before {
  content: open-quote;
}
.prose
  :where(blockquote p:last-of-type):not(:where([class~="not-prose"] *)):after {
  content: close-quote;
}
.prose :where(h1):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 2.25em;
  font-weight: 800;
  line-height: 1.1111111;
  margin-bottom: 0.8888889em;
  margin-top: 0;
}
.prose :where(h1 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 900;
}
.prose :where(h2):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.3333333;
  margin-bottom: 1em;
  margin-top: 2em;
}
.prose :where(h2 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 800;
}
.prose :where(h3):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 0.6em;
  margin-top: 1.6em;
}
.prose :where(h3 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 700;
}
.prose :where(h4):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5em;
  margin-top: 1.5em;
}
.prose :where(h4 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 700;
}
.prose :where(img):not(:where([class~="not-prose"] *)) {
  margin-bottom: 2em;
  margin-top: 2em;
}
.prose :where(figure > *):not(:where([class~="not-prose"] *)) {
  margin-bottom: 0;
  margin-top: 0;
}
.prose :where(figcaption):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.prose :where(code):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-code);
  font-size: 0.875em;
  font-weight: 600;
}
.prose :where(code):not(:where([class~="not-prose"] *)):before {
  content: "`";
}
.prose :where(code):not(:where([class~="not-prose"] *)):after {
  content: "`";
}
.prose :where(a code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(thead th code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(pre):not(:where([class~="not-prose"] *)) {
  background-color: transparent;
  border-radius: 0.375rem;
  color: currentColor;
  font-size: 0.875em;
  font-weight: 400;
  line-height: 1.7142857;
  margin: 0;
  overflow-x: auto;
  padding: 0;
}
.prose :where(pre code):not(:where([class~="not-prose"] *)) {
  background-color: transparent;
  border-radius: 0;
  border-width: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
}

.text-gray-200 {
  --tw-text-opacity: 1;
  color: rgba(217, 217, 227, var(--tw-text-opacity));
}
.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(52, 53, 65, var(--tw-bg-opacity));
}
</style>
