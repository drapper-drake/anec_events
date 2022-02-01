import FORMAT_EVENT_JSON from "@/test/FORMAT_EVENT_JSON"
function checkdata() {

}
function fetchEvents(url) {
  fetch(url)
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
    })
}
module.exports = {
  fetchEvents, checkdata, FORMAT_EVENT_JSON
}
