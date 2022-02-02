<template>
  <div class="w-full flex flex-row justify-center my-4">
    <form @submit.prevent="filterDate(dateEvent)" class="flex flex-col items-center md:flex-row">
      <label class="m-1 w-24 font-sans font-bold text-sm text-bg-light" for="start">Desde el día:</label>
      <input
        id="start"
        class="m-1 w-40 cursor-pointer text-neutral-600 text-sm text-right rounded border-2 border-solid border-dark"
        type="date"
        v-model="dateEvent.dateStart"
        required
      />
      <label class="m-1 w-24 font-sans font-bold text-sm text-bg-light" for="final">Hasta el día:</label>
      <input
        id="final"
        class="m-1 w-40 cursor-pointer text-neutral-600 text-sm text-right rounded border-2 border-solid border-dark"
        type="date"
        required
        v-model="dateEvent.dateFinal"
      />
      <button
        class="m-1 w-20 font-sans font-bold cursor-pointer rounded text-dark bg-links-cta border-2 border-solid border-links-cta shadow-md hover:bg-light hover:border-dark"
        id="submit"
      >Buscar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateEvent: {
        dateStart: new Date().toISOString().slice(0, 10),
        dateFinal: new Date().toISOString().slice(0, 10),
      }
    }
  },
  methods: {

    filterDate(dateEvent) {

      // función de filtrar por fecha
      let start = dateEvent.dateStart;
      let final = dateEvent.dateFinal;

      if (start && final) {
        const today = new Date(start);
        const yesterday = new Date(today.getTime() - 86400000);
        // esto soluciona el bug del día inicial
        const dateFrom = yesterday;
        const dateTo = new Date(final);
        // * He cambiado la variable por una global para que funcione con la paginación
        const listFilterDates = this.$store.state.currentListEvents.filter(event => {
          if (event.dateFinal) {
            return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime()) ||
              (event.dateFinal.getTime() >= dateFrom.getTime() && event.dateFinal.getTime() <= dateTo.getTime()) ||
              (event.dateStart.getTime() <= dateFrom.getTime() && event.dateFinal.getTime() >= dateTo.getTime());
          } else {
            return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime());
          }
        });
        /*
        * El evento:
        * - Empieza en el rango
        * - Termina en el rango
        * - Dura más que el rango
        */
        this.$store.dispatch('showFilteredEvents', listFilterDates);
        this.$store.dispatch('divideList', 1);
      }
    }
  }

}
</script>
