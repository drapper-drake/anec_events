import moment from "moment";
import { createPopUpModal, createRegister, createLogin } from "./createModal.js"
let allEvents = [];
let currentListEvents = [];
let activeCategory = "all";
let listFilterDates = [];
let buttonCalendar;// lo pongo global para poder llamarlo luego desde una función sino se lee todo js y es null
// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("/data/eventosAlicante.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        //Es un generador de Id basados en el nombre del evento
        let idEvent = data[evento].nameEvent;
        idEvent = idEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        data[evento].bookmark = arrayBookMark.includes(idEvent);
        data[evento].id = idEvent;
        allEvents.push(data[evento]);
      }
      changeformatDateJSON(data);
      allEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime())
      currentListEvents = [...allEvents];
      const firstpagination = divideListEventForPagination(1)
      createEvent(content, firstpagination);
      pagination(currentListEvents)

      //IMPROVE va a buscar el evento según el parametro que le hemos pasado en la url
      checkPathname()
    });
}
function changeformatDateJSON() {
  for (let index in allEvents) {
    allEvents[index].dateStart = new Date(allEvents[index].dateStart);
    if (allEvents[index].hasOwnProperty("dateFinal")) {
      allEvents[index].dateFinal = new Date(allEvents[index].dateFinal);
    }
  }
}
// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(container, listEvents) {
  // for (let position in listEvents) {
  for (let position in listEvents) {
    //Llamar función que imprime la fecha en el orden deseado
    let dateStart = dateFormat(listEvents[position].dateStart, true);
    let containerCard = document.createElement("div");
    containerCard.className = "container-card";
    containerCard.dataset.id = listEvents[position].id
    // AÑADE EL EVENTO A LA TARJETA
    containerCard.addEventListener("click", dataModal);
    //DIV DE LA IMAGEN
    let photoEvent = document.createElement("div");
    photoEvent.className = "photoEvent";
    //BOTON FAVORITOS
    let bookmarkContainer = document.createElement("div");
    bookmarkContainer.className = "bookmark"
    let bookmark = document.createElement("img");
    bookmark.src = listEvents[position].bookmark ? "./img/icons/bookmark-selected.svg" : "./img/icons/bookmark.svg";
    bookmark.dataset.name = listEvents[position].id
    bookmark.addEventListener("click", selectedBookmark)
    //IMAGEN
    let image = document.createElement("img");
    image.src = listEvents[position].photoEvent;
    //DATOS TARJETA
    let infoCard = document.createElement("div");
    infoCard.className = "info-card";
    // NOMBRE
    let name = document.createElement("h3");
    name.innerText = listEvents[position].nameEvent;
    // LUGAR
    let place = document.createElement("p");
    place.innerText = listEvents[position].cityLocation;
    // BARRA DE ICONOS
    let bar = document.createElement("div");
    bar.className = "icons-bar";
    // FECHA
    let date = document.createElement("p");
    date.innerText = `Solo el ${dateStart}`;
    if (listEvents[position].hasOwnProperty("dateFinal")) {
      let dateF = dateFormat(listEvents[position].dateFinal, true);
      let resultado = allYear(dateStart, dateF)
      if (!resultado) {
        date.innerText = `Del ${dateStart}  al ${dateF}`;
      } else {
        date.innerText = `Todo el año`;
      }
    }
    container.appendChild(containerCard);
    containerCard.appendChild(photoEvent);
    photoEvent.appendChild(bookmarkContainer);
    bookmarkContainer.appendChild(bookmark);
    photoEvent.appendChild(image);
    containerCard.appendChild(infoCard);
    infoCard.appendChild(name);
    infoCard.appendChild(place);
    infoCard.appendChild(date);
    infoCard.appendChild(bar);


    // ICONO GRATUITO / DE PAGO
    let freeIconContainer = document.createElement("div");
    freeIconContainer.className = "tooltip";
    let freeIcon = document.createElement("img");
    let freeIconText = document.createElement("span");
    freeIconText.className = "tooltip-text";
    photoEvent.appendChild(freeIconContainer);
    freeIconContainer.appendChild(freeIcon);
    freeIconContainer.appendChild(freeIconText);

    if (listEvents[position].free) {
      freeIconText.textContent = "Evento GRATUITO";
      freeIcon.src = "./img/icons/gratis.svg";
      freeIcon.alt = "Evento GRATUITO";
    } else {
      freeIconText.textContent = "Evento de PAGO";
      freeIcon.src = "./img/icons/Pago-euro.svg";
      freeIcon.alt = "Evento de PAGO";
    }
    // ICONO BENÉFICO
    if (listEvents[position].charity) {
      let charityIconContainer = document.createElement("div");
      let charityIcon = document.createElement("img");
      let charityIconText = document.createElement("p");
      charityIconText.textContent = "Benéfico";
      charityIcon.src = "./img/icons/Charity.svg";
      bar.appendChild(charityIconContainer);
      charityIconContainer.appendChild(charityIcon);
      charityIconContainer.appendChild(charityIconText);
    }
    // ICONOS DE CATEGORÍAS
    //IMPROVE Crear una propiedad en eventos para añadir luego datos
    listEvents[position].iconEvent = [];
    listEvents[position].nameIconEvent = [];

    listEvents[position].nameIcon = []
    for (let cat in listEvents[position].category) {
      let categoryIconContainer = document.createElement("div");
      let categoryIcon = document.createElement("img");
      let categoryIconInfo = document.createElement("p");

      switch (listEvents[position].category[cat]) {
        case "Christmas":
          categoryIconInfo.textContent = "Navidad";
          categoryIcon.src = "./img/icons/Navidad.svg";
          listEvents[position].iconEvent.push("./img/icons/Navidad.svg");
          listEvents[position].nameIconEvent.push("Navidad");
          break;
        case "Kids":
          categoryIconInfo.textContent = "Infantil";
          categoryIcon.src = "./img/icons/Kids.svg";
          listEvents[position].iconEvent.push("./img/icons/Kids-dark.svg");
          listEvents[position].nameIconEvent.push("Infantil");
          break;
        case "Play":
          categoryIconInfo.textContent = "Lúdico";
          categoryIcon.src = "./img/icons/Play.svg";
          listEvents[position].iconEvent.push("./img/icons/Play-dark.svg");
          listEvents[position].nameIconEvent.push("Lúdico");
          break;
        case "Music":
          categoryIconInfo.textContent = "Música";
          categoryIcon.src = "./img/icons/Music.svg";
          listEvents[position].iconEvent.push("./img/icons/Music-dark.svg");
          listEvents[position].nameIconEvent.push("Música");
          break;
        case "Sports":
          categoryIconInfo.textContent = "Deporte";
          categoryIcon.src = "./img/icons/Sports.svg";
          listEvents[position].iconEvent.push("./img/icons/Sports-dark.svg");
          listEvents[position].nameIconEvent.push(["Deporte"]);
          break;
        case "Theatre":
          categoryIconInfo.textContent = "Teatro";
          categoryIcon.src = "./img/icons/Theatre.svg";
          listEvents[position].iconEvent.push("./img/icons/Theatre-dark.svg");
          listEvents[position].nameIconEvent.push("Teatro");
          break;
        case "Party":
          categoryIconInfo.textContent = "Fiestas";
          categoryIcon.src = "./img/icons/Cocktail.svg";
          listEvents[position].iconEvent.push("./img/icons/Cocktail-dark.svg");
          listEvents[position].nameIconEvent.push("Fiestas");
          break;
        case "Food":
          categoryIconInfo.textContent = "Gastronómico";
          categoryIcon.src = "./img/icons/Food.svg";
          listEvents[position].iconEvent.push("./img/icons/Food-dark.svg");
          listEvents[position].nameIconEvent.push("Gastronómico");
          break;
        case "Museum":
          categoryIconInfo.textContent = "Museo";
          categoryIcon.src = "./img/icons/Museum.svg";
          listEvents[position].iconEvent.push("./img/icons/Museum-dark.svg");
          listEvents[position].nameIconEvent.push("Museos");
          break;
        default:
          console.error(`Hay ninguna categoria con ese nombre ${listEvents[position].category[cat]}`)
          break;
      }
      bar.appendChild(categoryIconContainer);
      categoryIconContainer.appendChild(categoryIcon);
      categoryIconContainer.appendChild(categoryIconInfo);
    }
  }
}

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function dataModal(e) {
  //La e selecciona el ID del evento y lo pasa a createModal para generar el modal.
  const idOfEvent = e.currentTarget.dataset.id;
  checkEvent(idOfEvent)
  deleteContent()
}
document.querySelector(".sign-in").addEventListener("click", () => {
  createPopUpModal()
  createRegister();
})
document.querySelector(".log-in").addEventListener("click", () => {
  createPopUpModal();
  createLogin();
})

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month, dateShort = false) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let monthFormat = monthNames[month.getMonth()]
  let year = month.getFullYear()
  if (dateShort) {
    monthFormat = monthFormat.toUpperCase().substring(0, 3)
  }
  return `${month.getDate()} ${monthFormat} ${year} `;
}

