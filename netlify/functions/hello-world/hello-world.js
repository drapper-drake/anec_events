// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  // ? /.netlify/functions/hello-world?summary=AlgoDeTitulo&location=Alicante&description=descripciiondelevento&start=2-01-2022&end=06-01-2022
  try {
    //const summary = event.queryStringParameters.summary;
    const location = event.queryStringParameters.location;
    const description = event.queryStringParameters.description;
    const eventStartTime = event.queryStringParameters.start;
    const eventEndTime = event.queryStringParameters.end;

    const eventG = {
      summary: event.queryStringParameters.summary,
      location: location,
      description: description,
      start: {
        dateTime: eventStartTime,
        timeZone: "Europe/Madrid"
      },
      end: {
        dateTime: eventEndTime,
        timeZone: "Europe/Madrid"
      },
      colorId: 1,
      reminders: {
        useDefault: false,
        overrides: [{
          method: "popup",
          minutes: 24 * 60,
        }]
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        title: ` ${eventG.summary}`,
        location: `${location}`,
        description: `${description}`,
        eventStartTime: `${eventStartTime}`,
        eventEndTime: `${eventEndTime}`,
      }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
