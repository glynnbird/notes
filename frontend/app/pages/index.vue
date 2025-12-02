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
.chipgap {
  margin-right: 5px;
}
</style>
<template>
  <!-- refresh the app -->
  <PWARefresh></PWARefresh>

  <v-card class="gap" :color="note.colour" v-for="note in recentNotes" :to="`/note/${note.id}`">
   <v-card-title>{{ note.title }}</v-card-title>
   <v-card-subtitle ><v-chip class="chipgap" variant="flat" color="white" v-if="note.tags" v-for="tag of note.tags.split(',')">{{ tag }}</v-chip></v-card-subtitle>
   <v-card-text>{{ timeAgo.format(new Date(parseInt(note.lastEdited)), 'mini') }}</v-card-text>
  </v-card>

</template>
