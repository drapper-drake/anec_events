<template>
  <footer
    :style="style"
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
        <a to="/privacy">Aviso Legal</a>
        <a to="/cookies">Política de Cookies</a>
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-center mb-2 gap-2">
      <img class="w-4 h-4" src="/img/Favicon.svg" alt="Logo" />
      <p>Ànec Events.</p>
      <p>Desarrollado por Dapper Drake</p>
    </div>
  </footer>
</template>

<script>
import { reactive, computed } from 'vue';
export default {
  props: {
    color: {
      type: String
    },
    backgroundColor: {
      type: String
    }
  },
  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color
      }))
    }
  }
}
</script>
