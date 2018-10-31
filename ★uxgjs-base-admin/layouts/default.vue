<template>
<div>
  <Header />
  <main role="main" class="container">
    <nuxt />
  </main>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">Place sticky footer content here.</span>
    </div>
  </footer>
</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 5rem !important;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  /* Vertically center the text there */
  background-color: #f5f5f5;
}

[v-cloak] {
  display: none;
}
</style>
