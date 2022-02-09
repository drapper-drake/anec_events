const { eventOutDate } = require("./event-data-test")

const FORMAT_EVENT_JSON =
{
  //Nombre del evento
  "nameEvent": {
    type: String,
    required: true
  },
  //Modalidad de pago del evento
  "free": {
    type: Boolean,
    required: true
  },
  //Precio del evento
  "price": {
    type: Number,
    required: false, //Creo que no todos los eventos quede pago lo tienen.
  },
  //Ubicación donde acontece el evento
  "site": {
    type: String,
    required: true,
  },
  //Localización-ciudad-pueblo donde acontece el evento
  "cityLocation": {
    type: String,
    required: true,
  },
  //Si es un pueblo o no lo es
  "village": {
    type: Boolean,
    required: false, //Actualmente no se esta utilizando
  },
  //Qué día empieza el evento o si es solo un día
  "dateStart": {
    type: Date,
    format: "AAAA/MM/DD",
    required: true,
  },
  //Qué día termina el evento
  "dateFinal": {
    type: Date,
    format: "AAAA/MM/DD",
    required: false,
  },
  "hoursOpen": { //Quizás sería mejor incluirlo en la fecha del principio
    type: String,//No es formato Date
    format: "00:00",
    required: false,
  },
  "hoursClose": { //Quizás sería mejor incluirlo en la fecha del principio
    type: String,//No es formato Date
    format: "00:00",
    required: false,
  },
  //Comentarios sobre el evento
  "comments": {
    type: String,
    required: false,
  },
  //Listado de categorias del evento
  "category": {
    type: Array,
    required: true,
  },
  //URL de la imagen del evento -
  "photoEvent": {
    type: String,
    required: true,
  },
  //URL de la información del evento
  "linkEvent": {
    type: String,
    required: false
  },
  // //* DATOS QUE TIENE QUE GENERAR EL JAVASCRIPT
  "id": {
    type: String,
    required: true,
  },
  "bookmark": {
    type: Boolean,
    required: true,
    default: false
  }
}
// Si lo ha podido hacer con exito devuelve el evento? o un true
function checkFormatData(event, property) {
  if (event[property] === undefined) {
    return false;
  }
  const correctType = FORMAT_EVENT_JSON[property]['type'].name;
  let typeCategoryEvent = event[property].constructor.name
  // typeCategoryEvent = typeof event[property] // ? No se pone typeof porque en arrays devolvería un objeto
  if (property === 'dateStart' || property === 'dateFinal') {
    const dateEvent = new Date(event[property])
    typeCategoryEvent = (dateEvent == "Invalid Date") ? false : dateEvent.constructor.name;
  }
  return (typeCategoryEvent === correctType);
}
function hasAllPropsValidFormat(event) {
  let listForCheckProps = [];
  for (let property in FORMAT_EVENT_JSON) {
    if (event[property]) {
      const isValid = checkFormatData(event, property)
      listForCheckProps.push(isValid)
      // ? Para hacer un array si todas las propìedades tienen el formato necesario
      console.log(property)
      if (property === "price") {
        console.log(isValid, "isValid", event.nameEvent)
        console.log(listForCheckProps, "listForCheckProps")
      }
    } else if (event[property] === undefined && FORMAT_EVENT_JSON[property].required) {
      // console.error(`El evento : ${event.nameEvent} no tiene la propiedad,${property}, y es necesaria.`)
      return false;
    }
  }
  return listForCheckProps.every((value) => value === true);
}

function isCurrentEventActive(eventCurrent) {
  const TODAY = new Date().getTime();
  //Funcion de cambiar el formato hay que darle una vuelta
  eventCurrent.dateStart = new Date(eventCurrent.dateStart);
  const startEvent = eventCurrent.dateStart.getTime()
  if (TODAY < startEvent) {
    return true;
  }
  if (eventCurrent.hasOwnProperty("dateFinal")) {
    eventCurrent.dateFinal = new Date(eventCurrent.dateFinal);
    const finishEvent = eventCurrent.dateFinal.getTime()
    if (TODAY >= startEvent && TODAY <= finishEvent) {
      return true;
    }
  }
  return false;
}
let arrayBookMark = [];
function parseFetch(list) {
  let fetchedEvents = [];
  for (let event of list) {
    //Es un generador de Id basados en el nombre del evento
    let idEvent = event.nameEvent;
    idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    event.bookmark = arrayBookMark.includes(idEvent);
    event.id = idEvent;
    //hace directamente la función changeformadData
    event.dateStart = new Date(event.dateStart);
    if (event.hasOwnProperty("dateFinal")) {
      event.dateFinal = new Date(event.dateFinal);
    }
    if (hasAllPropsValidFormat(event) === true && isCurrentEventActive(event) === true) {
      fetchedEvents.push(event);
    } else {
      // console.error(`El evento : ${event.nameEvent} tiene algún formato mal o le faltan datos necesarios.`)
    }
  }
  fetchedEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime());
  return fetchedEvents;
}

module.exports = {
  parseFetch, checkFormatData, isCurrentEventActive, hasAllPropsValidFormat
}
