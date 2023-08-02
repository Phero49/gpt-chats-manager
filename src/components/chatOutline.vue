<template>
  <q-card-section>
    <div class="row justify-between items-center">
      <div class="text-body1 text-weight-medium text-center">Chat outline</div>
      <div>
        <q-card-actions align="right">
          <q-btn
            flat
            icon="undo"
            @click="undo"
            size="sm"
            :disable="removedContent.length < 1"
          />
        </q-card-actions>
      </div>
    </div>
  </q-card-section>

  <q-scroll-area class="fit">
    <q-list style="width: 300px">
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
          <q-item clickable class="b">
            <q-item-section top avatar @click="scrollTo(index)">
              <q-avatar
                :color="selectedItem == index ? 'primary' : 'black'"
                size="sm"
                text-color="white"
              >
                {{ index + 1 }}
              </q-avatar>
            </q-item-section>
            <q-item-section @click="scrollTo(index)">
              <q-item-label
                lines="2"
                class="text-subtitle1 headings"
                :class="selectedItem == index ? 'text-primary' : ''"
                caption
                >{{ item }}</q-item-label
              >
            </q-item-section>
            <q-item-section side v-if="selectedItem == index">
              <q-btn
                round
                dense
                size="sm"
                flat
                color="red"
                icon="delete"
                @click="deleteQueston(index)"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-list>
  </q-scroll-area>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { makeEven, reverseEven } from "src/js/getIds";
import { docStore } from "../stores/curentDocStore";
const $q = useQuasar();
const store = docStore();

const selectedItem = ref(0);
//this function delete a question and response

function resetIds(startAt) {
  const parentNode = document.querySelector("#editorContent");
  const children = parentNode.children;
  for (let index = 0; index < children.length; index++) {
    if (startAt == undefined) {
      const element = children[index];
      element.id = `group-${makeEven(index)}`;
    } else {
      if (index == startAt) {
        const element = children[index];
        element.id = `group-${makeEven(index)}`;
      }
    }
  }
}
const removedContent = ref([]);

function deleteQueston(index) {
  if (store.contents.length > 1) {
    const group_id = makeEven(index);
    const content = store.contents.splice(index, 1);
    const parentNode = document.querySelector("#editorContent");
    const response = parentNode.querySelector(`#group-${group_id}`);
    const removedEl = {
      element: response.innerHTML,
      content: content[0],
      index: index,
    };
    removedContent.value.unshift(removedEl);
    response.remove();
    resetIds();
  } else {
    $q.notify({
      message: "sorry atleast one question should be left",
      position: "top-left",
      color: "red",
    });
  }
}

function undo() {
  const undoElement = removedContent.value.splice(0, 1);
  const { content, element, index } = undoElement[0];
  store.contents.splice(index, 0, content);
  const parentNode = document.querySelector("#editorContent");
  const removedId = makeEven(index);
  const newDiv = document.createElement("div");
  newDiv.id = `group-${removedId}`;
  newDiv.innerHTML = element;
  const children = parentNode.children;
  for (let elementIndex = 0; elementIndex < children.length; elementIndex++) {
    const thisElement = children[elementIndex];
    thisElement.id = `group-${makeEven(elementIndex)}`;
    if (index == elementIndex) {
      parentNode.insertBefore(newDiv, thisElement);
    }
  }
}

function onDragEnter(index) {
  // set draged index

  draggedItemIndex.value = index;
}

function isInview() {
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin around the root
    threshold: 0.3, // Fully visible threshold ( 0.3 means fully visible in the viewport)
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // This element is fully in the viewport
        const elementInView = entry.target;
        const id = elementInView.id.split("-")[1];
        selectedItem.value = reverseEven(id);

        // You can do something with the elementInView here, e.g., add a class, update UI, etc.
      }
    });
  }, options);

  var editorContent = document.querySelector("#editorContent");

  const editorContentObserver = new MutationObserver((entries, observer) => {
    var editorContentEl = document.querySelector("#editorContent");
    if (editorContentEl != null) {
      observer.disconnect();
      editorContent = editorContentEl;
    }
  });

  var editor = document.querySelector(".q-editor__content");
  editorContentObserver.observe(editor, { childList: true, subtree: true });
  if (editorContent == null) {
    //try again
    isInview();
  } else {
    for (const child of editorContent.children) {
      observer.observe(child);
    }
  }
}

function scrollTo(index) {
  selectedItem.value = index;
  const element = document.querySelector(`#group-${makeEven(index)}`);
  element.scrollIntoView({ behavior: "auto", inline: "start" });
  element.classList.add("bg-yellow-4");

  setTimeout(() => {
    element.classList.remove("bg-yellow-4");
  }, 3000);
}
const draggedItemIndex = ref();

function onDrop(index) {
  // Get the dragged item and remove it from the contents array
  let draggedItem = store.contents.splice(draggedItemIndex.value, 1)[0];

  // Insert the dragged item at the new index
  store.contents.splice(index, 0, draggedItem);

  // Get the parent node and its children
  const parentNode = document.querySelector("#editorContent");
  const children = Array.from(parentNode.children);

  // If there is more than one child element
  if (children.length > 1) {
    scrollTo(draggedItemIndex.value);
    setTimeout(() => {
      resetIds();
    }, 200);
    //console.log(insertedNode, replaceOn, index);
    // parentNode.insertBefore(draggedGroup, insertedNode);
    // parentNode.insertBefore(draggedGroup, cc);

    //  console.log(draggedGroup, draggedResponse);
  }
}

onMounted(() => {
  setTimeout(() => {
    resetIds();
    isInview();
  }, 1000);
});
</script>
