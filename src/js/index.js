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
