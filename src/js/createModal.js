export function createPopUpModal() {
  //QUITAR EL SCROLL DEL BODY
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  const modalWindow = document.querySelector("main");
  // ZONA OSCURA
  let modalBox = document.createElement("div");
  modalBox.className = "modal-container";
  modalWindow.appendChild(modalBox);
  // VENTANA
  let modal = document.createElement("div");
  modal.className = "modal";
  modalBox.appendChild(modal);
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
// ESTA FUNCIÓN CREA CADA VENTANA MODAL
export function dataModal(e) {
  //La e selecciona el ID del evento y lo pasa a createModal para generar el modal.
  const idOfEvent = e.currentTarget.dataset.id;
  createEventModal(idOfEvent);
}
export function createEventModal(id) {
  createPopUpModal();
  const ContentModal = document.querySelector(".modal")
  const CloseButton = document.querySelector(".close")
  let dataEvent = currentListEvents.find((el) => el.id === id);
  // IMAGEN
  let fatherModalImagen = document.createElement("div");
  fatherModalImagen.className = "modal-image";
  let modalImage = document.createElement("img");
  modalImage.src = dataEvent.photoEvent;
  // añadimos la clase "landscape" al modal de imágenes apaisadas
  if (modalImage.naturalWidth > modalImage.naturalHeight) {
    fatherModalImagen.className = "modal-image landscape";
  }
  fatherModalImagen.appendChild(modalImage);
  ContentModal.insertBefore(fatherModalImagen, CloseButton);
  // ZONA DE TEXTO
  let modalText = document.createElement("div");
  modalText.className = "modal-text";
  ContentModal.insertBefore(modalText, CloseButton);
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
  //BOTÓN ADD CALENDAR
  let btnCalendar = document.createElement("a");
  btnCalendar.className = "btn-addCalendar py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
  btnCalendar.textContent = "Añadir al calendario";
  btnCalendar.target = "blank"
  btnCalendar.dataset.name = id;
  btnCalendar.addEventListener("click", requestCalendar);
  modalText.appendChild(btnCalendar);
}

export function createRegister(modalisOpen = false) {
  const CloseButton = document.querySelector(".close")
  if (modalisOpen) {
    const register = document.querySelector(".register-form")
    register.remove();
  }
  const Register = /*html*/`
  <div class= "register-form flex flex-col">
    <p>Empieza</p>
    <p>¿Ya tienes una cuenta creada?<a href="#" onclick ="createLogin(true)">Entra</a></p>
    <form class= "flex flex-col">
      <label for="name-person">Nombre</label>
      <input type="text" name="name-person" required>
      <label for="nickname">Nombre de Usuario</label>
      <input type="text" name="nickname" required>
      <label for="password">Contraseña</label>
      <input type="password" name="password" required>
      <label for="repeat-password">Repite la contraseña</label>
      <input type="password" name="repeat-password" required>
      <button>Crear Cuenta</button>
    </form>
    </div>
  `
  CloseButton.insertAdjacentHTML("beforebegin", Register)
}
export function createLogin(modalisOpen = false) {
  const CloseButton = document.querySelector(".close")
  if (modalisOpen) {
    const register = document.querySelector(".register-form")
    register.remove();
  }
  const LoginIn = /*html*/`
  <div class= "login-form flex flex-col">
    <p>Entra</p>
    <p>¿Aún no tienes cuenta?<a href="#" onclick ="createRegister(true)">Registrate aqui</a></p>
    <form class= "flex flex-col">
      <label for="nickname">Nombre de Usuario</label>
      <input type="text" name="nickname" required>
      <label for="password">Contraseña</label>
      <input type="password" name="password" required>
      <button>Login </button>
    </form>
  </div>
  `
  CloseButton.insertAdjacentHTML("beforebegin", LoginIn)
}
