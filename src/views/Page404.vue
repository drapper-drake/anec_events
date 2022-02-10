<template>
  <main class="mb-5 flex flex-col items-center md:mb-0">
    <div class="not-found relative w-11/12 md:w-9/12 mx-auto pb-6 lg:m-0 lg:px-14 xl:w-2/5">
      <div>
        <p class="info-notFound text-center" tabindex="0">{{ this.randomNumber() }}</p>
        <img
          class
          src="/img/404NotFound/404-notFound.svg"
          alt="404 No hemos encontrado la página que buscabas"
        />
        <img
          class="max-h-44 bottom-0 right-10 absolute"
          src="/img/404NotFound/Pato-404-zapatos.svg"
          alt
        />
      </div>
    </div>
  </main>
</template>


<script>
export default {
  data() {
    return {
      text: [
        `Has patinado`, `No damos a basto pa tó`, `Estamos patidifusos`, `Parece que hoy no hay eventos pa' todos`, `No encontramos eventos. Somos un poco pato sos`, `Oooops, qué mala pata`]
    }
  },
  methods: {
    randomNumber() {
      const number = Math.trunc(Math.random() * this.text.length)
      return this.text[number]
    },
  }
}
</script>

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
