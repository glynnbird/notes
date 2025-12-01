import { parseMarkdown } from '@nuxtjs/mdc/runtime'

<script setup>
const { getNoteFromAPI, getNoteFromCache, currentNote } = useNotesList()
const route = useRoute()
const id = route.params.id
const loaded = ref(false)

// try loading from cache first
const ast = ref(null)

getNoteFromCache(id)
setTimeout(async function() {
  await getNoteFromAPI(id)
  ast.value =  await parseMarkdown(currentNote.value.body)
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
    <v-card-text>
       <MDCRenderer v-if="ast?.body" class="markdown-body fillherup" :body="ast.body" :data="ast.data" />
    </v-card-text>
    <v-card-actions v-if="loaded">
      <v-btn color="secondary" @click="edit">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>
