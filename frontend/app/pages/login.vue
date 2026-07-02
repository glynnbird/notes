<script setup>
// composables
const { login } = useAuth()

// local page items
const apiKey = ref('')

async function doLogin(apiKey) {
  await login(apiKey)
  await navigateTo('/')
}
</script>
<template>
  <v-form>
    <v-text-field v-model="apiKey" label="Api Key" required></v-text-field>
    <v-btn :disabled="!apiKey" color="success" @click="doLogin(apiKey)">Submit</v-btn>
  </v-form>
</template>
