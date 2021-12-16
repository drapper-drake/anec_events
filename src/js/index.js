// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      for (let evento in data) {
        createEvent(data[evento], content, evento);
      }
    });
}

// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(evento, container, position) {
  //Convertir string en número (fecha)
  let convertDateStart = new Date(evento.dateStart);
  let convertDateFinal = new Date(evento.dateFinal);
  //Llamar función que imprime la fecha en el orden deseado
  let dateStart = dateFormat(convertDateStart);
  let dateFinal = dateFormat(convertDateFinal);
  let containerCard = document.createElement("div");
  containerCard.className = "container-card";
  container.appendChild(containerCard);
  //DIV DE LA IMAGEN
  let photoEvent = document.createElement("div");
  photoEvent.className = "photoEvent";
  containerCard.appendChild(photoEvent);
  //IMAGEN
  let image = document.createElement("img");
  image.src = evento.photoEvent;
  image.className = "cta";
  photoEvent.appendChild(image);
  //TARJETA
  let card = document.createElement("div");
  card.className = "card";
  containerCard.appendChild(card);
  // BARRA DE ICONOS
  let bar = document.createElement("div");
  bar.className = "icons-bar";
  card.appendChild(bar);
  // NOMBRE
  let name = document.createElement("h3");
  name.innerText = evento.nameEvent;
  card.appendChild(name);
  // LUGAR
  let place = document.createElement("p");
  place.innerText = evento.site;
  card.appendChild(place);
  // FECHA
  let date = document.createElement("p");
  date.innerText = dateStart;
  card.appendChild(date);
  // ICONOS
  if (evento.free) {
    let freeIconContainer = document.createElement("figure");
    freeIconContainer.title = "Evento GRATUITO";
    let freeIcon = document.createElement("img");
    freeIcon.src = "/src/assets/img/free.png";
    freeIcon.alt = "Evento GRATUITO";
    bar.appendChild(freeIconContainer);
    freeIconContainer.appendChild(freeIcon);
  } else {
    let payIconContainer = document.createElement("figure");
    payIconContainer.title = "Evento DE PAGO";
    let payIcon = document.createElement("img");
    payIcon.src = "/src/assets/img/pago.svg";
    payIcon.alt = "Evento DE PAGO";
    bar.appendChild(payIconContainer);
    payIconContainer.appendChild(payIcon);
  }
  // ABRIR VENTANA MODAL
  const modalWindow = document.querySelector(".modal-parent");
  let openModal = document.querySelectorAll(".cta")[position];
  openModal.addEventListener("click", () => {
    createModal(
      dateStart,
      dateFinal,
      evento.photoEvent,
      evento.nameEvent,
      evento.site,
      evento.comments,
      modalWindow
    );
  });
}

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function createModal(
  dateStart,
  dateFinal,
  photoEvent,
  nameEvent,
  site,
  comments,
  container
) {
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container";
  container.appendChild(modalBox);
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  modalBox.appendChild(modal);
  // IMAGEN
  let modalImage = document.createElement("img");
  modalImage.className = "modal-image";
  modalImage.src = photoEvent;
  modal.appendChild(modalImage);
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  modal.appendChild(modalText);
  // NOMBRE
  let modalName = document.createElement("p");
  modalName.innerText = nameEvent;
  modalText.appendChild(modalName);
  // LUGAR
  let modalPlace = document.createElement("p");
  modalPlace.innerText = site;
  modalText.appendChild(modalPlace);
  // FECHA
  let modalDate = document.createElement("p");
  modalDate.innerText = dateStart;
  modalText.appendChild(modalDate);
  // DESCRIPCIÓN
  if (comments) {
    let description = document.createElement("p");
    description.innerText = comments;
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

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month) {
  const monthShortNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return (
    month.getDate() +
    " " +
    monthShortNames[month.getMonth()] +
    ", " +
    month.getFullYear()
  );
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
