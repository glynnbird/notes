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
  <PageTitle title="Add"></PageTitle>
  <AddForm :doc="doc" buttonTitle="Add" @submit="add()"></AddForm>
</template>