//Comprobar los de todo el año
function allYear(dateFrom, dateTo) {
  let dateFromNoYear = dateFrom.substr(0, 5)
  let dateToNoYear = dateTo.substr(0, 6)

  return (dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC");
}

//Funciones para el botón de favoritos
let arrayBookMark = [];
//Functions for LocalStorage
const saveLocalStorage = () => localStorage.setItem("bookmark", JSON.stringify(arrayBookMark));

function selectedBookmark(e) {
  e.stopPropagation();
  const bookmarkSelected = "/img/icons/bookmark-selected.svg";
  const bookmarkNormal = "/img/icons/bookmark.svg";
  const idBookmark = e.currentTarget.dataset.name;
  let index = allEvents.findIndex((el) => el.id === idBookmark);
  allEvents[index].bookmark = !allEvents[index].bookmark;
  if (allEvents[index].bookmark === true) {
    e.currentTarget.src = bookmarkSelected;
    arrayBookMark.push(idBookmark)
  } else if (allEvents[index].bookmark === false) {
    e.currentTarget.src = bookmarkNormal;
    let indexB = arrayBookMark.findIndex((el) => el === idBookmark);
    arrayBookMark.splice(indexB, 1);
  }
  saveLocalStorage();
}


// BOTÓN PARA SUBIR AL INICIO DE LA WEB
const BtnUp = document.getElementById("btn-up");
BtnUp.addEventListener("click", scrollUp);

// Funcion que cuando hay scroll hace una animacion para subir al top
function scrollUp() {
  let currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollUp);
    window.scrollTo(0, currentScroll - (currentScroll / 8));
  }
}

