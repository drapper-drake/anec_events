const faceDuck = document.querySelector("header div")

faceDuck.addEventListener("click", refreshPage)
function refreshPage() {
  window.location.href = "/"
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

