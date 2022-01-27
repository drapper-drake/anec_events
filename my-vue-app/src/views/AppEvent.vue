<template>
  <div>
    <main class="mb-5 flex flex-col items-center md:mb-0">
      <div class="container container-info-page">
        <div class="info-container">
          <div class="top-info">
            <div class="img-container">
              <img
                src="https://res.cloudinary.com/dlwvv3xmg/image/upload/v1641060841/MUBAG_-_La_generaci%C3%B3n_figurativa._Premios_para_la_creaci%C3%B3n_de_un_museo_xemexh.jpg"
              />
              <div class="bookmarkEvent">
                <img
                  src="./img/icons/bookmark.svg"
                  data-name="la-generacin-figurativa-premios-para-la-creacin-de-un-museo"
                />
              </div>
            </div>
            <div class="info-event">
              <h2 class="title-ev">La generación figurativa. Premios para la creación de un museo</h2>
              <div class="category">
                <img src="./img/icons/Museum-dark.svg" class="labelsSvg" />
                <p>Museo</p>
              </div>
              <div class="city-location">
                <img src="./img/icons/location.svg" class="labelsSvg" />
                <p>MUBAG. C/ Gravina 13-15, 03002 Alicante.</p>
              </div>
              <div class="date">
                <img src="./img/icons/date.svg" class="labelsSvg" />
                <p>Del 22 Diciembre 2020 al 31 Diciembre 2022</p>
              </div>
              <div class="hours">
                <img src="./img/icons/Schedule.svg" class="labelsSvg" />
                <p>De 10:00 a 20:00</p>
              </div>
              <button class="btn-calendar">Añadir al calendario</button>
              <div class="price">
                <img src="./img/icons/euro.svg" class="priceSvg" />
                <p>Gratuito</p>
              </div>
            </div>
          </div>
          <div class="share-bar">
            <button class="btn-more-info">Más información</button>
            <div class="share-icon">
              <img src="./img/icons/Share.svg" />
              <p class="share-text">Comparte con tus amigos</p>
            </div>
            <div class="container-social">
              <img src="./img/icons/twitterBlack.svg" class="icon-social" data-name="Twitter" />
              <img src="./img/icons/fb-icon.svg" class="icon-social" data-name="Facebook" />
              <img src="./img/icons/Email-icon.svg" class="icon-social" data-name="Email" />
            </div>
          </div>
          <div class="bottom-info">
            <p class="contText"></p>
            <div class="map">
              <iframe
                class="iframe-map"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&amp;q=MUBAG. C/ Gravina 13-15, 03002 Alicante."
                width="900"
                height="400"
                loading="lazy"
                style="border: 0px;"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="more-events-container hidden">
          <div class="arrows-container">
            <h3 class="titleOtherEv">Otros eventos:</h3>
            <div class="arrows">
              <img src="./img/icons/arrow-left.svg" />
              <img src="./img/icons/right-arrow.svg" />
            </div>
          </div>
          <div class="more-events"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'event',
  data() {
    return {
      id: this.$route.params.id,
    }
  },

  methods: {

  },

  mounted() {
  },
}
</script>