// Funcion para que el btn-up no aparezca si no se ha hecho scroll

window.onscroll = () => {
  let scroll = document.documentElement.scrollTop;
  if (scroll > 500) {
    BtnUp.style.transform = "scale(1)";
  } else if (scroll < 500) {
    BtnUp.style.transform = "scale(0)";
  }
}

// función que muestra los eventos filtrados
function resetAndCreateEventsFiltered(listFiltered) {
  const resetContent = document.querySelector(".container");
  resetContent.innerHTML = "";
  if (listFiltered.length === [].length) {
    console.error("No hay eventos ni página de 404");
  } else {
    createEvent(resetContent, listFiltered);
  }
}

//Borra todo menos el header y el footer
function deleteContent() {
  const content = document.querySelector(".container");
  const nav = document.querySelector(".container-nav");
  const pagination = document.querySelector(".pagination")

  content.remove(".container");
  nav.classList.add("hidden");
  pagination.classList.add("hidden");
}

//Crea la vista del evento clickeado
function createViewEvent(eventSelect, days, date, price) {
  const content = document.createElement("div");
  const main = document.querySelector("main");

  content.className = "container";
  main.appendChild(content);

  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";
  content.appendChild(infoContainer);

  const topInfo = document.createElement("div");
  topInfo.className = "top-info";
  infoContainer.appendChild(topInfo);

  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  topInfo.appendChild(imgContainer);

  const tagImg = document.createElement("img");
  tagImg.src = eventSelect.photoEvent
  imgContainer.appendChild(tagImg);

  //BOTON FAVORITOS
  let bookmarkContainer = document.createElement("div");
  bookmarkContainer.className = "bookmarkEvent"
  let bookmark = document.createElement("img");
  bookmark.src = eventSelect.bookmark ? "./img/icons/bookmark-selected.svg" : "./img/icons/bookmark.svg";
  bookmark.dataset.name = eventSelect.id
  imgContainer.appendChild(bookmarkContainer);
  bookmarkContainer.appendChild(bookmark);
  bookmark.addEventListener("click", selectedBookmark)

  const infoEventPage = document.createElement("div");
  infoEventPage.className = "info-event";
  topInfo.appendChild(infoEventPage);

  const titleEv = document.createElement("h2");
  titleEv.className = "title-ev";
  titleEv.textContent = eventSelect.nameEvent;
  infoEventPage.appendChild(titleEv);

  //Categoría - Tipo de evento
  const categoryContainer = document.createElement("div");
  categoryContainer.className = "category";
  infoEventPage.appendChild(categoryContainer);

  for (let cat in eventSelect.category) {
    const categorySvg = document.createElement("img");
    categorySvg.src = eventSelect.iconEvent[cat];
    categorySvg.className = "labelsSvg";
    categoryContainer.appendChild(categorySvg);   //labelsSvg

    const categoryP = document.createElement("p");
    categoryP.textContent = eventSelect.nameIconEvent[cat];
    categoryContainer.appendChild(categoryP);
  }

  //Localizacion
  const cityLocationContainer = document.createElement("div");
  cityLocationContainer.className = "city-location";
  infoEventPage.appendChild(cityLocationContainer);

  const locationSvg = document.createElement("img");
  locationSvg.src = "./img/icons/location.svg";
  locationSvg.className = "labelsSvg";
  cityLocationContainer.appendChild(locationSvg);

  const locationP = document.createElement("p");
  locationP.textContent = eventSelect.site
  cityLocationContainer.appendChild(locationP);


  //Fechas
  const dateContainer = document.createElement("div");
  dateContainer.className = "date";
  infoEventPage.appendChild(dateContainer);

  const dateSvg = document.createElement("img");
  dateSvg.src = "./img/icons/date.svg";
  dateSvg.className = "labelsSvg";
  dateContainer.appendChild(dateSvg);

  const dateP = document.createElement("p");
  dateP.textContent = days;
  dateContainer.appendChild(dateP);


  //Horas
  const hoursContainer = document.createElement("div");
  hoursContainer.className = "hours";
  infoEventPage.appendChild(hoursContainer);

  const hoursSvg = document.createElement("img");
  hoursSvg.src = "./img/icons/Schedule.svg";
  hoursSvg.className = "labelsSvg";
  hoursContainer.appendChild(hoursSvg);

  const hoursP = document.createElement("p");
  hoursP.textContent = date;
  hoursContainer.appendChild(hoursP);

  //Botón calendar + Precio evento
  buttonCalendar = document.createElement("button");
  buttonCalendar.className = "btn-calendar";
  buttonCalendar.textContent = "Añadir al calendario";
  infoEventPage.appendChild(buttonCalendar);
  buttonCalendar.addEventListener("click", () => requestCalendar(eventSelect));


  const priceContainer = document.createElement("div");
  priceContainer.className = "price";
  infoEventPage.appendChild(priceContainer);

  const priceSvg = document.createElement("img");
  priceSvg.src = "./img/icons/euro.svg";
  priceSvg.className = "priceSvg";
  priceContainer.appendChild(priceSvg);

  const priceP = document.createElement("p");
  priceP.textContent = price
  priceContainer.appendChild(priceP);


  //Barra de compartir y más información
  const shareBar = document.createElement("div");
  shareBar.className = "share-bar";
  infoContainer.appendChild(shareBar);

  const btnMoreInfo = document.createElement("button");
  btnMoreInfo.className = "btn-more-info";
  btnMoreInfo.innerHTML = "Más información";
  shareBar.appendChild(btnMoreInfo);
  hasLinkTickets(eventSelect,btnMoreInfo);


  const shareIcon = document.createElement("div");
  shareIcon.className = "share-icon";
  shareBar.appendChild(shareIcon);

  const shareSvg = document.createElement("img");
  shareSvg.src = "./img/icons/Share.svg";
  shareIcon.appendChild(shareSvg);

  const shareP = document.createElement("p");
  shareP.className = "share-text";
  shareP.innerHTML = "Comparte con tus amigos";
  shareIcon.appendChild(shareP);

  const containerSocial = document.createElement("div");
  containerSocial.className = "container-social";
  shareBar.appendChild(containerSocial);

  const iconTwitterSvg = document.createElement("img");
  iconTwitterSvg.src = "./img/icons/twitterBlack.svg";
  iconTwitterSvg.className = "icon-social";
  iconTwitterSvg.dataset.name = "Twitter";
  containerSocial.appendChild(iconTwitterSvg);

  const iconFacebooklSvg = document.createElement("img");
  iconFacebooklSvg.src = "./img/icons/fb-icon.svg";
  iconFacebooklSvg.className = "icon-social";
  iconFacebooklSvg.dataset.name = "Facebook"
  containerSocial.appendChild(iconFacebooklSvg);


  const iconCorreoSvg = document.createElement("img");
  iconCorreoSvg.src = "./img/icons/Email-icon.svg";
  iconCorreoSvg.className = "icon-social";
  iconCorreoSvg.dataset.name = "Email";
  containerSocial.appendChild(iconCorreoSvg);

  // const iconInstagramSvg = document.createElement("img");
  // iconInstagramSvg.src = "./img/icons/Instagram icon.svg";
  // containerSocial.appendChild(iconInstagramSvg);


  //Parte baja de info
  const bottomInfo = document.createElement("div");
  bottomInfo.className = "bottom-info";
  infoContainer.appendChild(bottomInfo);

  const bottomInfoP = document.createElement("p");
  bottomInfoP.className = "contText";
  bottomInfoP.textContent = eventSelect.comments;
  bottomInfo.appendChild(bottomInfoP);

  const map = document.createElement("div");
  map.className = "map"
  bottomInfo.appendChild(map);

  const iframeMap = document.createElement("iframe");
  iframeMap.className = "iframe-map";
  iframeMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&q=${eventSelect.site}`;
  iframeMap.width = "375";
  iframeMap.height = "300";
  iframeMap.style = "border:0";
  iframeMap.loading = "lazy";
  iframeMap.allowfullscreen = "";
  map.appendChild(iframeMap);

  // Otros eventos

  // Flechas
  const moreEventsContainer = document.createElement("div");
  moreEventsContainer.className = "more-events-container hidden";   // hidden!!
  content.appendChild(moreEventsContainer);

  const arrowsContainer = document.createElement("div");
  arrowsContainer.className = "arrows-container";
  moreEventsContainer.appendChild(arrowsContainer);

  const titleOtherEv = document.createElement("h3");
  titleOtherEv.className = "titleOtherEv";
  titleOtherEv.textContent = "Otros eventos:";
  arrowsContainer.appendChild(titleOtherEv);

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  arrowsContainer.appendChild(arrows);

  const arrowLeftSvg = document.createElement("img");
  arrowLeftSvg.src = "./img/icons/arrow-left.svg";
  arrows.appendChild(arrowLeftSvg);

  const arrowRightSvg = document.createElement("img");
  arrowRightSvg.src = "./img/icons/right-arrow.svg";
  arrows.appendChild(arrowRightSvg);

  // Tarjetas otros eventos

  const moreEvents = document.createElement("div");
  moreEvents.className = "more-events";
  moreEventsContainer.appendChild(moreEvents);


}

//Recibe el id del evento que hace click y lo filtra para mandarlo a crear
function checkEvent(e) {
  let eventSelect = e;

  const findEvent = currentListEvents.find(e => e.id === eventSelect);
  const days = checkDate(findEvent)

  const date = checkHours(findEvent);
  const price = checkPrice(findEvent)
  createViewEvent(findEvent, days, date, price);
  scrollUp() //Para que suba y no aparezca abajo

  const iconSocial = document.querySelectorAll(".icon-social")
  iconSocial.forEach((button) => button.addEventListener("click", () => socialRed(button, findEvent)))

}

function checkDate(event) {
  let dateIni = dateFormat(event.dateStart);
  if (event.hasOwnProperty("dateFinal")) {
    let dateF = dateFormat(event.dateFinal);
    let resultado = allYear(dateIni, dateF)
    if (!resultado) {
      return `Del ${dateIni}  al ${dateF}`;
    } else {
      return `Todo el año`;
    }
  } else {
    return dateIni
  }
}

function checkHours(event) {
  console.log(event)
  if (event.hasOwnProperty("hoursClose")) {
    if (event.hoursOpen === event.hoursClose) {
      return event.hoursOpen

    } else {
      return `De ${event.hoursOpen} a las ${event.hoursClose}`
    }
  } else {
    for (let e in event.category) {
      if (event.category[e] === "Music") {
        return event.hoursOpen

      } else {
        return `Todo el día`
      }
    }
  }
}

function checkPrice(event) {
  if (!event.free) {
    if (event.hasOwnProperty("price")) {
      return `Desde ${event.price} €`
    } else {
      return `No disponible`
    }
  } else {
    return "Gratuito"
  }
}

const faceDuck = document.querySelector("header div")
faceDuck.addEventListener("click", refreshPage)
function refreshPage() {
  window.location.href = "/"
  location.reload()
}

//Funcion compartir en redes sociales
function socialRed(e, event) {
  let social;
  switch (e.dataset.name) {

    case "Twitter":
      social = `http://twitter.com/share?text=Descubre+el+evento+${event.nameEvent}&url=localhost:3000/${event.id}&hashtags=${event.category[0]},${event.cityLocation}`;
      break;
    case "Facebook":
      social = `http://www.facebook.com/sharer.php?s=100&p[url]=localhost:3000/${event.id}&p[images]=${event.photoEvent}&p[title]=${event.nameEvent}&p[summary]=${event.comments}`;
      break;
    case "Email":
      social = `mailto:?subject=¡Echa%20un%20vistazo%20a%20este%20evento!&body=Me ha gustado el evento ${event.nameEvent} de esta web localhost:3000/${event.id}`;
      break;

    default: console.error("ha fallado")
  }
  window.open(social, "_blank");

};

