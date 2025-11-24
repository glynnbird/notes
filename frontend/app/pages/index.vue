<script setup>
  const { notes, resetCurrentNote } = useNotesList()
  resetCurrentNote()
</script>
<template>
  <!-- refresh the app -->
  <PWARefresh></PWARefresh>

  <v-list>
    <v-list-item v-for="note in notes" :title="note.title" :to="`/note/${note.id}`"></v-list-item>
  </v-list>
</template>
