<script setup>
const { getNoteFromAPI, getNoteFromCache, currentNote } = useNotesList()
const route = useRoute()
const id = route.params.id
const loaded = ref(false)

// load from cache
getNoteFromCache(id)

// then load from API
setTimeout(async function() {
  await getNoteFromAPI(id)
  loaded.value = true
}, 1)

async function edit() {
  await navigateTo(`/edit/${id}`)
}

</script>
<style>
@import url("~/assets/markdown.css");
.fillherup {
  min-height: 600px;
}
</style>
<template>
  <v-card :colour="currentNote.colour">
    <v-card-title>{{currentNote.title}}</v-card-title>
    <v-card-subtitle ><v-chip v-if="currentNote.tags" v-for="tag of currentNote.tags.split(',')">{{ tag }}</v-chip></v-card-subtitle>
    <v-card-text>
      <MDC class="markdown-body fillherup" :value="currentNote.body" />
    </v-card-text>
    <v-card-actions v-if="loaded">
      <v-btn color="secondary" @click="edit">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>
