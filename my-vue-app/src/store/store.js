import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      allEvents: [],
      currentListEvents: []
    }
  },
  mutations: {
    FETCH_EVENTS(state, fetchedList) {
      state.allEvents = fetchedList;
    },
    SHOW_ALL(state, allList) {
      state.currentListEvents = allList;
    },
    TOGGLE_BOOKMARK(state, index) {
      state.allEvents[index].bookmark = !state.allEvents[index].bookmark;
    },
    SHOW_FILTERED_EVENTS(state, filteredList) {
      state.currentListEvents = filteredList;
    }
  },
  actions: {
    fetchEvents({ commit }) {
      fetch('/data/eventosAlicante.json')
        .then((response) => response.json())
        .then((data) => {
          let fetchedEvents = [];
          // data es un array de eventos
          for (let event of data) {
            //Es un generador de Id basados en el nombre del evento
            let idEvent = event.nameEvent;
            idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
            if (localStorage.getItem("bookmark") != null) {
              let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
              this.arrayBookMark = uploadEvents;
            }
            event.bookmark = this.arrayBookMark.includes(idEvent);
            event.id = idEvent;

            //hace directamente la función changeformadData
            event.dateStart = new Date(event.dateStart);
            if (event.hasOwnProperty("dateFinal")) {
              event.dateFinal = new Date(event.dateFinal);
            }
            fetchedEvents.push(event);
          }

          fetchedEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime());

          commit('FETCH_EVENTS', fetchedEvents);
          commit('SHOW_ALL', fetchedEvents);

        })
    },
    showAll({ commit }, allList) {
      commit('SHOW_ALL', allList);
    },
    toggleBookmark({ commit }, index) {
      commit('TOGGLE_BOOKMARK', index);
    },
    showFilteredEvents({ commit }, filteredList) {
      commit('SHOW_FILTERED_EVENTS', filteredList);
    }
  }
});

export default store;
