export function notFound(is404 = true) {
  const container = document.querySelector("main")
  const SRC_IMG_OVNI = "./img/404NotFound/404-notFound.svg"
  const text = [
    `Has <strong class="text-contrast-bg-dark ">pati</strong>nado`, `No damos a basto <strong class="text-contrast-bg-dark ">pa tó</strong>`, `Estamos <strong class="text-contrast-bg-dark ">pati</strong>difusos`, `Parece que hoy no hay eventos <strong class="text-contrast-bg-dark ">pa' to</strong>dos`]
  container.classList.add("page-404")
  const randomNumber = () => Math.trunc(Math.random() * text.length);
  const page404 = /*html*/`
  <div class="not-found relative w-11/12 md:w-9/12 mx-auto pb-6 lg:w-96 lg:m-0 lg:px-14 xl:w-2/5">
  <p class="info-notFound text-center">${text[randomNumber()]}</p>
  <img class="" src=${SRC_IMG_OVNI} alt="404 No hemos encontrado la página que buscabas">
  <img class="max-h-44 bottom-0 right-10 absolute " src="./img/404NotFound/Pato-404-zapatos.svg" alt="">
  </div>
  `
  container.insertAdjacentHTML("afterbegin", page404)
}
export function clearMain() {
  const main = document.querySelector("main")
  if (main.classList.contains("page-404")) {
    main.classList.remove("page-404")
    document.querySelector(".not-found").remove()
  }
}
