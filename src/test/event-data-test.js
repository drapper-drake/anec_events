const event = {
  "nameEvent": "Evento Correcto",
  "free": false,
  "price": 75.40,
  "site": "Plaza Portal de Elche, 03001 Alicante.",
  "cityLocation": "Alicante",
  "village": false,
  "hoursOpen": "17:00",
  "dateStart": "2022/02/12",
  "dateFinal": "2022/02/26",
  "category": [
    "Museum"
  ],
  "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
  "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
  "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
}
const eventWrong = {
  "nameEvent": 2,
  "free": false,
  "price": true,
  "site": "Plaza Portal de Elche, 03001 Alicante.",
  "cityLocation": "Alicante",
  "village": false,
  "hoursOpen": "17:00",
  "dateStart": "2021/12/17",
  "dateFinal": "2022/2/26",

  "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
  "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
  "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
}
const eventWrongDate = {
  "nameEvent": "Ruta de museos con aperitivo",
  "free": false,
  "price": 75.40,
  "site": "Plaza Portal de Elche, 03001 Alicante.",
  "cityLocation": "Alicante",
  "village": false,
  "hoursOpen": "17:00",
  "category":
    "Museum"
  ,
  "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
  "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
  "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
}
const eventInRangeDate = {
  "nameEvent": "Evento en Rango de Fechas",
  "free": false,
  "price": 75.40,
  "site": "Plaza Portal de Elche, 03001 Alicante.",
  "cityLocation": "Alicante",
  "village": false,
  "hoursOpen": "17:00",
  "dateStart": "2021/12/17",
  "dateFinal": "2022/02/26",
  "category": [
    "Museum"
  ],
  "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
  "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
  "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
}
const eventOutDate = {
  "nameEvent": "Evento en Rango de Fechas",
  "free": false,
  "price": 75.40,
  "site": "Plaza Portal de Elche, 03001 Alicante.",
  "cityLocation": "Alicante",
  "village": false,
  "hoursOpen": "17:00",
  "dateStart": "2021/12/01",
  "dateFinal": "2022/01/01",
  "category": [
    "Museum"
  ],
  "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
  "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
  "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
}
module.exports = {
  event, eventWrong, eventWrongDate, eventOutDate, eventInRangeDate
}
