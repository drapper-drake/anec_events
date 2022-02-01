export const IMG_DEFAULT = {
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

export const FORMAT_EVENT_JSON =
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
    type: Boolean,
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
    type: Date,//No se si es formato date
    format: "00:00",
    required: false,
  },
  "hoursClose": { //Quizás sería mejor incluirlo en la fecha del principio
    type: Date,//No se si es formato date
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
    default: IMG_DEFAULT[this.category[0]]
  },
  //URL de la información del evento
  "linkEvent": {
    type: String,
    required: false
  },
  //OTROS DATOS AÑADIDOS QUE NO SE UTILIZAN
  //URL de la información del evento
  "companyT": {
    type: String,
    required: false
  },
  "cast": {
    type: String,
    required: false
  },
  "atributionsPhoto": {
    type: String,
    required: false
  },
  "atributionsLink": {
    type: String,
    required: false
  },
  //? DATOS QUE TIENE QUE GENERAR EL JAVASCRIPT
  "id": {
    type: String,
    required: true,
    default: this.nameEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
  },
  "bookmark": {
    type: Boolean,
    required: true,
    default: BookMarkLocalStorage().includes(this.id)
  }
}
function BookMarkLocalStorage(ID_Item = "bookmark") {
  const EVENTS_BOOKMARKED = [];
  if (localStorage.getItem(ID_Item) != null) {
    EVENTS_BOOKMARKED = JSON.parse(localStorage.getItem("bookmark"));
  }
  return EVENTS_BOOKMARKED;
}
