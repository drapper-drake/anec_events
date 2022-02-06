<template>
  <div class="w-full flex flex-row justify-center items-center my-4">
    <button
      class="m-1 w-52 font-sans font-bold cursor-pointer rounded text-dark bg-links-cta border-2 border-solid border-links-cta shadow-md hover:bg-light hover:border-dark"
      @click="filterFree"
    >Solo eventos GRATUITOS</button>
  </div>
</template>

<script>
export default {
  methods: {
    filterFree() {
      const listFilterFree = this.$store.state.currentListEvents.filter(event => event.free);
      this.$store.dispatch('showFilteredEvents', listFilterFree);
      this.$store.dispatch('divideList', 1);
    }
  }
}
</script>
