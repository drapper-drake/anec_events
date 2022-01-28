<script>
</script>
<template>
  <div class="h-screen">
    <div class="spinner"></div>
  </div>
</template>
<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  @apply w-9 h-9 border-4 border-l-links-cta border-transparent p-4;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}
</style>