// tiene link a tickets
function hasLinkTickets(event,btnMoreInfo) {
  if (!event.hasOwnProperty("linkTickets")){
    btnMoreInfo.classList.add("invisible");
  }else{
    //añadido porque si no se ejecuta al momento
    btnMoreInfo.addEventListener("click", () => {
    let UrlInfo = event.linkTickets;
    window.open(UrlInfo, "_blank");
  })
  }
};

// función de filtrar por fecha
const btnEvent = document.querySelector("#submit");
btnEvent.addEventListener("click", (e) => {
  e.preventDefault();
  let start = document.querySelector("#start").value;
  let final = document.querySelector("#final").value;
  if (start && final) {
    const dateFrom = new Date(start);
    const dateTo = new Date(final);
    // * He cambiado la variable por una global para que funcione con la paginación
    listFilterDates = currentListEvents.filter(event => {
      if (event.dateFinal) {
        return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime()) ||
          (event.dateFinal.getTime() >= dateFrom.getTime() && event.dateFinal.getTime() <= dateTo.getTime()) ||
          (event.dateStart.getTime() <= dateFrom.getTime() && event.dateFinal.getTime() >= dateTo.getTime());
      } else {
        return (event.dateStart.getTime() >= dateFrom.getTime() && event.dateStart.getTime() <= dateTo.getTime());
      }
    });
    /*
    * El evento:
    * - Empieza en el rango
    * - Termina en el rango
    * - Dura más que el rango
    */
    activeCategory = "date";
    resetAndCreateEventsFiltered(listFilterDates);
  }
});

