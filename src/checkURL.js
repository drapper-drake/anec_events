export default function checkURL(evento) {
    fetch(evento)
      .then((data) => {
        console.log(data, 'Imagen disponible')
        return true
      })
      .catch(error => {
        console.log(error, 'Error grande')
        return false
      })
};
