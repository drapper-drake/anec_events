const { parseFetch, hasAllPropsValidFormat, isCurrentEventActive, checkFormatData } = require('./fetchEvent');
const { event, eventWrong, eventWrongDate, eventInRangeDate, eventOutDate } = require('./event-data-test');
const { listEvent } = require('./mocks/fake-list-events')
const { responseCorrect } = require('./mocks/response-correct')

describe('Comprobación de requeridos y formato del evento, sin cambiar el dato', () => {
  test('Si nombre del evento esta bien', () => {
    expect(checkFormatData(event, 'nameEvent')).toBeTruthy();
  })
  test('Si "free" esta bien', () => {
    expect(checkFormatData(event, 'free')).toBeTruthy();
  })
  test('Si "precio" esta bien', () => {
    expect(checkFormatData(event, 'price')).toBeTruthy();
  })
  test('Si "cityLocation" esta bien', () => {
    expect(checkFormatData(event, 'cityLocation')).toBeTruthy();
  })
  test('Si "site" esta bien', () => {
    expect(checkFormatData(event, 'site')).toBeTruthy();
  })
  test('Si la fecha del principio esta bien', () => {
    expect(checkFormatData(event, 'dateStart')).toBeTruthy();
  })
  test('Si el listado de categorias esta bien', () => {
    expect(checkFormatData(event, 'category')).toBeTruthy();
  })
  test('Si tiene URL de foto esta bien', () => {
    expect(checkFormatData(event, 'photoEvent')).toBeTruthy();
  })
})

describe('Comprobación si tienen mal el formato', () => {
  test('nameEvent', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 2;
    expect(checkFormatData(eventInvalidFormat, 'nameEvent')).toBeFalsy();
  })
  test('free', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 'Evento con formato invalido';
    eventInvalidFormat.free = 20;
    expect(checkFormatData(eventInvalidFormat, 'free')).toBeFalsy();
  })
  test('cityLocation', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 'Evento con formato invalido';
    eventInvalidFormat.cityLocation = true;
    expect(checkFormatData(eventInvalidFormat, 'cityLocation')).toBeFalsy();
  })
  test('site', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 'Evento con formato invalido';
    eventInvalidFormat.site = 15011;
    expect(checkFormatData(eventInvalidFormat, 'site')).toBeFalsy();
  })
  test('dateStart', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 'Evento con formato invalido';
    eventInvalidFormat.dateStart = 'el 15/01/22';
    expect(checkFormatData(eventInvalidFormat, 'dateStart')).toBeFalsy();
  })
  test('category', () => {
    let eventInvalidFormat = { ...event }
    eventInvalidFormat.nameEvent = 'Evento con formato invalido';
    eventInvalidFormat.category = 'categoria'
    expect(checkFormatData(eventInvalidFormat, 'category')).toBeFalsy();
  })
  test('Si el nombre del evento esta mal', () => {
    expect(checkFormatData(eventWrong, 'nameEvent')).toBeFalsy();
  })
  test('Si el precio esta mal', () => {
    expect(checkFormatData(eventWrong, 'price')).toBeFalsy();
  })
  test('Si a la fecha le falta un 0', () => {
    expect(checkFormatData(eventWrong, 'dateStart')).toBeTruthy();
  })
})
describe('Comprobación si la propiedad esta undefined', () => {
  test('nameEvent', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = undefined;
    expect(checkFormatData(eventUndefinedData, 'nameEvent')).toBeFalsy();
  })
  test('free', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.free = undefined;
    expect(checkFormatData(eventUndefinedData, 'free')).toBeFalsy();
  })
  test('site', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.site = undefined;
    expect(checkFormatData(eventUndefinedData, 'site')).toBeFalsy();
  })
  test('cityLocation', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.cityLocation = undefined;
    expect(checkFormatData(eventUndefinedData, 'cityLocation')).toBeFalsy();
  })
  test('dateStart', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.dateStart = undefined;
    expect(checkFormatData(eventUndefinedData, 'dateStart')).toBeFalsy();
  })
  test('category', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.category = undefined;
    expect(checkFormatData(eventUndefinedData, 'category')).toBeFalsy();
  })
})
describe('Comprobación si no existe la propiedad', () => {
  test('nameEvent', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.nameEvent;
    expect(checkFormatData(eventMissingData, 'nameEvent')).toBeFalsy();
  })
  test('free', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.free;
    expect(checkFormatData(eventMissingData, 'free')).toBeFalsy();
  })
  test('site', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.site;
    expect(checkFormatData(eventMissingData, 'site')).toBeFalsy();
  })
  test('cityLocation', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.cityLocation;
    expect(checkFormatData(eventMissingData, 'cityLocation')).toBeFalsy();
  })
  test('dateStart', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.dateStart;
    expect(checkFormatData(eventMissingData, 'dateStart')).toBeFalsy();
  })
  test('category', () => {
    let eventMissingData = { ...event }
    delete eventMissingData.category;
    expect(checkFormatData(eventMissingData, 'category')).toBeFalsy();
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

describe('Comprobación si algún dato esta sin definir en la comprobación global', () => {
  test('nameEvent', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
  test('free', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = "Evento-con-datos-faltantes";
    eventUndefinedData.free = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
  test('site', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = "Evento-con-datos-faltantes";
    eventUndefinedData.site = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
  test('cityLocation', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = "Evento-con-datos-faltantes";
    eventUndefinedData.cityLocation = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
  test('dateStart', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = "Evento-con-datos-faltantes";
    eventUndefinedData.dateStart = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
  test('category', () => {
    let eventUndefinedData = { ...event }
    eventUndefinedData.nameEvent = "Evento-con-datos-faltantes";
    eventUndefinedData.category = undefined;
    expect(hasAllPropsValidFormat(eventUndefinedData)).toBeFalsy();
  })
})

describe('Comprobación si falta algún dato en la comprobación global', () => {
  test('nameEvent', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-nameEvent";
    delete eventMissingData.nameEvent;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
  })
  test('free', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-free";
    delete eventMissingData.free;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
  })
  test('site', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-site";
    delete eventMissingData.site;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
  })
  test('cityLocation', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-cityLocation";
    delete eventMissingData.cityLocation;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
  })
  test('dateStart', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-dateStart";
    delete eventMissingData.dateStart;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
  })
  test('category', () => {
    let eventMissingData = { ...event }
    eventMissingData.nameEvent = "Evento-con-datos-faltantes-category";
    delete eventMissingData.category;
    expect(hasAllPropsValidFormat(eventMissingData)).toBeFalsy();
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
    expect(parseFetch(listEvent)).toEqual(responseCorrect);
  });
})
