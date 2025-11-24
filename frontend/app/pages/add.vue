<script setup>
  const now = new Date().toISOString()
  const doc = ref( {title: '', body: '', timestamp: now })

  function add() {
    console.log(doc)
  }
</script>
<template>
  <PageTitle title="Add"></PageTitle>
  <AddForm :doc="doc" buttonTitle="Add" @submit="add()"></AddForm>
</template>
