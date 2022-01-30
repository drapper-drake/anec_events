<script>

import AppCards from '@/components/AppCards.vue'
import { listSrcCategories } from "@/listSrcTitlesCategories";
import AppFilterBar from "@/components/AppFilterBar.vue";
import AppPagination from "@/components/AppPagination.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

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
    LoadingSpinner
  },

  methods: {
    fetchJSON() {
      // se importa el json, se parsea y almacena en data
      fetch('/data/eventosAlicante.json')
        .then((response) => response.json())
        .then((data) => {
          let fetchedEvents = [];
          // data es un array de eventos
          for (let event of data) {
            //Es un generador de Id basados en el nombre del evento
            let idEvent = event.nameEvent;
            idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            event.bookmark = this.arrayBookMark.includes(idEvent);
            event.id = idEvent;
            fetchedEvents.push(event);
          }
          // this.currentListEvents = [...this.allEvents];

          this.changeformatDateJSON(fetchedEvents);
          fetchedEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime());

          this.$store.dispatch('fetchEvents', fetchedEvents);
          this.$store.dispatch('showAll', fetchedEvents);

          // this.currentListEvents = [...this.allEvents];
          /*
          const urlParams = new URLSearchParams(window.location.search);
          const ruta = urlParams.get('event');
          if (ruta != null) {
            deleteContent();
            return goToParams(ruta);
          }
          createFirstPage()
          */
          //console.log(data);
        })
    },

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
    this.checkLocalStorage();
  },
  created() {
    this.fetchJSON();
  },
}
</script>

<template>
  <div id="home">
    <AppFilterBar />
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div
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
