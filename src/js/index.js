const allArray = [];

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
        allArray.push(data[evento]);
      }
      changeformatDateJSON(data);
      allArray.sort((a,b) => a.dateStart - b.dateStart)
      createEvent( content, allArray);
    });
  }
function changeformatDateJSON (){
  for (let index in allArray) {
    allArray[index].dateStart = new Date(allArray[index].dateStart);
    if(allArray[index].hasOwnProperty("dateFinal")){
    allArray[index].dateFinal = new Date(allArray[index].dateFinal);
    }
  }
}
  // ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
  function createEvent( container ) {
    for(let position in allArray ){
      //Llamar función que imprime la fecha en el orden deseado
      let dateStart = dateFormat(allArray[position].dateStart, true);
      let containerCard = document.createElement("div");
      containerCard.className = "container-card";

      //DIV DE LA IMAGEN
      let photoEvent = document.createElement("div");
      photoEvent.className = "photoEvent";
      //IMAGEN
      let image = document.createElement("img");
      image.src = allArray[position].photoEvent;
      //TARJETA
      let card = document.createElement("div");
      card.className = "card";
      card.id = allArray[position].id
      // AÑADE EL EVENTO A LA TARJETA
      card.addEventListener("click", dataModal);

      //DATOS TARJETA
      let infoCard = document.createElement("div");
      infoCard.className = "info-card";
      // NOMBRE
      let name = document.createElement("h3");
      name.innerText = allArray[position].nameEvent;
      // LUGAR
      let place = document.createElement("p");
      place.innerText = allArray[position].cityLocation;
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

      if(allArray[position].hasOwnProperty("dateFinal")){
        let dateF = dateFormat(allArray[position].dateFinal,true );
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

      if (allArray[position].free) {
        freeIconContainer.title = "Evento GRATUITO";
        freeIcon.src = "/src/assets/img/free.png";
        freeIcon.alt = "Evento GRATUITO";
      } else {
        freeIconContainer.title = "Evento DE PAGO";
        freeIcon.src = "/src/assets/img/pago.svg";
        freeIcon.alt = "Evento DE PAGO";
      }
      // ICONO RURAL
      if(allArray[position].village) {
        let ruralIconContainer = document.createElement("figure");
        let ruralIcon = document.createElement("img");
        ruralIconContainer.title = "Evento RURAL";
        ruralIcon.src = "/src/assets/img/patoOriginal.png";
        ruralIcon.alt = "Evento RURAL";
        bar.appendChild(ruralIconContainer);
        ruralIconContainer.appendChild(ruralIcon);
      }
      // ICONOS DE CATEGORÍAS
      for(let cat in allArray[position].category) {
        switch(allArray[position].category[cat]) {
          case "Christmas":
            let xmasIconContainer = document.createElement("figure");
            let xmasIcon = document.createElement("img");
            xmasIconContainer.title = "Evento NAVIDEÑO";
            xmasIcon.src = "/src/assets/img/patoNavidad.png";
            xmasIcon.alt = "Evento NAVIDEÑO";
            bar.appendChild(xmasIconContainer);
            xmasIconContainer.appendChild(xmasIcon);
            break;
          case "Kids":
            let kidsIconContainer = document.createElement("figure");
            let kidsIcon = document.createElement("img");
            kidsIconContainer.title = "Evento INFANTIL";
            kidsIcon.src = "/src/assets/img/xmark-solid.svg";
            kidsIcon.alt = "Evento INFANTIL";
            bar.appendChild(kidsIconContainer);
            kidsIconContainer.appendChild(kidsIcon);
            break;
          case "Play":
            let playIconContainer = document.createElement("figure");
            let playIcon = document.createElement("img");
            playIconContainer.title = "Evento LÚDICO";
            playIcon.src = "/src/assets/img/xmark-solid.svg";
            playIcon.alt = "Evento LÚDICO";
            bar.appendChild(playIconContainer);
            playIconContainer.appendChild(playIcon);
            break;
          case "Music":
            let musicIconContainer = document.createElement("figure");
            let musicIcon = document.createElement("img");
            musicIconContainer.title = "Evento MUSICAL";
            musicIcon.src = "/src/assets/img/xmark-solid.svg";
            musicIcon.alt = "Evento MUSICAL";
            bar.appendChild(musicIconContainer);
            musicIconContainer.appendChild(musicIcon);
            break;
          case "Sports":
            let sportIconContainer = document.createElement("figure");
            let sportIcon = document.createElement("img");
            sportIconContainer.title = "Evento DEPORTIVO";
            sportIcon.src = "/src/assets/img/xmark-solid.svg";
            sportIcon.alt = "Evento DEPORTIVO";
            bar.appendChild(sportIconContainer);
            sportIconContainer.appendChild(sportIcon);
            break;
          case "Theatre":
            let theatreIconContainer = document.createElement("figure");
            let theatreIcon = document.createElement("img");
            theatreIconContainer.title = "Evento TEATRAL";
            theatreIcon.src = "/src/assets/img/xmark-solid.svg";
            theatreIcon.alt = "Evento TEATRAL";
            bar.appendChild(theatreIconContainer);
            theatreIconContainer.appendChild(theatreIcon);
            break;
          case "Party":
            let partyIconContainer = document.createElement("figure");
            let partyIcon = document.createElement("img");
            partyIconContainer.title = "Evento FESTIVO";
            partyIcon.src = "/src/assets/img/xmark-solid.svg";
            partyIcon.alt = "Evento FESTIVO";
            bar.appendChild(partyIconContainer);
            partyIconContainer.appendChild(partyIcon);
            break;
          case "Food":
            let foodIconContainer = document.createElement("figure");
            let foodIcon = document.createElement("img");
            foodIconContainer.title = "Evento GASTRONÓMICO";
            foodIcon.src = "/src/assets/img/xmark-solid.svg";
            foodIcon.alt = "Evento GASTRONÓMICO";
            bar.appendChild(foodIconContainer);
            foodIconContainer.appendChild(foodIcon);
            break;
          case "Museum":
            let museumIconContainer = document.createElement("figure");
            let museumIcon = document.createElement("img");
            museumIconContainer.title = "Evento de MUSEO";
            museumIcon.src = "/src/assets/img/xmark-solid.svg";
            museumIcon.alt = "Evento de MUSEO";
            bar.appendChild(museumIconContainer);
            museumIconContainer.appendChild(museumIcon);
            break;
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
  let dataEvent = allArray.find((el) => el.id === id);
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
  let modalImage = document.createElement("img");
  modalImage.className = "modal-image";
  modalImage.src = dataEvent.photoEvent;
  modal.appendChild(modalImage);
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
    description.innerText = dataEvent.comments;
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

  });
  window.addEventListener("click", (e) => {
    if (e.target == modalBox) {
      modalBox.remove();
    }
  });
}
function removeModalBox(){
  modalBox.remove();
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
