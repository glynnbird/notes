<script setup>
  const { addNote } = useNotesList()
  const now = new Date().toISOString()
  const doc = ref( {title: '', body: '', timestamp: now, lastEdited: 0 })

  async function add() {
    await addNote(doc.value, true)
    await navigateTo('/')
  }

</script>
<template>
  <v-card>
    <v-card-title>Add</v-card-title>
    <v-card-text>
      <AddForm :doc="doc"></AddForm>
    </v-card-text>
    <v-card-actions>
      <v-btn  color="primary" @click="add">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>
