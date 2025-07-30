<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import Footer from "../components/footer.vue";
</script>

<template>
  <div>
    <Navigation />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>
