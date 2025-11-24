<script setup>
  const { addNote, currentNote, getNoteFromAPI, getNoteFromCache } = useNotesList()
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

</script>
<template>
  <PageTitle title="Edit"></PageTitle>
  <AddForm v-if="currentNote != null" :doc="currentNote" buttonTitle="Edit" @submit="edit()"></AddForm>
</template>
