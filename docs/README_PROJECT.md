# Documentación del proyecto
- [Documentación del proyecto](#documentación-del-proyecto)
  - [¿En qué consiste Anec events? /¿Qué es Ànec Events?](#en-qué-consiste-anec-events-qué-es-ànec-events)
- [Planteamiento del producto](#planteamiento-del-producto)
  - [¿En qué sitio web se muestran los datos de los eventos?](#en-qué-sitio-web-se-muestran-los-datos-de-los-eventos)
  - [¿Con qué tecnologías está planteado el proyecto?](#con-qué-tecnologías-está-planteado-el-proyecto)
- [Desarrollo del producto](#desarrollo-del-producto)
  - [Producto mínimo viable](#producto-mínimo-viable)
- [Planificación de necesidades](#planificación-de-necesidades)
  - [Dominio](#dominio)
  - [Hosting](#hosting)
  - [Diseño](#diseño)
  - [Desarrollo de estructura y estético](#desarrollo-de-estructura-y-estético)
  - [Datos de eventos](#datos-de-eventos)

## ¿En qué consiste Anec events? /¿Qué es Ànec Events?
Es una página web que muestra todos los eventos de la provincia de Alicante. Para poder mostrar esos eventos se necesita:

- Un sitio dónde se muestren dichos datos
- Recoger los datos de los eventos
- ¿De qué manera se tienen que guardar los datos?
- ¿Cuales son imprescindibles?
- ¿Cómo se incorporan a la página web?
- ¿Qué limitaciones presenta no tener un servidor que suministre los datos?
- ¿Cómo se solventan esas limitaciones?
- ¿Qué problemas pueden tener esas limitaciones?
- ¿Y cómo se solventan?

# Planteamiento del producto
## ¿En qué sitio web se muestran los datos de los eventos?
- Principalmente se muestran en la página web principal, la cual es :
www.app.anecevents.com / app.anecevents.com
- Y en la página de "venta" anecevents.com donde se muestra una parte limitada del catálogo de eventos
## ¿Con qué tecnologías está planteado el proyecto?
- Landing Page : HTML 5, CSS3, JavaScript, Tailwind CSS y Vite.
- Página principal : HTML5, CSS3, Tailwind CSS, Vite. Todo el desarrollo principal se realizo con Javascript Vanilla por lo que el código entre la Landing y la página web principal son comunes como tiene que ser un Single Page Application, se ha migrado la parte de Javascript a Vue, apoyándonos en Vuex y Vue Router. Todo el proceso usando aún Vite como compilador.

# Desarrollo del producto
Como la landing page es un página sencilla derivada del producto principal par adquirir una mayor conversión en ventas, solo se podrán las necesidades de la página web y con qué tecnologías se puede hacer .

## Producto mínimo viable



| Necesidad                            | Area de la Tecnología  | Uso | Limitación                     | Resolución de la limitación                      |
| ------------------------------------ | ---------------------- | --- | ------------------------------ | ------------------------------------------------ |
| ¿Donde guardar los datos de eventos? | Base de datos- Backend | No  | No poder desplegar un servidor | Tener un archivo que tenga los datos necesarios* |
|                                      | Base de datos- Backend | No  | No poder desplegar un servidor | Tener un archivo que tenga los datos necesarios* |




*Archivo de datos necesarios-Hacer un link
# Planificación de necesidades

## Dominio
## Hosting
## Diseño
## Desarrollo de estructura y estético
## Datos de eventos
| Necesidad                                                     | Area de la Tecnología                         | Uso | Limitación                                                              | Resolución de la limitación                                      |
| ------------------------------------------------------------- | --------------------------------------------- | --- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ¿Dónde guardar los datos de eventos?                          | Servidor externo                              | No  | No poder desplegar un servidor                                          | Tener un archivo que tenga los datos necesarios                  |
| ¿Qué estructura deben tener los datos de los eventos?         | JSON-similar a lo que se recibe del backend   | Sí  | Tener toda la información en bruto a procesar en el lado del cliente    | Modular la información del JSON y comprobar los datos            |
| ¿Cómo se meten los datos?                                     | Búsquedas en Google y siguiendo la estructura | Sí  | Pueden haber problemas a la hora de escribir y no respetar los formatos | Comprobar que el evento cumple el formato y sino no introducirlo |
| ¿Cómo se ordenan los eventos?                                 |                                               |     |                                                                         |                                                                  |
| ¿De qué manera se actualizan y se quitan los eventos pasados? |                                               |     |                                                                         |                                                                  |

