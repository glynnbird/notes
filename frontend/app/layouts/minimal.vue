<script setup>
  const route = useRoute()
</script>
<template>
  <v-app theme="light">
    <v-app-bar density="compact" color="#ffffff" flat>
      <template v-slot:append>
       <v-btn v-if="route.name !== 'ro'"icon="mdi-arrow-left" @click="$router.back()"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
