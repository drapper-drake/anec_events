let allEvents = [];
let currentListEvents = [];

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
        idEvent = idEvent.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        data[evento].bookmark = arrayBookMark.includes(idEvent);
        data[evento].id = idEvent;
        allEvents.push(data[evento]);
      }
      changeformatDateJSON(data);
      allEvents.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime())
      createEvent(content, allEvents);
      pagination(currentListEvents)
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
  for (let position = 0; position < 12; position++) {
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
    bookmark.addEventListener('click', selectedBookmark)
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
    for (let cat in listEvents[position].category) {
      let categoryIconContainer = document.createElement("div");
      let categoryIcon = document.createElement("img");
      let categoryIconInfo = document.createElement("p");
      switch (listEvents[position].category[cat]) {
        case "Christmas":
          categoryIconInfo.textContent = "Navidad";
          categoryIcon.src = "./img/icons/Navidad.svg";
          break;
        case "Kids":
          categoryIconInfo.textContent = "Infantil";
          categoryIcon.src = "./img/icons/Kids.svg";
          break;
        case "Play":
          categoryIconInfo.textContent = "Lúdico";
          categoryIcon.src = "./img/icons/Play.svg";
          break;
        case "Music":
          categoryIconInfo.textContent = "Música";
          categoryIcon.src = "./img/icons/Music.svg";
          break;
        case "Sports":
          categoryIconInfo.textContent = "Deporte";
          categoryIcon.src = "./img/icons/Sports.svg";
          break;
        case "Theatre":
          categoryIconInfo.textContent = "Teatro";
          categoryIcon.src = "./img/icons/Theatre.svg";
          break;
        case "Party":
          categoryIconInfo.textContent = "Fiestas";
          categoryIcon.src = "./img/icons/Cocktail.svg";
          break;
        case "Food":
          categoryIconInfo.textContent = "Gastronómico";
          categoryIcon.src = "./img/icons/Food.svg";
          break;
        case "Museum":
          categoryIconInfo.textContent = "Museo";
          categoryIcon.src = "./img/icons/Museum.svg";
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
  createModal(idOfEvent);
}
function createModal(id) {
  //QUITAR EL SCROLL DEL BODY
  const body = document.querySelector('body');
  body.classList.add("overflow-hidden");
  let dataEvent = currentListEvents.find((el) => el.id === id);
  const modalWindow = document.querySelector("main");
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container";
  modalWindow.appendChild(modalBox);
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  modalBox.appendChild(modal);
  // IMAGEN
  let fatherModalImagen = document.createElement('div');
  fatherModalImagen.className = "modal-image";
  let modalImage = document.createElement("img");
  modalImage.src = dataEvent.photoEvent;
  // añadimos la clase 'landscape' al modal de imágenes apaisadas
  if (modalImage.naturalWidth > modalImage.naturalHeight) {
    fatherModalImagen.className = "modal-image landscape";
  }
  fatherModalImagen.appendChild(modalImage);
  modal.appendChild(fatherModalImagen);
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  modal.appendChild(modalText);
  // NOMBRE
  let modalName = document.createElement("p");
  modalName.innerText = dataEvent.nameEvent;
  modalText.appendChild(modalName);
  // LUGAR
  let modalPlace = document.createElement("p");
  modalPlace.innerText = dataEvent.site;
  modalText.appendChild(modalPlace);
  // FECHA
  let modalDate = document.createElement("p");
  let dateStartModal = dateFormat(dataEvent.dateStart);
  modalDate.innerText = dateStartModal;

  // FECHA FINAL
  if (dataEvent.hasOwnProperty("dateFinal")) {
    let dateFinalModal = dateFormat(dataEvent.dateFinal);
    modalDate.innerText = `Del ${dateStartModal} al ${dateFinalModal}`;
  }
  modalText.appendChild(modalDate);
  // DESCRIPCIÓN
  if (dataEvent.hasOwnProperty("comments")) {
    let description = document.createElement("p");
    if (dataEvent.comments.length > 174) {
      description.innerText = dataEvent.comments.substring(0, 173) + "...";
    } else {
      description.innerText = dataEvent.comments;
    }
    modalText.appendChild(description);
  }
  // BOTÓN DE CIERRE
  let closeButton = document.createElement("img");
  closeButton.className = "close";
  closeButton.src = "./img/icons/xmark-solid.svg";
  closeButton.alt = "Cerrar";
  modal.appendChild(closeButton);
  // FUNCIONALIDAD DEL MODAL
  closeButton.addEventListener("click", () => {
    modalBox.remove();
    body.classList.remove("overflow-hidden");
  });
  window.addEventListener("click", (e) => {
    if (e.target == modalBox) {
      modalBox.remove();
      body.classList.remove("overflow-hidden");
    }
  });
}

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month, dateShort = false) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let monthFormat = monthNames[month.getMonth()]
  let year = month.getFullYear()
  if (dateShort) {
    monthFormat = monthFormat.toUpperCase().substring(0, 3)
  }
  return `${month.getDate()} ${monthFormat} ${year} `
    ;
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

function filterBookmarks() {
  let listFilteredBookmark = [];
  for (let index in arrayBookMark) {
    for (let position in allEvents) {
      if (allEvents[position].id === arrayBookMark[index]) {
        listFilteredBookmark.push(allEvents[position]);
      }
    }
  }
  resetAndCreateEventsFiltered(listFilteredBookmark);
}


// Función del slider de logos de patrocinadores

const Sponsors = document.querySelectorAll(".container-img > img");

let indexSlider = 0;
//Le añado a todas una clase que las oculta
const hideImg = () => {
  Sponsors.forEach((img) => img.classList.add("hidden"));
};

function nextSliderImg() {
  if (indexSlider === 0 && Sponsors[indexSlider].className === "hidden") {
    return Sponsors[indexSlider].classList.remove("hidden");
  } else {
    Sponsors[indexSlider].classList.add("hidden");
    //Index se esta igualando a la condición del ternario
    indexSlider = indexSlider < Sponsors.length - 1 ? indexSlider + 1 : 0;
    Sponsors[indexSlider].classList.remove("hidden");
  }
}

function responsiveFooter() {
  if (window.innerWidth <= 768) {
    hideImg();
    nextSliderImg();
    setInterval(nextSliderImg, 3000);
  }
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
    console.error('No hay eventos ni página de 404');
  } else {
    createEvent(resetContent, listFiltered);
  }
}

