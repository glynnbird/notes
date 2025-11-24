import { parseMarkdown } from '@nuxtjs/mdc/runtime'

<script setup>
const { getNoteFromAPI, getNoteFromCache, currentNote, deleteNote } = useNotesList()
const route = useRoute()
const id = route.params.id

// try loading from cache first
const ast = ref(null)



getNoteFromCache(id)
setTimeout(async function() {
  await getNoteFromAPI(id)
  ast.value =  await parseMarkdown(currentNote.value.body)
}, 1)

async function deleteThisNote() {
  await deleteNote(id)
  await navigateTo('/')

}

</script>
<style>
@import url("~/assets/markdown.css");
</style>
<template>
  <MDCRenderer v-if="ast?.body" class="markdown-body" :body="ast.body" :data="ast.data" />
  <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
</template>
