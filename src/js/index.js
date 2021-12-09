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
        // TARJETA
        let box = document.createElement("div");
        box.className = "card";
        // IMAGEN
        let image = document.createElement("img");
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
        date.innerText = data[evento].dateStart;
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
          payIcon.alt = "Evento GRATUITO";
          bar.appendChild(payIconContainer);
          payIconContainer.appendChild(payIcon);
        }
      }
    });
}

/* Función del slider de logos de patrocinadores
* Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
* */
const Sponsors = document.querySelectorAll('.container-img>img');

const SrcImgLogoFooter = ["./src/assets/img/gobesp.png", "./src/assets/img/logoEoi.svg", "./src/assets/img/ue.png", "./src/assets/img/fundonce.png", "./src/assets/img/garjuv.png"];
const FirstSponsor =  Sponsors[0]
function hideImg(){
  //Le añado a todas una clase que las oculta
  Sponsors.forEach((img) => img.classList.add('hidden'));
  /* Al primer img le quito la clase hidden porque necesito uno
  * visible para poder ir cambiando el src */
  FirstSponsor.classList.remove('hidden');
}
let index = 0;
function nextSliderImg(imgToChange,listOfSrc){
  //Aqui se va cambiando el src del primer img según la variable global index
  imgToChange.src = listOfSrc[index];
  if (index < listOfSrc.length - 1){
    index++;
  }else{
    index = 0;
  }
}

function responsiveFooter(){
  if(window.innerWidth <= 768){
    hideImg();
    setInterval(nextSliderImg(FirstSponsor,SrcImgLogoFooter),3000);
  }
}

window.addEventListener('DOMContentLoaded', () =>{
  createEvents();
  responsiveFooter();
})
