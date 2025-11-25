<script setup>
  const { addNote, currentNote, getNoteFromAPI, getNoteFromCache, deleteNote } = useNotesList()
  const route = useRoute()
  const id = route.params.id

  getNoteFromCache(id)
  setTimeout(async function() {
    await getNoteFromAPI(id)
  }, 1)
  
  async function edit() {
    await addNote(currentNote.value, false)
    await navigateTo('/')
  }

  async function deleteThisNote() {
    await deleteNote(id)
    await navigateTo('/')
  }


</script>
<template>
  <v-card>
    <v-card-title>Edit</v-card-title>
    <v-card-text>
      <AddForm v-if="currentNote != null" :doc="currentNote"></AddForm>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="edit">Edit</v-btn>
      <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
    </v-card-actions>
  </v-card>

</template>
