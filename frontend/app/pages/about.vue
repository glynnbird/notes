<script setup>
const env = ref(process.env.NODE_ENV)

// config
const config = useRuntimeConfig()
const apiHome = config.public['apiBase'] || window.location.origin
</script>
<template>
  <h2>About Notes</h2>>
  <div>
    A simple notes recorder
  </div>

  <pre>
    Environment: {{ env }}
    Api Home: {{ apiHome }}
  </pre>
</template>