// Funciones de cambio de estilo y filtrado por categoria
const DivFilterCategory = document.querySelectorAll(".navegation > div");

const ChangeStyleAndFilter = (div) => {
  div.addEventListener("click", (e) => {
    const navSelected = "flex justify-center items-center py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
    const navUnselected = "flex justify-center items-center py-1 px-2 cursor-pointer font-bold bg-dark rounded";
    DivFilterCategory.forEach(div => div.className = navUnselected);

    div.className = navSelected;
    const idCategory = e.currentTarget.id;
    //Cambio Color SVG
    document.querySelectorAll(`svg >path`).forEach(path => path.classList.remove("fill-dark")); // Pasan todos a Blanco
    document.querySelectorAll(`#icon-${idCategory} >path`).forEach(path => path.classList.add("fill-dark")) //El seleccionado pasa Azul
    activeCategory = idCategory;
    filterByCategory(idCategory)
  })
}
const filterByCategory = (category) => {
  switch (category) {
    case "all":
      let list = [...allEvents];
      pagination(list);
      list = divideListEventForPagination(1, list);
      resetAndCreateEventsFiltered(list);
      break;
    case "bookmark":
      let listBookmark = allEvents.filter(events => events.bookmark);
      pagination(listBookmark);
      listBookmark = divideListEventForPagination(1, listBookmark);
      resetAndCreateEventsFiltered(listBookmark);
      break;
    default:
      let listCategoryEvent = allEvents.filter(events => events.category.includes(category));
      pagination(listCategoryEvent);
      listCategoryEvent = divideListEventForPagination(1, listCategoryEvent);
      resetAndCreateEventsFiltered(listCategoryEvent);
      break;
  }
}
DivFilterCategory.forEach(ChangeStyleAndFilter);
const pageSelected = "px-4 py-2 bg-dark text-light font-bold cursor-pointer border border-dark rounded ";
const pageUnSelected = "px-4 py-2 bg-light text-dark font-bold cursor-pointer border border-dark rounded hover:bg-dark hover:text-light ";

