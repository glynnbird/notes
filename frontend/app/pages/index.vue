<script setup>
  const { recentNotes, resetCurrentNote } = useNotesList()

  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-GB')

  resetCurrentNote()
</script>
<template>
  <!-- refresh the app -->
  <PWARefresh></PWARefresh>

  <v-list>
    <v-list-item v-for="note in recentNotes" 
      :title="note.title" 
      :subtitle="timeAgo.format(new Date(parseInt(note.lastEdited)), 'mini')" 
      :to="`/note/${note.id}`">
    </v-list-item>
  </v-list>
</template>
