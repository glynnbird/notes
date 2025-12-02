<script setup>

// composables
const { $pwa } = useNuxtApp()

</script>
<style>
.gap {
  margin-bottom:20px;
}
</style>
<template>
  <!-- PWA refresh banner-->
  <v-alert class="gap" color="warning" v-show="$pwa.needRefresh">
    <h4> New content available, click on reload button to update. </h4>
    <v-btn color="primary" @click="$pwa.updateServiceWorker()">Reload</v-btn>
  </v-alert>
</template>
