<script setup>
const { getNoteFromAPI, getNoteFromCache, currentNote } = useNotesList()
const route = useRoute()
const id = route.params.id
const readonly = route.query.readonly === 'true'
const loaded = ref(false)
let layout = 'default'

// use minimal layout for readonly mode
if (readonly) {
  layout = 'minimal'
}
console.log('layout', layout)
setPageLayout(layout)

// load from cache
getNoteFromCache(id)
console.log('currentNote', currentNote.value)

// then load from API
if (!currentNote.value) {
  await getNoteFromAPI(id)
  loaded.value = true
} else {
  setTimeout(async function() {
    await getNoteFromAPI(id)
    loaded.value = true
  }, 1)
}


async function edit() {
  await navigateTo(`/edit/${id}`)
}

</script>
<style>
@import url("~/assets/markdown.css");
.fillherup {
  min-height: 600px;
}
.butpad {
  margin-bottom: 10px;
}
</style>
<template>
  <v-card v-if="currentNote":colour="currentNote? currentNote.colour: ''">
    <v-card-title>{{currentNote.title}}</v-card-title>
    <v-card-subtitle ><v-chip v-if="currentNote.tags" v-for="tag of currentNote.tags.split(',')">{{ tag }}</v-chip></v-card-subtitle>
    <v-card-text>
      <MDC class="markdown-body fillherup" :value="currentNote.body" />
    </v-card-text>
    <v-card-actions v-if="loaded && !readonly">
      <v-btn color="secondary" @click="edit">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>
