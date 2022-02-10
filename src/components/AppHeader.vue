<script>
export default {
  data() {
    return {
      filterCategory: this.$store.state.filterCategory
    }
  },
  methods: {
    restartFilter() {
      let list = [...this.$store.state.allEvents];
      this.$store.dispatch('showAll', list);
      this.$store.dispatch('divideList', 1);

      for (let property in this.filterCategory) {
        this.filterCategory[property] = false;
        this.filterCategory['all'] = true;
      }
    },
  },
  created() {
    this.$store.dispatch('fetchEvents');
  }
}
</script>
<template>
  <header
    class="fixed top-0 z-[2] w-full h-20 md:h-32 bg-bg-dark-80 flex justify-around drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]"
  >
    <router-link @click="restartFilter" to="/" class="flex items-center">
      <div class="ml-2.5 flex justify-center items-center gap-4 md:ml-0 cursor-pointer">
        <img class="w-12 h-12 md:w-16 md:h-16" src="/img/Favicon.svg" alt="Logo Ànec Events" />
        <h1 class="name-web font-cursive text-4xl text-links-cta md:text-6xl">Ànec events</h1>
      </div>
    </router-link>
  </header>
</template>
