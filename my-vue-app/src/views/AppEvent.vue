<template>
  <div v-if="checkLengthState != undefined">
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div class="container container-info-page">
        <div class="info-container">
          <div class="top-info">
            <div class="img-container">
              <img :src="eventID.photoEvent" />
              <div @click="selectedBookmark(this.eventID.id)" class="bookmarkEvent">
                <img v-if="eventID.bookmark" src="/img/icons/bookmark-selected.svg" />
                <img v-else src="/img/icons/bookmark.svg" />
              </div>
            </div>
            <div class="info-event">
              <h2 class="title-ev">{{ eventID.nameEvent }}</h2>
              <div class="flex">
                <div v-for="category in eventID.category" class="category">
                  <img :src="listSrcCategories[category].iconEventDark" class="labelsSvg" />
                  <p>{{ category }}</p>
                </div>
              </div>
              <div class="city-location">
                <img src="/img/icons/location.svg" class="labelsSvg" />
                <p>{{ eventID.site }}</p>
              </div>
              <div class="date">
                <img src="/img/icons/date.svg" class="labelsSvg" />
                <p v-if="eventID.dateFinal">{{ this.dateText(this.eventID) }}</p>
                <p v-else>Solo el {{ this.dateFormat(eventID.dateStart, true) }}</p>
              </div>
              <div class="hours">
                <img src="/img/icons/Schedule.svg" class="labelsSvg" />
                <p>{{ this.checkHours(eventID) }}</p>
              </div>
              <button @click="requestCalendar(eventID)" class="btn-calendar">Añadir al calendario</button>
              <div class="price">
                <img src="/img/icons/euro.svg" class="priceSvg" />
                <p>{{ this.checkPrice(eventID) }}</p>
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

            <div class="share-icon">
              <img src="/img/icons/Share.svg" />
              <p class="share-text">Comparte con tus amigos</p>
            </div>
            <div class="container-social">
              <img
                @click="socialRed(eventID, 'Twitter')"
                src="/img/icons/twitterBlack.svg"
                class="icon-social"
              />
              <img
                @click="socialRed(eventID, 'Facebook')"
                src="/img/icons/fb-icon.svg"
                class="icon-social"
              />
              <img
                @click="socialRed(eventID, 'Email')"
                src="/img/icons/Email-icon.svg"
                class="icon-social"
              />
            </div>
          </div>
          <div class="bottom-info">
            <p class="contText"></p>
            <div class="map">
              <iframe
                class="iframe-map"
                :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&q=${eventID.site}`"
                :width="widthIframe"
                :height="heighIframe"
                loading="lazy"
                style="border: 0px;"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="more-events-container hidden">
          <div class="arrows-container">
            <h3 class="titleOtherEv">Otros eventos:</h3>
            <div class="arrows">
              <img src="/img/icons/arrow-left.svg" />
              <img src="/img/icons/right-arrow.svg" />
            </div>
          </div>
          <div class="more-events"></div>
        </div>
      </div>
    </main>
  </div>
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
        Facebook: `http://www.facebook.com/sharer.php?s=100&p[url]=${urlDinamic}&p[images]=${event.photoEvent}&p[title]=${event.nameEvent}&p[summary]=${event.comments}`,
        Email: `mailto:?subject=¡Echa%20un%20vistazo%20a%20este%20evento!&body=Me ha gustado el evento ${event.nameEvent} de esta web ${urlDinamic}`
      }
      window.open(ShareURL[social], "_blank");
    }
  },

  computed: {
    checkLengthState() {
      if (this.$store.state.allEvents) {
        this.$store.dispatch('fetchEvents');
        this.eventID = this.$store.state.allEvents.filter(e => e.id === this.id);
        this.eventID = this.eventID[0];
      }
      return this.eventID
    }
  },

  components: { LoadingSpinner },

}
</script>
