const { fetchEvents, hasAllPropsValidFormat, isCurrentEventActive, checkAndCorrectData: checkFormatData } = require('./fetchEvent');
const { event, eventWrong, eventWrongDate, eventInRangeDate, eventOutDate } = require('./event-data-test');

describe('Comprobación de requeridos y formato del evento, sin cambiar el dato', () => {
  test('Si el nombre del evento esta bien', () => {//Hacer pequeños array de eventos para los test
    expect(checkFormatData(event, 'nameEvent')).toBeTruthy();
  })
  test('Si el nombre del evento esta mal', () => {
    expect(checkFormatData(eventWrong, 'nameEvent')).toBeFalsy();
  })
  test('Si la fecha esta bien', () => {
    expect(checkFormatData(event, 'dateStart')).toBeTruthy();
  })
  test('Si el listado de categorias esta bien', () => {
    expect(checkFormatData(event, 'category')).toBeTruthy();
  })
  test('Si el precio esta bien', () => {
    expect(checkFormatData(event, 'price')).toBeTruthy();
  })
  test('Si el precio esta mal', () => {
    expect(checkFormatData(eventWrong, 'price')).toBeFalsy();
  })
  // ! Aqui yo estoy forzando a que entre cuando no tiene ese dato
  // ! Por lo que el test estaría mal
  // test('Si no existen fechas para el evento', () => {
  //   expect(checkFormatData(eventWrongDate, 'dateStart')).toBeFalsy();
  // })
  test('Si a la fecha le falta un 0', () => {
    expect(checkFormatData(eventWrong, 'dateStart')).toBeTruthy();
  })
})
describe('Comprobación de que todos hayan salido bien', () => {
  test('Si todos los datos están bien', () => {
    expect(hasAllPropsValidFormat(event)).toBeTruthy();
  })
  test('Si uno de los datos esta mal', () => {
    expect(hasAllPropsValidFormat(eventWrong)).toBeFalsy();
  })
  test('Si uno de los datos esta mal', () => {
    expect(hasAllPropsValidFormat(eventWrongDate)).toBeFalsy();
  })
})

describe('Comprobación de que el evento no haya pasado el día actual', () => {
  test('Si todavia esta disponible con fecha de inicio', () => {
    expect(isCurrentEventActive(event)).toBeTruthy();
  })
  test('Si se encuentra en el rango de fecha ', () => {
    expect(isCurrentEventActive(eventInRangeDate)).toBeTruthy();
  })
  test('Si el evento ya ha pasado ', () => {
    expect(isCurrentEventActive(eventOutDate)).toBeFalsy();
  })
})

//Falta comprobar que una vez ejecutados todos estos eventos no se carga ninguno más de lo necesario