// función de filtrar por fecha
const btnEvent = document.querySelector('#submit');
btnEvent.addEventListener("click", (e) => {
  e.preventDefault();
  let start = document.querySelector("#start").value;
  let final = document.querySelector("#final").value;
  if (start && final) {
    const dateFrom = new Date(start);
    const dateTo = new Date(final);
    const listFilteredDate = currentListEvents.filter(event => {
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
    resetAndCreateEventsFiltered(listFilteredDate);
  }
});

// Cambio de color al seleccionar en NavBar
const divList = document.querySelectorAll(".navegation > div");
const navSelected = "flex justify-center items-center py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
const navUnselected = "flex justify-center items-center py-1 px-2 cursor-pointer bg-dark rounded";
divList.forEach(div => {
  div.addEventListener("click", () => {
    divList.forEach(div => div.className = navUnselected);
    div.className = navSelected;
  })
})
// reset de eventos al usar NavBar
divList.forEach(category => category.addEventListener("click", (e) => {
  const idCategory = e.currentTarget.id;
  switch (idCategory) {
    case "all":
      resetAndCreateEventsFiltered(allEvents);
      break;
    case "bookmark":
      filterBookmarks();
      break;
    default:
      resetAndCreateEventsFiltered(allEvents.filter(events => events.category.includes(idCategory)));
      break;
  }
}));
const pageSelected = "px-4 py-2 bg-dark text-light font-bold cursor-pointer rounded "
const pageUnSelected = "px-4 py-2 bg-light text-dark font-bold cursor-pointer border border-dark rounded hover:bg-dark hover:text-light "

function pagination(listEvents) {
  const containerNavPages = document.querySelector(".pagination");
  const numberPages = Math.trunc(listEvents.length / 12)
  for (let page = 0; page <= numberPages; page++) {
    const div = document.createElement("a");
    div.textContent = page + 1;
    div.className = page === 0 ? pageSelected : pageUnSelected;
    div.addEventListener("click", changePagination)
    containerNavPages.appendChild(div)
  }
}
function changePagination(e) {
  document.querySelectorAll(".pagination a").forEach(a => a.className = pageUnSelected);
  e.currentTarget.className = e.currentTarget.className === pageSelected ? pageUnSelected : pageSelected;
  let listpagination = currentListEvents;
  let min = 0;
  let max = 12;
  if (Number(e.currentTarget.textContent) === 3 || 5 || 7) {
    min = 12 * (e.currentTarget.textContent - 1) + 1;
    max = min + max;
  } else if (Number(e.currentTarget.textContent) === 2 || 4 || 6 || 8) {
    min = 12 * (e.currentTarget.textContent - 1);
    max = min + max;
  }
  listpagination = listpagination.slice(min, max)
  resetAndCreateEventsFiltered(listpagination)
}
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookmark") != null) {
    let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
    arrayBookMark = uploadEvents;
  }
  createAll();
  currentListEvents = allEvents;
  responsiveFooter();
});
