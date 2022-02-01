# Desarrollo Datos de Eventos
- [Desarrollo Datos de Eventos](#desarrollo-datos-de-eventos)
  - [¿Dónde guardar los datos de eventos?](#dónde-guardar-los-datos-de-eventos)
  - [¿Qué estructura/formato deben tener los datos?](#qué-estructuraformato-deben-tener-los-datos)
  - [¿Qué datos y qué nombre tienen los datos que se necesitan para mostrar un evento?](#qué-datos-y-qué-nombre-tienen-los-datos-que-se-necesitan-para-mostrar-un-evento)
- [¿Cómo se meten los datos?](#cómo-se-meten-los-datos)
  - [¿Qué problemas puede acarrear esta forma de hacerlo?](#qué-problemas-puede-acarrear-esta-forma-de-hacerlo)
- [¿Cómo resolver los problemas?](#cómo-resolver-los-problemas)
  - [1. No hay una subida automática de los eventos.](#1-no-hay-una-subida-automática-de-los-eventos)
  - [2. No tienen ID único.](#2-no-tienen-id-único)
  - [3. El formato no sea el correcto por una errata.](#3-el-formato-no-sea-el-correcto-por-una-errata)
  - [4. La datos no están ordenados cronológicamente](#4-la-datos-no-están-ordenados-cronológicamente)
  - [5. Los eventos que duran todo el año ocupan las primeras páginas.](#5-los-eventos-que-duran-todo-el-año-ocupan-las-primeras-páginas)
  - [6. Eventos caducados](#6-eventos-caducados)
  - [7. No viene la propiedad de favoritos.](#7-no-viene-la-propiedad-de-favoritos)
    - [¿Cómo guardar el valor de favoritos ya no va asociado a un usuario y escribirlo a mano no tiene ningún valor?](#cómo-guardar-el-valor-de-favoritos-ya-no-va-asociado-a-un-usuario-y-escribirlo-a-mano-no-tiene-ningún-valor)
    - [¿De qué manera guardar los datos del eventos seleccionado como favorito en el *LocalStorage*?](#de-qué-manera-guardar-los-datos-del-eventos-seleccionado-como-favorito-en-el-localstorage)
    - [¿Cómo cargar los favoritos que se encuentran en el  *LocalStorage*?](#cómo-cargar-los-favoritos-que-se-encuentran-en-el--localstorage)
    - [¿Cómo hacer que los favoritos estén seleccionados cuando cargas el evento?](#cómo-hacer-que-los-favoritos-estén-seleccionados-cuando-cargas-el-evento)
  - [8. Comprobar qué todo ha ido como se esperaba](#8-comprobar-qué-todo-ha-ido-como-se-esperaba)


## ¿Dónde guardar los datos de eventos?

En un archivo JSON, simulando la respuesta de un servidor externo. Y desde el código del lado del cliente hacer una llamada buscando dicho archivo para poder incorporarlo a la página web, que sería similar a pedirle a un Servidor los datos de los eventos.
## ¿Qué estructura/formato deben tener los datos?
Deben seguir el formato JSON y al ser un conjunto de eventos tiene que venir listado con un array todo el archivo. Dentro de este se tiene que seguir el siguiente formato según la necesidad de los datos a implementar.
```Json
[
  {
    "dataString": "Información del tipo String",
    "dataBoolean": false,
    "dataNumber": 75.40,
    "dataDate": {
      "A decidir cualquiera de los siguientes formatos":{
        "Opción 1": "AAAA/MM/DD",
        "Opción 2": "AAAA/MM/DD 00:00:00",
        "Opción 3": "AAAA/MM/DD 00:00:00 GMT+0100",
      }
    },
    "dataArray": [ "Información 1","Información 2" ],
    "dataURL": "https://dominio-fuente-del-evento.com",
  },
  {"..."},
  {"..."},
  {"..."},
]
```
## ¿Qué datos y qué nombre tienen los datos que se necesitan para mostrar un evento?

```Javascript
const FORMAT_EVENT_JSON=
  {
    //Nombre del evento
    "nameEvent": {
      type: String,
      required: true
    },
    //Modalidad de pago del evento
    "free": {
      type: Boolean,
      required: true
    },
    //Precio del evento
    "price": {
      type: Boolean,
      required: false, //Creo que no todos los eventos quede pago lo tienen.
    },
    //Ubicación donde acontece el evento
    "site": {
      type: String,
      required: true,
    },
    //Localización-ciudad-pueblo donde acontece el evento
    "cityLocation": {
      type: String,
      required: true,
    },
    //Si es un pueblo o no lo es
    "village": {
      type: Boolean,
      required: false, //Actualmente no se esta utilizando
    },
    //Si es indefinido o temporal
    "isTemporal": { // ! No se ha incorporado aún
      type: Date,
      format: "AAAA/MM/DD",
      required: true,
    },
     //Qué día empieza el evento o si es solo un día
    "dateStart": {
      type: Date,
      format: "AAAA/MM/DD",
      required: this.isTemporal ? true : false,
    },
     //Qué día termina el evento
    "dateFinal": {
      type: Date,
      format: "AAAA/MM/DD",
      required: false,
    },
    "hoursOpen": { //Quizás sería mejor incluirlo en la fecha del principio
      type: Date,//No se si es formato date
      format: "00:00",
      required: false,
    },
    "hoursClose": { //Quizás sería mejor incluirlo en la fecha del principio
      type: Date,//No se si es formato date
      format: "00:00",
      required: false,
    },
      //Comentarios sobre el evento
    "comments": {
      type: String,
      required: false,
    },
     //Listado de categorias del evento
    "category": {
      type: Array,
      required: true,
    },
     //URL de la imagen del evento -
    "photoEvent": {
      type: String,
      required: true,// Pero si no viene que se ponga una Default dependiendo de la primera posición del array
      default: IMG_DEFAULT["category"[0]]
    },
     //URL de la información del evento
    "linkEvent": {
      type: String,
      required: false
    },
//OTROS DATOS AÑADIDOS QUE NO SE UTILIZAN
 //URL de la información del evento
    "companyT": {
      type: String,
      required: false
    },
    "cast": {
      type: String,
      required: false
    },
    "atributionsPhoto": {
      type: String,
      required: false
    },
    "atributionsLink": {
      type: String,
      required: false
    }
  }
```
```Javascript
const IMG_DEFAULT = {
"sports":"URL",
"sports":"URL",
"sports":"URL",
"sports":"URL",
"sports":"URL",
"sports":"URL",
"sports":"URL"
}
```

# ¿Cómo se meten los datos?
Se introducen los datos a mano, según los eventos que se encuentren en una búsqueda en Google.
## ¿Qué problemas puede acarrear esta forma de hacerlo?
1. No hay una subida automática de los eventos.
2. No tienen ID único
3. El formato no sea el correcto por una errata.
4. Los datos no están colocados por orden cronológico.
5. Los eventos que duran todo el año ocupan las primeras páginas.
6. Llegan eventos caducados ya que se tiene que revisar a mano.
7. No viene la propiedad de favoritos ya que no puede estar asociado a un usuario,sino que es general.

# ¿Cómo resolver los problemas?

## 1. No hay una subida automática de los eventos.
No hay una solución posible mediante la programación en el plazo dado para la elaboración del proyecto.
Para resolver esta necesidad, los 5 integrantes del equipo tienen que introducir semanalmente 5 eventos para poder aumentar la base de datos.
## 2. No tienen ID único.
Al escribir los eventos, no se puede inventarse un ID único para cada evento ya que hay 5 personas diferentes y no hay nada que asegure que ese evento sea único.
Por lo que hay diferentes formas de resolver este problema:
- ID se ve de cara al usuario se podría hacer:
```Javascript
// DATOS INTRODUCIDOS EN JAVASCRIPT FRONT-END
    FORMAT_EVENT_JSON."id"={
      type: String,
      required: true,
      default: event.nameEvent.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }
```
Lo que hace el código sería:
```
("Recorrido en bicicleta")  -->  ("recorrido-en-bicicleta")
("L'Alcúdia 25 años")       -->  ("lalcdia-25-aos")
```
- ID no se ve de cara al público:

 1. No se sabe que ID puede salir y siempre es diferente.

```javascript
  const makeRandomID = (length, dict='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') =>
   Array.from({length}, _=>dict[~~(Math.random()*dict.length)]).join('')

   FORMAT_EVENT_JSON."id"={
      type: String,
      required: true,
      default: makeRandomID(5) //El número es el largo que queremos para ID único.
      //Return No se puede preveer el ID que genera ~~Por ejemplo:'57dkY'.
    }
```
  2. ID único en base al nombre del evento de manera no legible.

```javascript
    FORMAT_EVENT_JSON."id"= {
      type: Boolean,
      required: true,
      default: btoa(event.id)
    }

```
```
("Recorrido en bicicleta")  -->  ("UmVjb3JyaWRvIGVuIGJpY2ljbGV0YQ==")
("L'Alcúdia 25 años")       -->  ("TCdBbGP6ZGlhIDI1IGHxb3M=")
```
## 3. El formato no sea el correcto por una errata.
Hay que comprobar que hayan los datos necesarios según la estructura de datos.
Solo se pueden comprobar datos y arreglar el formato siempre que no sea poner dentro de un *String* otras comillas dobles, que provocaría un ERROR en el *JSON*.
```
const event ={
    "nameEvent": "Ruta de museos con aperitivo",
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
const eventWrong ={
    "nameEvent": 2,
    "free": false,
    "price": 75.40,
    "site": "Plaza Portal de Elche, 03001 Alicante.",
    "cityLocation": "Alicante",
    "village": false,
    "hoursOpen": "17:00",
    "dateStart": "2021/12/17",
    "dateFinal": "2022/02/26",

    "comments": "Pasa una tarde memorable explorando Alicante y disfruta de un aperitivo comentando lo aprendido. Visitarás el Museo de Hogueras, el MACA y el MARQ.",
    "photoEvent": "https://cdn.atrapalo.com/common/photo/event/4/8/4/9816/1139472/vertic_372_270.jpg",
    "linkTickets": "https://www.atrapalo.com/actividades/alicante-a-traves-de-sus-museos-con-un-aperitivo-_e4849816/"
  }
const eventWrongDate ={
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
  Para cada propiedad del objeto:
  checkProperty(event.nameEvent)          --> (true)
  checkProperty(eventWrong.nameEvent)     --> (false)
  checkProperty(eventDateWrong.dateFinal) --> (true)
  checkProperty(eventWrong.categories)    --> (true)

  Para todas que todas las categorias necesarias esten bien.
  checkRequired(event)      --> (true)
  checkRequired(eventWrong) --> (false)

  Y si todas están bien :
    checkFormats(eventDateWrong)      --> (event)
```
Principalmente será pasar unos datos de si está bien o no.
## 4. La datos no están ordenados cronológicamente
```
Array_Desordenado = [
  {nameEvent:"prueba 1",dateStart:"2023/01/01"},
  {nameEvent:"prueba 2",dateStart:"2022/01/01"},
  {nameEvent:"prueba 3",dateStart:"2021/12/01"},
  {nameEvent:"prueba 4",dateStart:"2021/01/01"},
  {nameEvent:"prueba 5",dateStart:"2022/06/12"},
]
Array_Ordenado = [
  {nameEvent:"prueba 4",dateStart:"2021/01/01"},
  {nameEvent:"prueba 3",dateStart:"2021/12/01"},
  {nameEvent:"prueba 2",dateStart:"2022/01/01"},
  {nameEvent:"prueba 5",dateStart:"2022/06/12"},
  {nameEvent:"prueba 1",dateStart:"2023/01/01"}
]

ordenarArray(Array_Desordenado) --> (Array_Ordenado)
```
Para comparar fechas ya que no son de tipo *Número* , se usa *getTime()* para poner tener un número entero.
Lo que devuelve *getTime()* es un número de milisegundos desde el 1 de enero de 1970.
``` Javascript
function ordenar(array){
  array.sort((a, b) => (a.dateStart).getTime() - (b.dateStart).getTime())
  return array
}
```
## 5. Los eventos que duran todo el año ocupan las primeras páginas.

No tengo ni idea de cómo solucionarlo
¿Quizás meter una categoría de eventos que no se acaban?
## 6. Eventos caducados
Como los datos pueden pasar la fecha en lo que se se encuentre el día que la esta viendo el usuario, este dato es mejor que directamente no se incluya en la variable global y así evitar que sea una carga para el código.
- Si solo se evalua el evento :
```
Array_Eventos = [
  {nameEvent:"prueba 1",dateStart:"2023/01/01"},
  {nameEvent:"prueba 2",dateStart:"2022/01/01"},
  {nameEvent:"prueba 3",dateStart:"2021/12/01"},
  {nameEvent:"prueba 5",dateStart:"2022/06/12"},
  {nameEvent:"prueba 4",dateStart:"2021/01/01"}
]
esValidoElEvento(Array_Eventos[0])                        --> (true)
esValidoElEvento(Array_Eventos[Array_Eventos.length - 1]) --> (false)
```

```Javascript
const TODAY = new Date().getTime();
const haveDateFinal = event.hasOwnProperty('dateFinal')
event.dateStart.getTime() < TODAY && (haveDateFinal ?  event.dateFinal.getTime() < TODAY : true)
```

## 7. No viene la propiedad de favoritos.
### ¿Cómo guardar el valor de favoritos ya no va asociado a un usuario y escribirlo a mano no tiene ningún valor?
Como el botón de favoritos depende del usuario, de qué evento quiera guardar.
La única manera de hacer persistentes los datos, sin un servidor, sería guardar los datos usando *LocalStorage* que se almacena en el lado del cliente en su navegador, con un formato de objeto plano, similar al *JSON*.
### ¿De qué manera guardar los datos del eventos seleccionado como favorito en el *LocalStorage*?
Se podría introducir todo el evento al *LocalStorage* pero no sería algo útil de manejar. Porque el código hace una llamada al *archivo.JSON* que ya contiene esos datos.
Por lo que lo más lógico es guardar un dato único como un ID en un array, para poder utilizar métodos como includes para saber si se encuentra seleccionado.
Lo básico sería que se introduciese el dato en el array:
```
arrayBookMark_LocalStorage  = [];
seleccionFavoritos(ID) -->([ID])

```

Si ya esta el ID, que no lo incluya:
```
arrayBookMark_LocalStorage  = ['sameID','otrosID'];
seleccionFavoritos('sameID') -->(['sameID'])

```
Para guardar en el Local:
```
arrayBookMark_LocalStorage  = ['sameID','otrosID'];
guardarLocalStorage('nombredeItem','datos_para_guardar')

guardarLocalStorage('bookmark',arrayBookMark_LocalStorage) --> Sobreescribe los datos anteriores.

```
El código sería asi:

```javascript
  const saveLocalStorage = () => localStorage.setItem("bookmark", JSON.stringify(arrayBookMark));
  function selectedBookmark(idEvent, {ver como no propagar}) {
  let index = allEvents.findIndex((el) => el.id === idEvent);
  allEvents[index].bookmark = !allEvents[index].bookmark;
  if (allEvents[index].bookmark) {
    arrayBookMark.push(idBookmark)
  } else {
    let indexB = arrayBookMark.findIndex((el) => el === idBookmark);
    arrayBookMark.splice(indexB, 1);
  }
  saveLocalStorage();
}
```
### ¿Cómo cargar los favoritos que se encuentran en el  *LocalStorage*?
Lo que se necesita:
```
(null)                                  --> ([])
(["IDevento1","IDevento2","IDevento3"]) --> (["IDevento1","IDevento2","IDevento3"])
```
Código Javascript:
```javascript
function BookMarkLocalStorage (ID_Item="bookmark"){
  const EVENTS_BOOKMARKED = [];
  if (localStorage.getItem(ID_Item) != null) {
  EVENTS_BOOKMARKED = JSON.parse(localStorage.getItem("bookmark"));
  }
  return EVENTS_BOOKMARKED;
}
```

### ¿Cómo hacer que los favoritos estén seleccionados cuando cargas el evento?
Habría que añadirle a la estructura de datos,un valor de si esta seleccionado o no.
```javascript
    FORMAT_EVENT_JSON."bookmark"= {
      type: Boolean,
      required: true,
      default: BookMarkLocalStorage().includes(event.id)
    }
```
```
[].includes(event.id)                     --> false
[event.id ,"Otros id"].includes(event.id) --> true
```
## 8. Comprobar qué todo ha ido como se esperaba
Evaluar el array para que:
- Todos los datos estén en el ordenados por fecha.
- Tenga ID únicos.
- Tenga el dato de favoritos.
- Tenga los datos necesarios.
- Que todos los datos tengan el formato indicado
Para que sea más real las fechas finales que se determinen mediante una función para los test.
```
Array_Eventos = [
  {nameEvent:"prueba 1",dateStart:"2023/01/01"},
  {nameEvent:"prueba 2",dateStart:"2022/01/01",dateFinal:"2022/06/01"},
  {nameEvent:"prueba 3",dateStart:"2021/12/01",dateFinal},
  {nameEvent:"prueba 5",dateStart:"2022/06/12"},
  {nameEvent:"prueba 4",dateStart:"2021/01/01"}
]
esValidoElEvento(Array_Eventos[0]) --> (true)
esValidoElEvento(Array_Eventos[Array_Eventos.length - 1]) --> (false)
```

```
const TODAY = new Date().getTime();
const haveDateFinal = event.hasOwnProperty('dateFinal')
event.dateStart.getTime() < TODAY && (haveDateFinal ?  event.dateFinal.getTime() < TODAY : true)
```
