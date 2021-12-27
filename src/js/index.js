const allEvents = [];

// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        //Es un generador de Id basados en el nombre del evento
        let idEvent = data[evento].nameEvent;
        idEvent = idEvent.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
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
  function createEvent( container ) {
    for(let position in allEvents ){
      //Llamar función que imprime la fecha en el orden deseado
      let dateStart = dateFormat(allEvents[position].dateStart, true);
      let containerCard = document.createElement("div");
      containerCard.className = "container-card";

      //DIV DE LA IMAGEN
      let photoEvent = document.createElement("div");
      photoEvent.className = "photoEvent";
      //IMAGEN
      let image = document.createElement("img");
      image.src = allEvents[position].photoEvent;
      //TARJETA
      let card = document.createElement("div");
      card.className = "card";
      card.id = allEvents[position].id
      // AÑADE EL EVENTO A LA TARJETA
      card.addEventListener("click", dataModal);

      //DATOS TARJETA
      let infoCard = document.createElement("div");
      infoCard.className = "info-card";
      // NOMBRE
      let name = document.createElement("h3");
      name.innerText = allEvents[position].nameEvent;
      // LUGAR
      let place = document.createElement("p");
      place.innerText = allEvents[position].cityLocation;
      // BARRA DE ICONOS
      let bar = document.createElement("div");
      bar.className = "icons-bar";
      //DIV FECHA
      let dateCard = document.createElement("div");
      dateCard.className = "date-card";
      // FECHA
      let date = document.createElement("p");
      date.innerText = dateStart;

      container.appendChild(containerCard);
      containerCard.appendChild(photoEvent);
      photoEvent.appendChild(image);
      containerCard.appendChild(card);
      card.appendChild(infoCard)
      card.appendChild(dateCard)
      infoCard.appendChild(bar);
      infoCard.appendChild(name);
      infoCard.appendChild(place);
      dateCard.appendChild(date);

      if(allEvents[position].hasOwnProperty("dateFinal")){
        let dateF = dateFormat(allEvents[position].dateFinal,true );
        let dateEnd = document.createElement("p");
        dateEnd.innerText = dateF;
        let divider = document.createElement("hr");
        dateCard.appendChild(divider);
        dateCard.appendChild(dateEnd);
      }
      // ICONO GRATUITO / DE PAGO
      let freeIconContainer = document.createElement("figure");
      let freeIcon = document.createElement("img");
      bar.appendChild(freeIconContainer);
      freeIconContainer.appendChild(freeIcon);

      if (allEvents[position].free) {
        freeIconContainer.title = "Evento GRATUITO";
        freeIcon.src = "/src/assets/img/Gratis.svg";
        freeIcon.alt = "Evento GRATUITO";
      } else {
        freeIconContainer.title = "Evento DE PAGO";
        freeIcon.src = "/src/assets/img/pago.svg";
        freeIcon.alt = "Evento DE PAGO";
      }
      // ICONO BENÉFICO
      if(allEvents[position].charity) {
        let charityIconContainer = document.createElement("figure");
        let charityIcon = document.createElement("img");
        charityIconContainer.title = "Evento BENÉFICO";
        charityIcon.src = "/src/assets/img/Solidario.svg";
        charityIcon.alt = "Evento BENÉFICO";
        bar.appendChild(charityIconContainer);
        charityIconContainer.appendChild(charityIcon);
      }
      // ICONO RURAL / URBANO
      if(allEvents[position].village) {
        let ruralIconContainer = document.createElement("figure");
        let ruralIcon = document.createElement("img");
        ruralIconContainer.title = "Evento RURAL";
        ruralIcon.src = "/src/assets/img/iconoVillage.png";
        ruralIcon.alt = "Evento RURAL";
        bar.appendChild(ruralIconContainer);
        ruralIconContainer.appendChild(ruralIcon);
      } else {
        let cityIconContainer = document.createElement("figure");
        let cityIcon = document.createElement("img");
        cityIconContainer.title = "Evento URBANO";
        cityIcon.src = "/src/assets/img/iconoCity.png";
        cityIcon.alt = "Evento URBANO";
        bar.appendChild(cityIconContainer);
        cityIconContainer.appendChild(cityIcon);
      }
      // ICONOS DE CATEGORÍAS
      for(let cat in allEvents[position].category) {
        switch(allEvents[position].category[cat]) {
          case "Christmas":
            let xmasIconContainer = document.createElement("figure");
            let xmasIcon = document.createElement("img");
            xmasIconContainer.title = "Evento NAVIDEÑO";
            xmasIcon.src = "/src/assets/img/Navidad.svg";
            xmasIcon.alt = "Evento NAVIDEÑO";
            bar.appendChild(xmasIconContainer);
            xmasIconContainer.appendChild(xmasIcon);
            break;
          case "Kids":
            let kidsIconContainer = document.createElement("figure");
            let kidsIcon = document.createElement("img");
            kidsIconContainer.title = "Evento INFANTIL";
            kidsIcon.src = "/src/assets/img/iconoKids.svg";
            kidsIcon.alt = "Evento INFANTIL";
            bar.appendChild(kidsIconContainer);
            kidsIconContainer.appendChild(kidsIcon);
            break;
          case "Play":
            let playIconContainer = document.createElement("figure");
            let playIcon = document.createElement("img");
            playIconContainer.title = "Evento LÚDICO";
            playIcon.src = "/src/assets/img/iconoPlay.svg";
            playIcon.alt = "Evento LÚDICO";
            bar.appendChild(playIconContainer);
            playIconContainer.appendChild(playIcon);
            break;
          case "Music":
            let musicIconContainer = document.createElement("figure");
            let musicIcon = document.createElement("img");
            musicIconContainer.title = "Evento MUSICAL";
            musicIcon.src = "/src/assets/img/iconoMusic.svg";
            musicIcon.alt = "Evento MUSICAL";
            bar.appendChild(musicIconContainer);
            musicIconContainer.appendChild(musicIcon);
            break;
          case "Sports":
            let sportIconContainer = document.createElement("figure");
            let sportIcon = document.createElement("img");
            sportIconContainer.title = "Evento DEPORTIVO";
            sportIcon.src = "/src/assets/img/iconoSports.png";
            sportIcon.alt = "Evento DEPORTIVO";
            bar.appendChild(sportIconContainer);
            sportIconContainer.appendChild(sportIcon);
            break;
          case "Theatre":
            let theatreIconContainer = document.createElement("figure");
            let theatreIcon = document.createElement("img");
            theatreIconContainer.title = "Evento TEATRAL";
            theatreIcon.src = "/src/assets/img/iconoTheatre.svg";
            theatreIcon.alt = "Evento TEATRAL";
            bar.appendChild(theatreIconContainer);
            theatreIconContainer.appendChild(theatreIcon);
            break;
          case "Party":
            let partyIconContainer = document.createElement("figure");
            let partyIcon = document.createElement("img");
            partyIconContainer.title = "Evento FESTIVO";
            partyIcon.src = "/src/assets/img/iconoParty.svg";
            partyIcon.alt = "Evento FESTIVO";
            bar.appendChild(partyIconContainer);
            partyIconContainer.appendChild(partyIcon);
            break;
          case "Food":
            let foodIconContainer = document.createElement("figure");
            let foodIcon = document.createElement("img");
            foodIconContainer.title = "Evento GASTRONÓMICO";
            foodIcon.src = "/src/assets/img/iconoFood.svg";
            foodIcon.alt = "Evento GASTRONÓMICO";
            bar.appendChild(foodIconContainer);
            foodIconContainer.appendChild(foodIcon);
            break;
          case "Museum":
            let museumIconContainer = document.createElement("figure");
            let museumIcon = document.createElement("img");
            museumIconContainer.title = "Evento de MUSEO";
            museumIcon.src = "/src/assets/img/iconoMuseum.svg";
            museumIcon.alt = "Evento de MUSEO";
            bar.appendChild(museumIconContainer);
            museumIconContainer.appendChild(museumIcon);
            break;
          // Pongo el default por si acaso UwU
          default:
            let defaultIconContainer = document.createElement("figure");
            let defaultIcon = document.createElement("img");
            defaultIconContainer.title = "Evento POR DEFECTO";
            defaultIcon.src = "/src/assets/img/xmark-solid.svg";
            defaultIcon.alt = "Evento POR DEFECTO";
            bar.appendChild(defaultIconContainer);
            defaultIconContainer.appendChild(defaultIcon);
            break;
        }
      }
    }
  }

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function dataModal(e){
  //La e selecciona el ID del evento y lo pasa a createModal para generar el modal.
  const idOfEvent = e.currentTarget.id;
  createModal(idOfEvent)
}
function createModal(id) {
  //QUITAR EL SCROLL DEL BODY
  const body = document.querySelector('body')
  body.classList.add("overflow-hidden")
  let dataEvent = allEvents.find((el) => el.id === id);
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
  closeButton.src = "src/assets/img/xmark-solid.svg";
  closeButton.alt = "Cerrar";
  modal.appendChild(closeButton);
  // FUNCIONALIDAD DEL MODAL
  closeButton.addEventListener("click", () => {
    modalBox.remove();
    body.classList.remove("overflow-hidden")

  });
  window.addEventListener("click", (e) => {
    if (e.target == modalBox) {
      modalBox.remove();
      body.classList.remove("overflow-hidden")
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

/* Función del slider de logos de patrocinadores
 * Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
 * */
const Sponsors = document.querySelectorAll(".container-img>img");

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

window.addEventListener("DOMContentLoaded", () => {
  createAll();
  responsiveFooter();
});

// BOTÓN PARA SUBIR AL INICIO DE LA WEB

document.getElementById("btn-up").addEventListener("click", scrollUp);

// Funcion que cuando hay scroll hace una animacion para subir al top
function scrollUp(){
  let currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0){
    window.requestAnimationFrame(scrollUp);
    window.scrollTo(0, currentScroll - (currentScroll / 8));
  }
}

// Funcion para que el btn-up no aparezca si no se ha hecho scroll
btnUp = document.getElementById("btn-up");

window.onscroll = function(){
  let scroll = document.documentElement.scrollTop;

  if (scroll > 500){
    btnUp.style.transform = "scale(1)";
  } else if(scroll < 500) {
    btnUp.style.transform= "scale(0)";
  }
}
