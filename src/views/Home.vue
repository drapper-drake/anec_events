<script>

import AppCards from '@/components/AppCards.vue'
import { listSrcCategories } from "@/listSrcTitlesCategories";
import AppFilterBar from "@/components/AppFilterBar.vue";
import AppPagination from "@/components/AppPagination.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import AppFilterDate from "../components/AppFilterDate.vue";

export default {
  data() {
    return {
      arrayBookMark: [],
      listSrcCategories,
      activeCategory: "all", //? Esto es posible cambiarlo a un objeto pero queda verlo
    }
  },
  components: {
    AppCards,
    AppFilterBar,
    AppPagination,
    LoadingSpinner,
    AppFilterDate
  },

  methods: {

    checkLocalStorage() {
      if (localStorage.getItem("bookmark") != null) {
        let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
        this.arrayBookMark = uploadEvents;
      }
    },

    saveLocalStorage() {
      localStorage.setItem("bookmark", JSON.stringify(this.arrayBookMark))
    },

    selectedBookmark(event) {
      let index = this.$store.state.allEvents.findIndex((el) => el.id === event);
      this.$store.dispatch('toggleBookmark', index);
      if (this.$store.state.allEvents[index].bookmark === true) {
        this.arrayBookMark.push(event)
      } else if (this.$store.state.allEvents[index].bookmark === false) {
        let indexB = this.arrayBookMark.findIndex((el) => el === event);
        this.arrayBookMark.splice(indexB, 1);
      }
      this.saveLocalStorage();
    },

    changeformatDateJSON(list) {
      for (let event of list) {
        event.dateStart = new Date(event.dateStart);
        if (event.hasOwnProperty("dateFinal")) {
          event.dateFinal = new Date(event.dateFinal);
        }
      }
    },
  },

  mounted() {
    // this.checkLocalStorage(); //* Estoy probando porque es mejor que esto ya lo haga cuando se haga el fetch y deje todo listo
  },
  created() {
    this.$store.dispatch('fetchEvents');
  },
}
</script>

<template>
  <div id="home">
    <AppFilterBar />
    <AppFilterDate />
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div
        v-if="this.$store.state.currentListEvents.length"
        class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-lg p-10 gap-10 lg:gap-x-8"
      >
        <AppCards
          :arrayBookMark="arrayBookMark"
          :listSrcCategories="listSrcCategories"
          @selectedBookmark="selectedBookmark"
        />
      </div>
      <AppPagination
        v-if="this.$store.state.currentListEvents.length > 0"
        :activeCategory="activeCategory"
      />
      <LoadingSpinner v-else />
    </main>
  </div>
</template>


<style>
</style>
