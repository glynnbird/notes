<script setup>
  const { addNote, currentNote, getNoteFromAPI, getNoteFromCache, deleteNote } = useNotesList()
  const route = useRoute()
  const id = route.params.id

  getNoteFromCache(id)
  setTimeout(async function() {
    await getNoteFromAPI(id)
    if (typeof currentNote.colour === 'undefined') {
      const colours = [ '#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17',
    '#FF6F00', '#E65100', '#BF360C', '#3E2723', '#263238']
      const r = Math.floor(Math.random() * colours.length)
      currentNote.value.colour = colours[r]
    }
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
    <v-card-subtitle>{{ currentNote.colour }}</v-card-subtitle>
    <v-card-text>
      <AddForm v-if="currentNote != null" :doc="currentNote"></AddForm>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="edit">Edit</v-btn>
      <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
    </v-card-actions>
  </v-card>

</template>
