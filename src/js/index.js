let allEvents = [];
let currentListEvents = [];

// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("/data/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        //Es un generador de Id basados en el nombre del evento
        let idEvent = data[evento].nameEvent;
        idEvent = idEvent.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        data[evento].bookmark = false;
        data[evento].id = idEvent;
        allEvents.push(data[evento]);
      }
      changeformatDateJSON(data);
      allEvents.sort((a,b) => a.dateStart - b.dateStart)
      createEvent( content, allEvents);

    });
  }
function changeformatDateJSON (){
  for (let index in allEvents) {
    allEvents[index].dateStart = new Date(allEvents[index].dateStart);
    if(allEvents[index].hasOwnProperty("dateFinal")){
    allEvents[index].dateFinal = new Date(allEvents[index].dateFinal);
    }
  }
}
  // ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
  function createEvent( container, listEvents ) {
    for(let position in listEvents ){
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
      bookmark.src = listEvents[position].bookmark ? "./img/icons/bookmark-selected.svg"  : "./img/icons/bookmark.svg";
      bookmark.dataset.name = listEvents[position].id
      // bookmark.removeEventListener("click",dataModal)
      bookmark.addEventListener('click',selectedBookmark)
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
      if(listEvents[position].hasOwnProperty("dateFinal")){
        let dateF = dateFormat(listEvents[position].dateFinal,true );
        date.innerText = `Desde el ${dateStart}  al ${dateF}`;
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
      if(listEvents[position].charity) {
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
      for(let cat in listEvents[position].category) {
        switch(listEvents[position].category[cat]) {
          case "Christmas":
            let xmasIconContainer = document.createElement("div");
            let xmasIcon = document.createElement("img");
            let xmasIconText = document.createElement("p");
            xmasIconText.textContent = "Navidad";
            xmasIcon.src = "./img/icons/Navidad.svg";
            bar.appendChild(xmasIconContainer);
            xmasIconContainer.appendChild(xmasIcon);
            xmasIconContainer.appendChild(xmasIconText);
            break;
          case "Kids":
            let kidsIconContainer = document.createElement("div");
            let kidsIcon = document.createElement("img");
            let kidsIconText = document.createElement("p");
            kidsIconText.textContent = "Infantil";
            kidsIcon.src = "./img/icons/Kids.svg";
            bar.appendChild(kidsIconContainer);
            kidsIconContainer.appendChild(kidsIcon);
            kidsIconContainer.appendChild(kidsIconText);
            break;
          case "Play":
            let playIconContainer = document.createElement("div");
            let playIcon = document.createElement("img");
            let playIconText = document.createElement("p");
            playIconText.textContent = "Lúdico";
            playIcon.src = "./img/icons/Play.svg";
            bar.appendChild(playIconContainer);
            playIconContainer.appendChild(playIcon);
            playIconContainer.appendChild(playIconText);
            break;
          case "Music":
            let musicIconContainer = document.createElement("div");
            let musicIcon = document.createElement("img");
            let musicIconText = document.createElement("p");
            musicIconText.textContent = "Música";
            musicIcon.src = "./img/icons/Music.svg";
            bar.appendChild(musicIconContainer);
            musicIconContainer.appendChild(musicIcon);
            musicIconContainer.appendChild(musicIconText);
            break;
          case "Sports":
            let sportIconContainer = document.createElement("div");
            let sportIcon = document.createElement("img");
            let sportIconText = document.createElement("p");
            sportIconText.textContent = "Deporte";
            sportIcon.src = "./img/icons/Sports.svg";
            bar.appendChild(sportIconContainer);
            sportIconContainer.appendChild(sportIcon);
            sportIconContainer.appendChild(sportIconText);
            break;
          case "Theatre":
            let theatreIconContainer = document.createElement("div");
            let theatreIcon = document.createElement("img");
            let theatreIconText = document.createElement("p");
            theatreIconText.textContent = "Teatro";
            theatreIcon.src = "./img/icons/Theatre.svg";
            bar.appendChild(theatreIconContainer);
            theatreIconContainer.appendChild(theatreIcon);
            theatreIconContainer.appendChild(theatreIconText);
            break;
          case "Party":
            let partyIconContainer = document.createElement("div");
            let partyIcon = document.createElement("img");
            let partyIconText = document.createElement("p");
            partyIconText.textContent = "Fiestas";
            partyIcon.src = "./img/icons/Cocktail.svg";
            bar.appendChild(partyIconContainer);
            partyIconContainer.appendChild(partyIcon);
            partyIconContainer.appendChild(partyIconText);
            break;
          case "Food":
            let foodIconContainer = document.createElement("div");
            let foodIcon = document.createElement("img");
            let foodIconText = document.createElement("p");
            foodIconText.textContent = "Gastronómico";
            foodIcon.src = "./img/icons/Food.svg";
            bar.appendChild(foodIconContainer);
            foodIconContainer.appendChild(foodIcon);
            foodIconContainer.appendChild(foodIconText);
            break;
          case "Museum":
            let museumIconContainer = document.createElement("div");
            let museumIcon = document.createElement("img");
            let museumIconText = document.createElement("p");
            museumIconText.textContent = "Museo";
            museumIcon.src = "./img/icons/Museum.svg";
            bar.appendChild(museumIconContainer);
            museumIconContainer.appendChild(museumIcon);
            museumIconContainer.appendChild(museumIconText);
            break;
          default:
            console.error(`Hay ningun caso con ese nombre ${listEvents[position].category[cat]}`)
            break;
        }
      }
    }
  }

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function dataModal(e){
  //La e selecciona el ID del evento y lo pasa a createModal para generar el modal.
  const idOfEvent = e.currentTarget.dataset.id;
  createModal(idOfEvent)
}
function createModal(id) {
  //QUITAR EL SCROLL DEL BODY
  const body = document.querySelector('body')
  body.classList.add("overflow-hidden")
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
  if(modalImage.naturalWidth > modalImage.naturalHeight) {
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
  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  let monthFormat = monthNames[month.getMonth()]
  if(dateShort){
    monthFormat= monthFormat.toUpperCase().substring(0,3)
  }
  return `${month.getDate()} ${monthFormat}`
 ;
}
//Funciones para el botón de favoritos
let arrayBookMark= [];
//Functions for LocalStorage
const saveLocalStorage = () => localStorage.setItem("bookmark", JSON.stringify(arrayBookMark));

function selectedBookmark (e) {
  e.preventDefault();
  e.stopPropagation();
  const idBookmark = e.currentTarget.dataset.name;
  let index = allEvents.findIndex((el) => el.id === idBookmark);
  allEvents[index].bookmark = !allEvents[index].bookmark;
  const bookmarkSelected = "/img/icons/bookmark-selected.svg";
  const bookmarkNormal = "/img/icons/bookmark.svg";
  e.currentTarget.src = allEvents[index].bookmark ? bookmarkSelected : bookmarkNormal ;

  let indexB = arrayBookMark.findIndex((el) => el.id === idBookmark);
  indexB > -1 ? arrayBookMark.splice(indexB,1) : arrayBookMark.push(idBookmark);
  saveLocalStorage()
}
//Esta el boton en el encabezado temporalmente
const btnH1 = document.querySelector("h1")
function filterBookmarks () {
  let listFilteredBookmark = [];
  for(let index in arrayBookMark){
    for(let position in allEvents){
      if(allEvents[position].id === arrayBookMark[index]){
        listFilteredBookmark.push(allEvents[position]);
      }
    }
  }
  resetAndCreateEventsFiltered(listFilteredBookmark);
}


/* Función del slider de logos de patrocinadores
 * Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
 * */
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
function scrollUp(){
  let currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0){
    window.requestAnimationFrame(scrollUp);
    window.scrollTo(0, currentScroll - (currentScroll / 8));
  }
}

// Funcion para que el btn-up no aparezca si no se ha hecho scroll

window.onscroll = function(){
  let scroll = document.documentElement.scrollTop;

  if (scroll > 500){
    BtnUp.style.transform = "scale(1)";
  } else if(scroll < 500) {
    BtnUp.style.transform= "scale(0)";
  }
}

const btnEvent = document.querySelector('#submit')
// Función que filtra los eventos desde una fecha de inicio y otra final
function resetAndCreateEventsFiltered(listFiltered){
  currentListEvents = listFiltered;
  const resetContent = document.querySelector(".container");
  resetContent.innerHTML = "";
  if(listFiltered.length === [].length){
    console.error('No hay eventos ni página de 404');
  }else{
    createEvent(resetContent, listFiltered);
  }
}

function getFilterDate(e) {
  e.preventDefault();
  if(isValidDate()) {
    let start = document.querySelector("#start").value;
    let final = document.querySelector("#final").value;
    const dateFrom = new Date(start);
    const dateTo = new Date(final);

    const listFilteredDate = [];
    for(let evento in currentListEvents) {
      let event = currentListEvents[evento];
      if(event.dateFinal) {
        if((event.dateStart >= dateFrom && event.dateStart <= dateTo) || (event.dateFinal >= dateFrom && event.dateFinal <= dateTo) || (event.dateStart >= dateFrom && event.dateFinal <= dateTo)) {
          listFilteredDate.push(event);
        }
      } else {
        if(event.dateStart >= dateFrom && event.dateStart <= dateTo) {
          listFilteredDate.push(event);
        }
      }
    }

    // const listFilteredDate = currentListEvents.filter((events) => {
    //   if(events.dateFinal) {
    //     return ((events.dateStart >= dateFrom && events.dateStart <= dateTo) || (events.dateFinal >= dateFrom && events.dateFinal <= dateTo) || (events.dateStart >= dateFrom && events.dateFinal <= dateTo));
    //   } else {
    //     return (events.dateStart >= dateFrom && events.dateStart <= dateTo);
    //   }
    // });
    resetAndCreateEventsFiltered(listFilteredDate);
  }
}
function isValidDate (){
  let dateStart = document.querySelector("#start").value;
  let dateFinal = document.querySelector("#final").value;
  return dateStart && dateFinal;
}
btnEvent.addEventListener("click", getFilterDate);

function selectNavBar (){
  const listEvent = document.querySelectorAll(".navegation>div");
  const navSelected = "flex justify-center items-center py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded"
  listEvent.forEach( div => {
    div.addEventListener("click", () => {
      listEvent.forEach(div => div.className = "flex justify-center items-center py-1 px-2 cursor-pointer bg-dark rounded");
      div.className = navSelected;
    })
  })
}
const filterNavBar = document.querySelectorAll(".navegation > div");
function filterNav(e){
  const idCategory = e.currentTarget.id
  if(idCategory === "all"){
    return resetAndCreateEventsFiltered(allEvents);
  }else if (idCategory === "bookmark"){
    return filterBookmarks();
  }
  const listEvent = allEvents.filter(events => events.category.includes(idCategory));
  return resetAndCreateEventsFiltered(listEvent);
}
filterNavBar.forEach(category => category.addEventListener("click", filterNav));

selectNavBar();
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookmark") != null) {
    let uploadEvents = JSON.parse(localStorage.getItem("bookmark"));
    arrayBookMark = uploadEvents;
  }
  createAll();
  currentListEvents = allEvents;
  responsiveFooter();
});

