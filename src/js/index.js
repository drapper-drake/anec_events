function createEvents() {
  const request = fetch("src/js/eventosNavidad.json")
    .then((response) => response.text())
    .then((data) => {
      const json = JSON.parse(data);
      const contenido = document.querySelector(".container");
      for (let evento = 0; evento < json.length; evento++) {
        let box = document.createElement("div");
        box.className = "card";
        let image = document.createElement("img");
        image.src = json[evento].photoEvent;
        let name = document.createElement("h4");
        name.innerText = json[evento].nameEvent;
        let place = document.createElement("p");
        place.innerText = json[evento].site;
        let date = document.createElement("p");
        date.innerText = json[evento].dateStart;
        contenido.appendChild(box);
        box.appendChild(image);
        box.appendChild(name);
        box.appendChild(place);
        box.appendChild(date);
      }
    });
}
