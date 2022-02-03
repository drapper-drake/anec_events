<template>
  <footer
    class="w-full py-4 bg-dark flex flex-col font-sans text-sm md:text-base text-bg-dark text-center gap-4"
  >
    <div
      class="flex flex-col justify-between items-center gap-6 md:flex-row md:justify-around md:items-baseline md:gap-0"
    >
      <div class="w-48 flex flex-col gap-4">
        <p>Síguenos</p>
        <div class="flex justify-around">
          <a href="https://twitter.com/anecevents" target="_blank" rel="noopener">
            <img class="w-8 h-8" src="/img/icons/twitter.svg" alt="Twitter" />
          </a>
          <a
            href="https://www.facebook.com/%C3%80nec-Events-111784064715714"
            target="_blank"
            rel="noopener"
          >
            <img class="w-8 h-8" src="/img/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/anecevents" target="_blank" rel="noopener">
            <img class="w-8 h-8" src="/img/icons/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <p>Contáctanos</p>
        <a href="mailto:eoidapperdrake@gmail.com">eoidapperdrake@gmail.com</a>
      </div>
      <div class="flex flex-col gap-4">
        <!-- <a href="./privacy.html">Aviso Legal</a> -->
        <router-link to="/privacy">Aviso Legal</router-link>
        <!-- <a href="./cookies/cookies.html">Política de cookies</a> -->
        <router-link to="/cookies">Política de Cookies</router-link>
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-center mb-2 gap-2">
      <img class="w-4 h-4" src="/img/Favicon.svg" alt="Logo" />
      <p>Ànec Events.</p>
      <p>Desarrollado por Dapper Drake</p>
    </div>
  </footer>
</template>
