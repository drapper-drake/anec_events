const { parseFetch, hasAllPropsValidFormat, isCurrentEventActive, checkAndCorrectData: checkFormatData } = require('./fetchEvent');
const { event, eventWrong, eventWrongDate, eventInRangeDate, eventOutDate } = require('./event-data-test');
const { listEvent } = require('./mocks/fake-list-events')
const { responseCorrect } = require('./mocks/response-correct')

describe('Comprobación de requeridos y formato del evento, sin cambiar el dato', () => {
  test('Si el nombre del evento esta bien', () => {
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

describe('Comprobar que no se introducen los datos ', () => {
  test('Un array formateado con datos erroneos y validos', () => {
    expect(parseFetch(listEvent)).toBe(responseCorrect);
  });
})