function pagination(listEvents) {
  const containerNavPages = document.querySelector(".pagination");
  while (containerNavPages.hasChildNodes()) {
    containerNavPages.firstChild.remove();
  }
  const result = listEvents.length / 12;
  let numberPages;
  if (result === Math.trunc(result)) {
    // para listas que sean múltiplos de 12 (12, 24, 36...)
    numberPages = Math.trunc(result) - 1;
  } else {
    numberPages = Math.trunc(result);
  }
  for (let page = 0; page <= numberPages; page++) {
    const anchor = document.createElement("a");
    anchor.textContent = page + 1;
    anchor.className = page === 0 ? pageSelected : pageUnSelected;
    anchor.addEventListener("click", changePagination);
    containerNavPages.appendChild(anchor);
  }
}
function divideListEventForPagination(numberPage) {
  let list = [];
  switch (activeCategory) {
    case "all":
      list = [...allEvents];
      break;
    case "date":
      list = [...listFilterDates]
      break;
    case "bookmark":
      list = allEvents.filter(event => event.bookmark)
      break;
    default:
      list = allEvents.filter(event => event.category.includes(activeCategory));
  }
  let min = 12 * (numberPage - 1);
  let max = (min + 11) > list.length ? list.length : min + 11;
  return list = list.slice(min, max + 1);
}
function changePagination(e) {
  document.querySelectorAll(".pagination a").forEach(a => a.className = pageUnSelected);
  e.currentTarget.className = e.currentTarget.className === pageSelected ? pageUnSelected : pageSelected;
  const listPagination = divideListEventForPagination(Number(e.currentTarget.textContent));
  resetAndCreateEventsFiltered(listPagination)
}

