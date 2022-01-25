<script>
export default {
  data() {
    return {
      scroll: 0,
      className: "scale-0"
    }
  },
  methods: {
    // Funcion que cuando hay scroll hace una animacion para subir al top
    scrollUp() {
      let currentScroll = document.documentElement.scrollTop;
      if (currentScroll > 10) {
        window.requestAnimationFrame(this.scrollUp);
        window.scrollTo(0, currentScroll - (currentScroll / 10));
      }
    }
  },
  mounted() {
    // Funcion para que el UpButton no aparezca si no se ha hecho scroll
    window.onscroll = () => {
      this.scroll = document.documentElement.scrollTop;
      this.className = this.scroll > 500 ? "scale-100" : "scale-0";
    }
  }
}
</script>

<template>
  <div
    @click="this.scrollUp"
    class="w-14 h-14 bg-dark flex justify-center items-center rounded-full fixed bottom-10 right-4 cursor-pointer border-4 border-solid border-bg-dark transition-all delay-150 hover:bg-contrast-bg-light"
    :class="className"
  >
    <img class="arrow-up" src="/img/icons/arrow.svg" alt="Volver arriba" />
  </div>
</template>

<style scoped>
</style>
