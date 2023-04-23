<template>
  <q-page padding>
    <div>
      <CollectionComp :prewiew="false" />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn color="primary" fab icon="add" @click="onClick">
        <q-tooltip> add new collection </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import CollectionComp from "src/components/CollectionComp.vue";
</script>
