<script setup>
  const { recentNotes, resetCurrentNote } = useNotesList()

  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-GB')

  resetCurrentNote()
</script>
<style>
.gap {
  margin-bottom: 10px;
}
</style>
<template>
  <!-- refresh the app -->
  <PWARefresh></PWARefresh>

  <v-card class="gap" :color="note.colour" v-for="note in recentNotes" :to="`/note/${note.id}`">
   <v-card-title>{{ note.title }}</v-card-title>
   <v-card-text>{{ timeAgo.format(new Date(parseInt(note.lastEdited)), 'mini') }}</v-card-text>
  </v-card>

</template>
