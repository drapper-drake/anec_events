const IMG_DEFAULT = {
  "Christmas": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702830/anac-event/n09ohrh26ibjrdkcl0hn.jpg",
  "Kids": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702188/anac-event/sc9em1zyhi9eb7vxstww.jpg",
  "Play": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702830/anac-event/n09ohrh26ibjrdkcl0hn.jpg",
  "Music": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702565/anac-event/vs0qyxhhmddcmohbjcey.jpg",
  "Sports": "https://res.cloudinary.com/ddn278n2q/image/upload/v1641986533/anac-event/krtwgwvgh8yb099xuenn.jpg",
  "Theatre": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702467/anac-event/ywwnxmyxfcz4zherp5uc.jpg",
  "Party": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702188/anac-event/zgzbobpjjys002ppjp2z.jpg",
  "Food": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643702346/anac-event/ygitsiwf0idmvvcvo28a.jpg",
  "Museum": "https://res.cloudinary.com/ddn278n2q/image/upload/v1643703039/anac-event/qkktbvgyyjcm2l4clwiz.jpg"
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
    required: true,// Pero si no viene que se ponga una Default dependiendo de la primera posición del array
    //! default: IMG_DEFAULT[this.category[0]] Rompe el Test
  },
  //URL de la información del evento
  "linkEvent": {
    type: String,
    required: false
  }
  // //* DATOS QUE TIENE QUE GENERAR EL JAVASCRIPT
  // "id": {
  //   type: String,
  //   required: true,
  //   //! default: this.nameEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
  // },
  // "bookmark": {
  //   type: Boolean,
  //   required: true,
  //   //! default: BookMarkLocalStorage().includes(this.id)
  // }
}
function BookMarkLocalStorage(ID_Item = "bookmark") {
  const EVENTS_BOOKMARKED = [];
  if (localStorage.getItem(ID_Item) != null) {
    A
    EVENTS_BOOKMARKED = JSON.parse(localStorage.getItem("bookmark"));
  }
  return EVENTS_BOOKMARKED;
}

// Si lo ha podido hacer con exito devuelve el evento? o un true
function checkFormatData(event, property) {
  let Type_Category_Event = ''
  if (property === 'dateStart' || property === 'dateFinal') {
    const dateEvent = new Date(event[property])
    Type_Category_Event = dateEvent.constructor.name
  } else {
    Type_Category_Event = event[property].constructor.name
  }
  const Correct_Type = FORMAT_EVENT_JSON[property]['type'].name;
  return (Type_Category_Event === Correct_Type);
}
function hasAllPropsValidFormat(event) {
  let listForCheckProps = [];
  for (let property in FORMAT_EVENT_JSON) {
    if (event[property]) {
      const isValid = checkFormatData(event, property)
      listForCheckProps.push(isValid) // ? Para hacer un array si todas las propìedades tienen el formato necesario
    } else if (event[property] === undefined && property.required) {
      console.error(`El evento : ${event.nameEvent} no tiene la propiedad,${property}, y es necesaria.`)
      return false;
    }
  }
  return listForCheckProps.every((value) => value === true);
}

function isCurrentEventActive(eventCurrent) {
  if (hasAllPropsValidFormat(eventCurrent)) {
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
    // if (localStorage.getItem("bookmark") != null) {
    //   let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
    //   this.arrayBookMark = uploadEvents;
    // }
    event.bookmark = arrayBookMark.includes(idEvent);
    event.id = idEvent;
    //hace directamente la función changeformadData
    event.dateStart = new Date(event.dateStart);
    if (event.hasOwnProperty("dateFinal")) {
      event.dateFinal = new Date(event.dateFinal);
    }
    if (hasAllPropsValidFormat(event) === true && isCurrentEventActive(event) === true) {
      fetchedEvents.push(event);
    }
    else {
      console.error(`El evento : ${event.nameEvent} tiene algún formato mal o le faltan datos necesarios.`)
    }
  }
  fetchedEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime());
  console.info(fetchedEvents)
  return fetchedEvents;
}



module.exports = {
  parseFetch, checkAndCorrectData: checkFormatData, IMG_DEFAULT, isCurrentEventActive, hasAllPropsValidFormat
}
