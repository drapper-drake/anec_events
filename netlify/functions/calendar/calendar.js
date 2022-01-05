// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { google } = require("googleapis");
const process = require('process');

const { OAuth2 } = google.auth;

const API_CLIENT = process.env.API_CLIENT_SECRET;
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET;
const API_REFRESH = process.env.API_REFRESH;

const oAuth2Client = new OAuth2(API_CLIENT, API_CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: API_REFRESH, });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
// ! param=1&param=4&param=4&param=5124&param=4&param=-1&param=4&param=23
// ?  ?summary=tituloevento&location=ubicacionEvento&description=descripcionEvento&..
const handler = async (event) => {
  try {
    const summary = event.queryStringParameters.summary;
    const location = event.queryStringParameters.location;
    const description = event.queryStringParameters.description;
    // ? Habrá que usar new Date para formatear la fecha
    // ? O usar una validacion como en el video de serveless ( 3:09:00)
    const eventStartTime = event.queryStringParameters.start;
    const eventEndTime = event.queryStringParameters.end;

    const eventG = {
      summary: summary,
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
    calendar.events.insert(
      {
        calendarId: "primary",
        resource: eventG
      },
      err => {
        if (err) {
          return { statusCode: 500, body: `Calendar Events Creation Error: ${err.toString()}` };
        }
        return {
          statusCode: 200,
          body: console.log({ message: `Calendar Event Created: ${summary}` })
        }
      }
    )

  }
  catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
