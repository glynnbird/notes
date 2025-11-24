<script setup>
  const { notes } = useNotesList()
</script>
<template>
  <!-- refresh the app -->
  <PWARefresh></PWARefresh>

  <v-list>
    <v-list-item v-for="note in notes" :title="note.title" :to="`/note/${note.id}`"></v-list-item>
  </v-list>
</template>
