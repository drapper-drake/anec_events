<template>
  <div class="w-full flex flex-row justify-center items-center my-4">
    <input id="check" type="checkbox" class="w-3 h-3" v-model="free" />
    <label
      for="check"
      class="m-1 w-44 font-sans font-bold text-sm text-bg-light"
    >Solo eventos GRATUITOS</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      free: false
    }
  },
  methods: {
    filterFree() {
      let listFilterFree = [];
      if (this.free) {
        listFilterFree = this.$store.state.currentListEvents.filter(event => event.free);
        this.$store.dispatch('showFilteredEvents', listFilterFree);
        this.$store.dispatch('divideList', 1);
      }
    }
  },
  watch: {
    free() {
      this.filterFree();
    }
  }
}
// ! Intentar que se deseleccione al cambiar de categoría
</script>
