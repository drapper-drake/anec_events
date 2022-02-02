import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      allEvents: [],
      currentListEvents: [],
      activeLoanding: true,
      showPagination: false,
      pagedList: []
    }
  },
  mutations: {
    FETCH_EVENTS(state, fetchedList) {
      state.allEvents = fetchedList;
      state.activeLoanding = false;
    },
    SHOW_ALL(state, allList) {
      state.currentListEvents = allList;
    },
    TOGGLE_BOOKMARK(state, index) {
      state.allEvents[index].bookmark = !state.allEvents[index].bookmark;
    },
    SHOW_FILTERED_EVENTS(state, filteredList) {
      state.currentListEvents = filteredList;
    },
    SHOW_PAGINATION(state, boolean) {
      state.showPagination = boolean;
    },
    DIVIDE_LIST(state, list) {
      state.pagedList = list;
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
            let arrayBookMark = [];
            if (localStorage.getItem("bookmark") != null) {
              let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
              arrayBookMark = uploadEvents;
            }
            event.bookmark = arrayBookMark.includes(idEvent);
            event.id = idEvent;
            //hace directamente la función changeFormatData
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
    },
    showPagination({ commit }, boolean) {
      commit('SHOW_PAGINATION', boolean);
    },
    showPageList({ commit }, list) {
      commit('SHOW_PAGE_LIST', list);
    },
    divideList({ commit }, pageNumber) {
      let list = [];
      let min = 12 * (pageNumber - 1);
      let max = (min + 11) > store.state.currentListEvents ? store.state.currentListEvents.length : min + 11;
      list = store.state.currentListEvents.slice(min, max + 1);
      commit('DIVIDE_LIST', list);
    }
  }
});

export default store;
