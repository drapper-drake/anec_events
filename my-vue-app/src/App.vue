<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppCards from './components/AppCards.vue'
import UpButton from "./components/UpButton.vue"
import { listSrcCategories } from "./listSrcTitlesCategories";
import AppFilterBar from "./components/AppFilterBar.vue";
import AppPagination from "./components/AppPagination.vue";

export default {
  data() {
    return {
      allEvents: [],
      currentListEvents: [],
      arrayBookMark: [],
      listSrcCategories,
      activeCategory: "all", //? Esto es posible cambiarlo a un objeto pero queda verlo
    }
  },
  components: {
    AppHeader,
    AppCards,
    AppFooter,
    UpButton,
    AppFilterBar,
    AppPagination
  },

  methods: {
    fetchJSON() {
      // se importa el json, se parsea y almacena en data
      fetch('/data/eventosAlicante.json')
        .then((response) => response.json())
        .then((data) => {
          // data es un array de eventos
          for (let event of data) {
            //Es un generador de Id basados en el nombre del evento
            let idEvent = event.nameEvent;
            idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            event.bookmark = this.arrayBookMark.includes(idEvent);
            event.id = idEvent;
            this.allEvents.push(event);
          }
          this.currentListEvents = [...this.allEvents];

          this.changeformatDateJSON();
          this.allEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime());
          this.currentListEvents = [...this.allEvents];
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
      let index = this.allEvents.findIndex((el) => el.id === event);
      this.allEvents[index].bookmark = !this.allEvents[index].bookmark;
      if (this.allEvents[index].bookmark === true) {
        this.arrayBookMark.push(event)
      } else if (this.allEvents[index].bookmark === false) {
        let indexB = this.arrayBookMark.findIndex((el) => el === event);
        this.arrayBookMark.splice(indexB, 1);
      }
      this.saveLocalStorage();
    },
    changeformatDateJSON() {
      for (let event of this.allEvents) {
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
  <div class="w-full flex flex-col min-h-screen bg-light pt-40">
    <AppHeader />
    <AppFilterBar :activeCategory="activeCategory" />
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div
        class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-lg p-10 gap-10 lg:gap-x-8"
      >
        <AppCards
          :allEvents="allEvents"
          :currentListEvents="currentListEvents"
          :arrayBookMark="arrayBookMark"
          :listSrcCategories="listSrcCategories"
          @selectedBookmark="selectedBookmark"
        />
      </div>
      <AppPagination :activeCategory="activeCategory" :allEvents="allEvents" />
      <UpButton />
    </main>
    <AppFooter />
  </div>
</template>

<style>
</style>
