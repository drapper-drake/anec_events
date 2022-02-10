<template>
  <div
    @click="this.$router.push({ name: 'event', params: { id: event.id } })"
    @keyup.enter="this.$router.push({ name: 'event', params: { id: event.id } })"
    v-for=" event in this.$store.state.pagedList"
    :key="event"
    class="container-card"
  >
    <div class="info-card" role="button" tabindex="0" aria-pressed="false">
      <h2>{{ event.nameEvent }}</h2>
      <p class="sr-only">En</p>
      <p>{{ event.cityLocation }}</p>
      <p v-if="event.dateFinal">{{ this.dateText(event) }}</p>
      <p v-else>Solo el {{ this.dateFormat(event.dateStart, true) }}</p>
      <p v-if="event.free" class="sr-only">Evento gratuito</p>
      <p v-else class="sr-only">Evento de pago</p>

      <div class="icons-bar">
        <p class="sr-only">Categorias del evento:</p>
        <div v-if="event.charity">
          <img src="/img/icons/Charity.svg" alt="Icono de Benéfico" />
          <p>Benéfico</p>
        </div>
        <div v-for="category in event.category">
          <img
            :src="listSrcCategories[category].iconEvent"
            :alt="'Icono de' + listSrcCategories[category].iconEvent"
          />
          <p>{{ listSrcCategories[category].nameIconEvent }}</p>
        </div>
      </div>
    </div>
    <div class="photoEvent">
      <div class="bookmark tooltip" @click.stop="this.$emit('selectedBookmark', event.id)">
        <button>
          <img
            :src="[event.bookmark ? '/img/icons/bookmark-selected.svg' : '/img/icons/bookmark.svg']"
            alt="Añadir a favoritos"
          />
          <span class="tooltip-text">Añadir a favoritos</span>
        </button>
      </div>
      <img :src="event.photoEvent" :alt="event.nameEvent" class="w-full h-[160px]" />
      <div class="tooltip">
        <img v-if="event.free" src="/img/icons/gratis.svg" alt="Evento GRATUITO" />
        <img v-else src="/img/icons/Pago-euro.svg" alt="Evento de PAGO" />
        <span v-if="event.free" class="tooltip-text">Evento GRATUITO</span>
        <span v-else class="tooltip-text">Evento de PAGO</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['selectedBookmark'],
  props: {
    arrayBookMark: {
      type: Array,
      required: true,
    },
    listSrcCategories: {
      type: Object,
      required: true
    }
  },
  methods: {
    dateFormat(month, dateShort = false) {
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let monthFormat = monthNames[month.getMonth()];
      let year = month.getFullYear();
      if (dateShort) {
        monthFormat = monthFormat.toUpperCase().substring(0, 3);
      }
      return `${month.getDate()} ${monthFormat} ${year} `;
    },
    dateText(event) {
      let dateStart = this.dateFormat(event.dateStart, true);
      let dateF = this.dateFormat(event.dateFinal, true);
      let resultado = this.allYear(dateStart, dateF);
      if (!resultado) {
        return `Del ${dateStart} al ${dateF}`;
      } else {
        return 'Todo el año';
      }
    },
    allYear(dateFrom, dateTo) {
      let dateFromNoYear = dateFrom.substr(0, 5)
      let dateToNoYear = dateTo.substr(0, 6)
      return (dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC");
    },
  },

  mounted() {
    window.scrollTo(0, 0)
  },


  computed: {
    arrayEvents() {
      return this.allEvents;
    }
  }

}
</script>

<style scoped>
</style>
