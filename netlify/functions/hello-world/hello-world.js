// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const summary = event.queryStringParameters.summary;
    const location = event.queryStringParameters.location;
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Titulo del evento: ${summary}
      Localización ${location}`
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
