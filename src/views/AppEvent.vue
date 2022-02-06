<template>
  <main v-if="checkLengthState !== undefined" class="text-bg-light mb-8 flex flex-col items-center">
    <div class="container md:shadow-2xl text-lg py-3.5">
      <div class="md:border-solid">
        <div class="flex flex-col-reverse justify-around items-center md:flex-row-reverse">
          <div class="flex flex-col gap-2 relative md:max-w-sm lg:max-w-sm">
            <h2
              class="text-center font-serif text-3xl font-bold p-5"
              tabindex="0"
            >{{ eventID.nameEvent }}</h2>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/euro.svg" alt=" " />
              <p class="sr-only">Evento</p>
              <p>{{ this.checkPrice(eventID) }}</p>
            </div>
            <div class="flex" tabindex="0">
              <p class="sr-only">Categorías del evento:</p>
              <div v-for="category in eventID.category" class="category">
                <img :src="listSrcCategories[category].iconEventDark" class="labelsSvg" alt=" " />
                <p>{{ listSrcCategories[category].nameIconEvent }}</p>
              </div>
            </div>

            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/location.svg" alt="Ubicación:    " class="labelsSvg" />
              <p>{{ eventID.site }}</p>
            </div>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/date.svg" alt=" " class="labelsSvg" />
              <p v-if="eventID.dateFinal">{{ this.dateText(this.eventID) }}</p>
              <p v-else>Solo el {{ this.dateFormat(eventID.dateStart, true) }}</p>
            </div>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/Schedule.svg" alt=" " class="labelsSvg" />
              <p>{{ this.checkHours(eventID) }}</p>
            </div>

            <button @click="requestCalendar(eventID)" class="btn-calendar">Añadir al calendario</button>
          </div>
          <div class="p-5 md:max-w-md lg:p-0 lg:max-w-lg xl:max-w-screen-sm relative">
            <img :src="eventID.photoEvent" class="w-full rounded-2xl" />
            <div class="bookmark tooltip" @click.stop="this.$emit('selectedBookmark', eventID.id)">
              <button>
                <img
                  :src="[eventID.bookmark ? '/img/icons/bookmark-selected.svg' : '/img/icons/bookmark.svg']"
                  alt="Añadir a favoritos"
                />
                <span class="tooltip-text">Añadir a favoritos</span>
              </button>
            </div>
          </div>
        </div>
        <div class="share-bar">
          <a
            v-if="eventID.hasOwnProperty('linkTickets')"
            class="btn-more-info"
            :href="eventID.linkTickets"
            target="_blank"
          >Más información</a>

          <div class="share-icon gap-3">
            <img src="/img/icons/Share.svg" alt=" " />
            <p class="text-base font-bold" tabindex="0">Comparte con tus amigos</p>
          </div>
          <div class="container-social">
            <button @click="socialRed(eventID, 'Twitter')">
              <img src="/img/icons/twitterBlack.svg" class="cursor-pointer" alt="Twitter" />
            </button>
            <button @click="socialRed(eventID, 'Facebook')">
              <img src="/img/icons/fb-icon.svg" class="cursor-pointer" alt="Facebook" />
            </button>
            <button @click="socialRed(eventID, 'Email')">
              <img src="/img/icons/Email-icon.svg" class="cursor-pointer" alt="Enviar por correo" />
            </button>
          </div>
        </div>
        <div class="flex flex-col p-5 text-justify items-center">
          <div v-if="eventID.comments" class="py-4 w-3/4 text -justify self-center" tabindex="0">
            <p>{{ eventID.comments }}</p>
          </div>
          <div class="self-center py-2">
            <p class="sr-only">Mapa de Google Maps con la dirección del evento</p>
            <iframe
              :title="eventID.site"
              :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&q=${eventID.site}`"
              :width="widthIframe"
              :height="heighIframe"
              loading="lazy"
              style="border: 0px;"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </main>

  <LoadingSpinner v-else />
</template>

<script>
import dayjs from 'dayjs';
import { listSrcCategories } from "@/listSrcTitlesCategories";
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: "event",
  data() {
    return {
      id: this.$route.params.id,
      eventID: null,
      allEvents: [],
      arrayBookMark: [],
      listSrcCategories,
      priceEvent: "",
      heighIframe: 300,
      widthIframe: screen.width >= 976 ? 900 : (screen.width >= 768 && screen.width < 976) ? 600 : `${screen.width - 50}`
    }
  },
  methods: {

    getEventByID() {
      this.eventID = this.$store.state.allEvents.filter(e => e.id === this.id);
      this.eventID = this.eventID[0];
      console.log(this.eventID)
      console.log(this.$store.state)
    },

    saveLocalStorage() {
      localStorage.setItem("bookmark", JSON.stringify(this.arrayBookMark));
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
      }
      else {
        return "Todo el año";
      }
    },
    allYear(dateFrom, dateTo) {
      let dateFromNoYear = dateFrom.substr(0, 5);
      let dateToNoYear = dateTo.substr(0, 6);
      return (dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC");
    },
    checkHours(event) {
      if (event.hasOwnProperty("hoursClose")) {
        if (event.hoursOpen === event.hoursClose) {
          return event.hoursOpen;
        }
        else {
          return `De ${event.hoursOpen} a ${event.hoursClose}`;
        }
      }
      else {
        if (event.hasOwnProperty("hoursOpen")) {
          return event.hoursOpen;
        }
        else {
          return `Todo el día`;
        }
      }
    },
    requestCalendar(e) {
      e.preventDefault;
      e.stopPropagation;
      let start = dayjs(e.dateStart).format("YYYYMMDD");
      let end = dayjs(e.dateStart).add(1, "days").format("YYYYMMDD");
      if (e.hasOwnProperty("dateFinal")) {
        end = dayjs(e.dateFinal).add(1, "days").format("YYYYMMDD");
      }
      const URL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${e.nameEvent}&location=${e.site}&dates=${start}/${end}`;
      window.open(URL, "_blank");
    },
    checkPrice(event) {
      let price = "El supuesto precio";
      if (!event.free) {
        if (event.hasOwnProperty("price")) {
          price = `Desde ${event.price} €`;
        }
        else {
          price = `No disponible`;
        }
      }
      else {
        price = "Gratuito";
      }
      return price;
    },
    socialRed(event, social) {
      const urlDinamic = window.location.href
      const ShareURL = {
        Twitter: `http://twitter.com/share?text=Descubre+el+evento+${event.nameEvent}&url=${urlDinamic}&hashtags=${event.category[0]},${event.cityLocation}`,
        Facebook: `http://www.facebook.com/sharer.php?s=100&p[url]=https://testing.anecevents.com/`,
        Email: `mailto:?subject=¡Echa%20un%20vistazo%20a%20este%20evento!&body=Me ha gustado el evento ${event.nameEvent} de esta web ${urlDinamic}`
      }
      window.open(ShareURL[social], "_blank");
    },
    updateMetaEvent(){
      /**
        <meta property="og:locale" content="es_ES" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Diseño web Valladolid. Páginas web, posicionamiento SEO y SEM" />
    <meta property="og:description" content="Diseño web Valladolid: desarrollos a medida, páginas web en WordPress, tiendas online Prestashop o WooCommerce" />
    <meta property="og:image" content="https://www.tictacsoluciones.com/uploads/mi-imagen.jpg">
    <meta property="og:url" */
      let metaTags = document.querySelectorAll('meta')
      console.log("🚀 ~ file: AppEvent.vue ~ line 231 ~ updateMetaEvent ~ metaTags", metaTags)
      let metaImg = metaTags[6]
      if(this.eventID.photoEvent){
        metaImg.content = this.eventID.photoEvent
      }else {
        metaImg.content = 'https://res.cloudinary.com/ddn278n2q/image/upload/v1639930066/anac-event/wmeglyi4jawokzyptoql.jpg'
      }




      console.log(metaImg)
    }
  },
  mounted() {
    window.scrollTo(0, 0)

  },

  computed: {
    checkLengthState() {
      if (this.$store.state.allEvents.length === 0) {
        this.$store.dispatch('fetchEvents');
      }
      this.eventID = this.$store.state.allEvents.filter(e => e.id === this.id);
      this.eventID = this.eventID[0];
        this.updateMetaEvent()
      return this.eventID
    }
  },

  components: { LoadingSpinner },

}
</script>
