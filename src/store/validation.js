export const IMG_DEFAULT = {
  "Christmas": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702830/anac-event/n09ohrh26ibjrdkcl0hn.jpg",
  "Kids": "./img/fallback-categories-img/kids.jpg",
  "Play": "./img/fallback-categories-img/play.jpg",
  "Music": "./img/fallback-categories-img/music.jpg",
  "Sports": "./img/fallback-categories-img/sports.jpg",
  "Theatre": "./img/fallback-categories-img/theatre.jpg",
  "Party": "./img/fallback-categories-img/party.jpg",
  "Food": "./img/fallback-categories-img/food.jpg",
  "Museum": "./img/fallback-categories-img/museum.jpg"
}

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
  "hoursOpen": {
    type: String,//No es formato Date
    format: "00:00",
    required: false,
  },
  "hoursClose": {
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
  //* DATOS QUE TIENE QUE GENERAR EL JAVASCRIPT
  "id": {
    type: String,
    required: true,
  },
  "bookmark": {
    type: Boolean,
    required: true,
  }
}
export function getBookMarkLocalStorage(ID_Item = "bookmark") {
  let EVENTS_BOOKMARKED = [];
  if (localStorage.getItem(ID_Item) != null) {
    EVENTS_BOOKMARKED = JSON.parse(localStorage.getItem("bookmark"));
  }
  return EVENTS_BOOKMARKED;
}

// Si lo ha podido hacer con exito devuelve el evento? o un true
export function checkFormatData(event, property) {
  if (event[property] === undefined) {
    return false;
  }
  const correctType = FORMAT_EVENT_JSON[property]['type'].name;
  let typeCategoryEvent = event[property].constructor.name
  if (property === 'dateStart' || property === 'dateFinal') {
    const dateEvent = new Date(event[property])
    typeCategoryEvent = (dateEvent == "Invalid Date") ? false : dateEvent.constructor.name;
  }
  return (typeCategoryEvent === correctType);
}
export function hasAllPropsValidFormat(event) {
  let listForCheckProps = [];
  for (let property in FORMAT_EVENT_JSON) {
    if (event[property]) {
      const isValid = checkFormatData(event, property)
      listForCheckProps.push(isValid)// ? Para hacer un array si todas las propìedades tienen el formato necesario
    } else if (event[property] === undefined && FORMAT_EVENT_JSON[property].required) {
      // ? console.error(`El evento : ${event.nameEvent} no tiene la propiedad,${property}, y es necesaria.`)
      return false;
    }
  }
  return listForCheckProps.every((value) => value === true);
}
export function isCurrentEventActive(eventCurrent) {
  if (hasAllPropsValidFormat(eventCurrent)) {
    const TODAY = new Date().getTime();
    const startEvent = eventCurrent.dateStart.getTime()
    if (TODAY < startEvent) {
      return true;
    }
    if (eventCurrent.hasOwnProperty("dateFinal")) {
      const finishEvent = eventCurrent.dateFinal.getTime()
      if (TODAY >= startEvent && TODAY <= finishEvent) {
        return true;
      }
    }
  }
  return false;
}

