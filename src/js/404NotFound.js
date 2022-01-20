export function notFound() {
  const container = document.querySelector("main")
  container.classList.add("page-404")
  const page404 = /*html*/`
  <div class="not-found relative w-11/12 md:w-9/12 mx-auto pb-6 lg:w-96 lg:m-0 lg:px-14 xl:w-2/5">
  <p class="info-notFound text-center">No hemos encontrado el evento que buscabas</p>
  <img class="" src="./img/404NotFound/404-notFound.svg" alt="404 No hemos encontrado la página que buscabas">
  <img class="max-h-44 bottom-0 right-10 absolute " src="./img/404NotFound/Pato-404-zapatos.svg" alt="">
  </div>
  `
  container.insertAdjacentHTML("afterbegin", page404)
}
