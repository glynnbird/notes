import { parseMarkdown } from '@nuxtjs/mdc/runtime'

<script setup>
const { getNoteFromAPI, getNoteFromCache, currentNote, deleteNote } = useNotesList()
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

async function deleteThisNote() {
  await deleteNote(id)
  await navigateTo('/')
}

async function edit() {
  await navigateTo(`/edit/${id}`)
}

</script>
<style>
@import url("~/assets/markdown.css");
</style>
<template>
  <MDCRenderer v-if="ast?.body" class="markdown-body" :body="ast.body" :data="ast.data" />
  <div v-if="loaded">
    <v-btn color="secondary" @click="edit">Edit</v-btn>
    <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
  </div>
</template>
