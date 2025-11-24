<script setup>
// incoming programme to add/edit, whether the page is busy ot not and the submit button title
const { doc} = defineProps(['doc'])

</script>
<template>
  <v-form>
    <v-text-field v-model="doc.title" label="Title" required autofocus></v-text-field>
    <v-textarea v-model="doc.body" label="Body" style="height: 800px"></v-textarea>
  </v-form>
</template>
