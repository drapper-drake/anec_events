<script>
</script>
<template>
  <div v-if="this.$store.state.activeLoanding" class="h-screen">
    <div class="spinner"></div>
  </div>
  <div
    v-else
    class="not-found relative w-11/12 md:w-9/12 mx-auto pb-6 lg:w-96 lg:m-0 lg:px-14 xl:w-2/5"
  >
    <div>
      <p class="info-notFound text-center">No hemos encontrado eventos</p>
      <img
        class
        src="../../public/img/404NotFound/404-notFound.svg"
        alt="404 No hemos encontrado la página que buscabas"
      />
      <img
        class="max-h-44 bottom-0 right-10 absolute"
        src="../../img/404NotFound/Pato-404-zapatos.svg"
        alt
      />
    </div>
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
