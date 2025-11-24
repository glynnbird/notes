<script setup>
const env = ref(process.env.NODE_ENV)

// config
const config = useRuntimeConfig()
const apiHome = config.public['apiBase'] || window.location.origin
</script>
<template>
  <PageTitle title="About Notes"></PageTitle>
  <div>
    A simple notes recorder
  </div>

  <pre>
    Environment: {{ env }}
    Api Home: {{ apiHome }}
  </pre>
</template>
