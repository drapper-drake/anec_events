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

export function createRegister(modalisOpen = false) {
  const CloseButton = document.querySelector(".close")
  if (modalisOpen) {
    const register = document.querySelector(".register-form")
    register.remove();
  }
  const btnCta = "sign-in  md:block h-16 md:h-12 text-bg-dark-80 md:text-bg-dark font-sans text-lg md:bg-contrast-bg-dark md:border-solid md:rounded-2xl p-2.5 cursor-pointer md:duration-700 md:hover:bg-light md:hover:border-contrast-bg-light md:hover:text-contrast-bg-light"
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
      <button class="${btnCta}"  onclick="submit()">Crear Cuenta</button>
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
