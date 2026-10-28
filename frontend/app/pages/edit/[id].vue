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
  <h2>Edit Note</h2>
  <AddForm v-if="currentNote != null" :doc="currentNote"></AddForm>
  <v-btn-group variant="outlined" divided>
    <v-btn color="primary" @click="edit">Edit</v-btn>
    <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
  </v-btn-group>
</template>
