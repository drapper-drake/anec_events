// ESTA FUNCIÓN IMPORTA DATOS DEL JSON Y LLAMA AL RESTO DE FUNCIONES
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");
      const modalWindow = document.querySelector(".modal-parent");
      for (let evento in data) {
        createEvent(data[evento], content);
        createModal(data[evento], modalWindow, evento);
      }
    });
}

// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(evento, container) {
  //Convertir string en número (fecha)
  let convertDateStart = new Date(evento.dateStart);
  let convertDateFinal = new Date(evento.dateFinal);
  //Llamar función que imprime la fecha en el orden deseado
  let dateStart = dateFormat(convertDateStart);
  let dateFinal = dateFormat(convertDateFinal);
  let containerCard = document.createElement("div");
  containerCard.className = "container-card";
  //DIV DE LA IMAGEN
  let photoEvent = document.createElement("div");
  photoEvent.className = "photoEvent";
  //IMAGEN
  let image = document.createElement("img");
  image.src = evento.photoEvent;
  image.className = "cta";
  //TARJETA
  let card = document.createElement("div");
  card.className = "card";
  // BARRA DE ICONOS
  let bar = document.createElement("div");
  bar.className = "icons-bar";
  // NOMBRE
  let name = document.createElement("h3");
  name.innerText = evento.nameEvent;
  // LUGAR
  let place = document.createElement("p");
  place.innerText = evento.site;
  // FECHA
  let date = document.createElement("p");
  date.innerText = dateStart;
  container.appendChild(containerCard);
  containerCard.appendChild(photoEvent);
  photoEvent.appendChild(image);
  containerCard.appendChild(card);
  card.appendChild(bar);
  card.appendChild(name);
  card.appendChild(place);
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
}

// ESTA FUNCIÓN CREA CADA VENTANA MODAL
function createModal(evento, container, position) {
  let convertDateStart = new Date(evento.dateStart);
  let convertDateFinal = new Date(evento.dateFinal);
  let dateStart = dateFormat(convertDateStart);
  let dateFinal = dateFormat(convertDateFinal);
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container hidden";
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  // IMAGEN
  let modalImage = document.createElement("img");
  modalImage.className = "modal-image";
  modalImage.src = evento.photoEvent;
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  // NOMBRE
  let modalName = document.createElement("p");
  modalName.innerText = evento.nameEvent;
  // LUGAR
  let modalPlace = document.createElement("p");
  modalPlace.innerText = evento.site;
  // FECHA
  let modalDate = document.createElement("p");
  modalDate.innerText = dateStart;
  // DESCRIPCIÓN
  let description = document.createElement("p");
  description.innerText = evento.comments;
  // BOTÓN DE CIERRE
  let closeButton = document.createElement("img");
  closeButton.className = "close";
  closeButton.src = "src/assets/img/xmark-solid.svg";
  closeButton.alt = "Cerrar";
  container.appendChild(modalBox);
  modalBox.appendChild(modal);
  modal.appendChild(modalImage);
  modal.appendChild(modalText);
  modalText.appendChild(modalName);
  modalText.appendChild(modalPlace);
  modalText.appendChild(modalDate);
  modalText.appendChild(description);
  modal.appendChild(closeButton);
  // FUNCIONALIDAD DEL MODAL
  let closeModal = document.querySelectorAll(".close")[position];
  let openModal = document.querySelectorAll(".cta")[position];
  let modalContainer = document.querySelectorAll(".modal-container")[position];
  openModal.addEventListener("click", () => {
    modalContainer.classList.toggle("hidden");
  });
  closeModal.addEventListener("click", () => {
    modalContainer.classList.toggle("hidden");
  });
  window.addEventListener("click", (e) => {
    if (e.target == modalContainer) {
      modalContainer.classList.toggle("hidden");
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

  const listEvent = document.querySelectorAll('.liEvent')

  listEvent.forEach(li => {
    console.log(li.classList)


    li.addEventListener("click", () => {
      listEvent.forEach(li => {
        li.classList.remove("nav-select")

      })
      li.classList.add('nav-select')
    })

  })



window.addEventListener("DOMContentLoaded", () => {
  createAll();
  responsiveFooter();
});

