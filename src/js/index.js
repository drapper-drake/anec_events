// createEvents crea las tarjetas de evento con los datos de eventosNavidad.json
function createEvents() {
  // fetch importa los datos del JSON
  // response.json los parsea y almacena en data
  fetch("src/js/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const contenido = document.querySelector(".container");
      for (let evento = 0; evento < data.length; evento++) {
        // TARJETA
        let box = document.createElement("div");
        box.className = "card";
        // IMAGEN
        let image = document.createElement("img");
        image.src = data[evento].photoEvent;
        // NOMBRE
        let name = document.createElement("h4");
        name.innerText = data[evento].nameEvent;
        // LUGAR
        let place = document.createElement("p");
        place.innerText = data[evento].site;
        // FECHA
        let date = document.createElement("p");
        date.innerText = data[evento].dateStart;
        contenido.appendChild(box);
        box.appendChild(image);
        box.appendChild(name);
        box.appendChild(place);
        box.appendChild(date);
      }
    });
}

/* Función del slider de logos de patrocinadores
* Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
* */
const Sponsors = document.querySelectorAll('.container-img>img');

const SrcImg = ["./src/assets/img/gobesp.png", "./src/assets/img/logoEoi.svg", "./src/assets/img/ue.png", "./src/assets/img/fundonce.png", "./src/assets/img/garjuv.png"];
const FirstSponsor =  Sponsors[0]
// IMPROVE Take out the dependencies of all functions and also use parameters
function hideImg(){
  //Le añado a todas una clase que las oculta
  Sponsors.forEach((img) => img.classList.add('hidden'));
  //Al first child le quito la clase hidden
  FirstSponsor.classList.remove('hidden');
}
let i = 0;
function changeSrcImg(){
  FirstSponsor.src = SrcImg[i];
  i = ( i < SrcImg.length - 1) ? i+1 :0
}
function responsiveFooter(){
  if(window.innerWidth <= 768){
    hideImg();
    setInterval(changeSrcImg,3000);
  }else{
    i = 0;
    FirstSponsor.src = SrcImg[i];
    clearInterval(changeSrcImg);
    Sponsors.forEach((img) => img.classList.remove('hidden'));
  }
}

// La ventana tiene un evento cuando carga y otro por si se redimensiona
window.addEventListener('resize',responsiveFooter)
window.addEventListener('DOMContentLoaded', () =>{
  createEvents();
  responsiveFooter();
})
