<script setup>
  const { addNote, currentNote, getNoteFromAPI, getNoteFromCache, deleteNote } = useNotesList()
  const route = useRoute()
  const id = route.params.id

  getNoteFromCache(id)

  function pickColour() {
      const colours = [ '#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17',
    '#FF6F00', '#E65100', '#BF360C', '#3E2723', '#263238','#E53935', '#D81B60', '#8E24AA', '#7E57C2', '#5C6BC0', '#42A5F5', '#039BE5', '#00ACC1', '#00897B', '#66BB6A',
  '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41', '#546E7A', '#757575']
      const r = Math.floor(Math.random() * colours.length)
      currentNote.value.colour = colours[r]
  }

  setTimeout(async function() {
    await getNoteFromAPI(id)
    if (typeof currentNote.value.colour === 'undefined') {
      pickColour()
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
    <v-card-title>Edit
      <v-btn
        size="xx-small"
        aria-label="Refresh"
        icon="mdi-refresh"
        :color="currentNote.colour"
        @click="pickColour()"
      ></v-btn>
    </v-card-title>
    <v-card-text>
      <AddForm v-if="currentNote != null" :doc="currentNote"></AddForm>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="edit">Edit</v-btn>
      <v-btn color="error" @click="deleteThisNote">Delete</v-btn>
    </v-card-actions>
  </v-card>

</template>
