<script setup>
// incoming programme to add/edit, whether the page is busy ot not and the submit button title
const { doc, buttonTitle } = defineProps(['doc', 'buttonTitle'])
const { busy } = useBusy()

// outgoing events from this form e.g. @submit="submitForm()"
const emitEvent = defineEmits(['submit'])

</script>
<template>
  <v-form>
    <v-text-field v-model="doc.title" label="Title" required autofocus></v-text-field>
    <v-textarea v-model="doc.body" label="Body" style="height: 800px"></v-textarea>
    <v-btn :disabled="doc.title.length === 0 || doc.body.length === 0 || busy" color="warning" class="mr-4" @click="emitEvent('submit')">
      {{ buttonTitle }}
    </v-btn>
  </v-form>
</template>