//BUG borrar ahora
function checkPathname(){
  if(window.location.pathname === "/"){
    console.log(window.location)

  }else {
    console.log(window.location)
    const ruta = window.location.pathname.slice(1)
    console.log(ruta)

    checkEvent(ruta)
    deleteContent()
  }
}

const requestCalendar = (e) => {
  console.log(e)
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


// desplegar menú de la hamburguesa
const hamburguer = document.querySelector(".hamburguer");
hamburguer.addEventListener("click", () => {
  // animación de la hamburguesa
  const bar1 = document.querySelector(".bar-1");
  const bar2 = document.querySelector(".bar-2");
  const bar3 = document.querySelector(".bar-3");
  bar1.classList.toggle("rotate-45");
  bar1.classList.toggle("-translate-y-1.5");
  bar2.classList.toggle("opacity-0");
  bar3.classList.toggle("-rotate-45");
  bar3.classList.toggle("translate-y-1.5");
  // quitar scroll del body
  const body = document.querySelector("body");
  body.classList.toggle("overflow-hidden");
  // mostrar botones
  const login = document.querySelector(".log-in");
  login.classList.toggle("hidden");
  const signin = document.querySelector(".sign-in");
  signin.classList.toggle("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookmark") != null) {
    let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
    arrayBookMark = uploadEvents;
  }
  createAll();
});
