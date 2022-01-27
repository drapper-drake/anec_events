<template>
  <div>
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div class="container container-info-page">
        <div class="info-container">
          <div class="top-info">
            <div class="img-container">
              <img :src="eventID.photoEvent" />
              <div class="bookmarkEvent">
                <img
                  src="/img/icons/bookmark.svg"
                  data-name="la-generacin-figurativa-premios-para-la-creacin-de-un-museo"
                />
              </div>
            </div>
            <div class="info-event">
              <h2 class="title-ev">{{ eventID.nameEvent }}</h2>
              <div v-for="category in eventID.category" class="category">
                <img :src="listSrcCategories[category].iconEvent" class="labelsSvg" />
                <p>{{ category }}</p>
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
                <p>Gratuito</p>
              </div>
            </div>
          </div>
          <div class="share-bar">
            <button class="btn-more-info">Más información</button>
            <div class="share-icon">
              <img src="/img/icons/Share.svg" />
              <p class="share-text">Comparte con tus amigos</p>
            </div>
            <div class="container-social">
              <img src="/img/icons/twitterBlack.svg" class="icon-social" data-name="Twitter" />
              <img src="/img/icons/fb-icon.svg" class="icon-social" data-name="Facebook" />
              <img src="/img/icons/Email-icon.svg" class="icon-social" data-name="Email" />
            </div>
          </div>
          <div class="bottom-info">
            <p class="contText"></p>
            <div class="map">
              <iframe
                class="iframe-map"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&amp;q=MUBAG. C/ Gravina 13-15, 03002 Alicante."
                width="900"
                height="400"
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
</template>

<script>
import { listSrcCategories } from "@/listSrcTitlesCategories";

export default {
  name: 'event',
  data() {
    return {
      id: this.$route.params.id,
      allEvents: [],
      arrayBookMark: [],
      eventID: null,
      listSrcCategories,
    }
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

          this.filterEvent(this.id)

        })
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

    filterEvent(id) {
      this.eventID = this.allEvents.find(e => e.id === id)
      console.log(this.eventID)
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
      } else {
        return 'Todo el año';
      }
    },
    allYear(dateFrom, dateTo) {
      let dateFromNoYear = dateFrom.substr(0, 5)
      let dateToNoYear = dateTo.substr(0, 6)
      return (dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC");
    },


    checkHours(event) {
      if (event.hasOwnProperty("hoursClose")) {
        if (event.hoursOpen === event.hoursClose) {
          return event.hoursOpen

        } else {
          return `De ${event.hoursOpen} a ${event.hoursClose}`
        }
      } else {
        if (event.hasOwnProperty("hoursOpen")) {
          return event.hoursOpen
        } else {

          return `Todo el día`
        }
      }
    },

    requestCalendar(e) {
      e.preventDefault;
      e.stopPropagation;
      let start = moment(e.dateStart).format('YYYYMMDD');
      let end = moment(e.dateStart).add(1, "days").format('YYYYMMDD');
      if (e.hasOwnProperty('dateFinal')) {
        end = moment(e.dateFinal).add(1, "days").format('YYYYMMDD');
      }
      const URL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${e.nameEvent}&location=${e.site}&dates=${start}/${end}`;
      window.open(URL, "_blank")
    }

  },
  created() {
    this.fetchJSON();

  },


}
</script>
