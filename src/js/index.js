// createEvents crea las tarjetas de evento con los datos de eventosNavidad.json
function createEvents() {
  // fetch importa los datos del JSON
  // response.json los parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container");

      for (let evento = 0; evento < data.length; evento++) {
        //Convertir string en número (fecha)
        let convertDateStart = new Date(data[evento].dateStart);
        let convertDateFinal = new Date(data[evento].dateFinal);

        //Llamar función que imprime la fecha en el orden deseado
        let dateStart = dateFormat(convertDateStart);
        let dateFinal = dateFormat(convertDateFinal);

        // TARJETA
        let box = document.createElement("div");
        box.className = "card";
        // IMAGEN
        let image = document.createElement("img");
        image.className = "cta"; // para el modal
        image.src = data[evento].photoEvent;
        // BARRA DE ICONOS
        let bar = document.createElement("div");
        bar.className = "icons-bar";
        // NOMBRE
        let name = document.createElement("h4");
        name.innerText = data[evento].nameEvent;
        // LUGAR
        let place = document.createElement("p");
        place.innerText = data[evento].site;
        // FECHA
        let date = document.createElement("p");
        date.innerText = dateStart;
        content.appendChild(box);
        box.appendChild(image);
        box.appendChild(bar);
        box.appendChild(name);
        box.appendChild(place);
        box.appendChild(date);
        // ICONOS
        if (data[evento].free) {
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

/* createModals crea las ventanas modales para cada evento
e implementa las funciones de apertura/cierre de las ventanas */
function createModals() {
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      const modalWindows = document.querySelector(".modal-parent");
      for (let evento = 0; evento < data.length; evento++) {
        let convertDateStart = new Date(data[evento].dateStart);
        let convertDateFinal = new Date(data[evento].dateFinal);
        let dateStart = dateFormat(convertDateStart);
        let dateFinal = dateFormat(convertDateFinal);
        // VENTANA MODAL
        let modalBox = document.createElement("div");
        modalBox.className = "modal-container";
        let modal = document.createElement("div");
        modal.className = "modal";
        let modalName = document.createElement("h4");
        modalName.innerText = data[evento].nameEvent;
        let modalPlace = document.createElement("p");
        modalPlace.innerText = data[evento].site;
        let modalDate = document.createElement("p");
        modalDate.innerText = dateStart;
        let description = document.createElement("p");
        description.innerText = data[evento].comments;
        let closeButton = document.createElement("button");
        closeButton.className = "close";
        closeButton.innerText = "Cerrar";
        modalWindows.appendChild(modalBox);
        modalBox.appendChild(modal);
        modal.appendChild(modalName);
        modal.appendChild(modalPlace);
        modal.appendChild(modalDate);
        modal.appendChild(description);
        modal.appendChild(closeButton);
        // FUNCIONALIDAD DEL MODAL
        let closeModal = document.querySelectorAll(".close")[evento];
        let openModal = document.querySelectorAll(".cta")[evento];
        let modalContainer =
          document.querySelectorAll(".modal-container")[evento];
        openModal.addEventListener("click", () => {
          modalContainer.style.opacity = "1";
          modalContainer.style.visibility = "visible";
        });
        closeModal.addEventListener("click", () => {
          modalContainer.style.opacity = "0";
          modalContainer.style.visibility = "hidden";
        });
        window.addEventListener("click", (e) => {
          if (e.target == modalContainer) {
            modalContainer.style.opacity = "0";
            modalContainer.style.visibility = "hidden";
          }
        });
      }
    });
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
  createEvents();
  createModals();
  responsiveFooter();
});
