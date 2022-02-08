<template>
  <main class="mb-5 flex flex-col items-center md:mb-0">
    <div class="container-card w-[300px]">
      <div :style="style" class="info-card" role="button" tabindex="0" aria-pressed="false">
        <h2>{{ nameEvent }}</h2>
        <p class="sr-only">En</p>
        <p>{{ cityLocation }}</p>
        <p>{{ dateEvent }}</p>
        <p v-if="free" class="sr-only">Evento gratuito</p>
        <p v-else class="sr-only">Evento de pago</p>

        <div class="icons-bar">
          <p class="sr-only">Categorias del evento:</p>
          <div v-for="index in category">
            <img :src="listCategory[index].iconEvent" alt="Icono de categoría" />
            <p>{{ listCategory[index].nameIconEvent }}</p>
          </div>
        </div>
      </div>
      <div class="photoEvent">
        <div @click="click" class="bookmark tooltip">
          <button>
            <img
              :src="[bookmarkBoolean ? '/img/icons/bookmark-selected.svg' : '/img/icons/bookmark.svg']"
              alt="Añadir a favoritos"
            />
            <span class="tooltip-text">Añadir a favoritos</span>
          </button>
        </div>
        <img :src="photoEvent" alt="Foto del evento" class="w-full h-[160px]" />
        <div class="tooltip">
          <img v-if="free" src="/img/icons/gratis.svg" alt="Evento GRATUITO" />
          <img v-else src="/img/icons/Pago-euro.svg" alt="Evento de PAGO" />
          <span v-if="free" class="tooltip-text">Evento GRATUITO</span>
          <span v-else class="tooltip-text">Evento de PAGO</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive, computed } from 'vue';
import { listSrcCategories } from '../listSrcTitlesCategories';


export default {
  emits: ['click'],
  data() {
    return {
      bookmarkBoolean: false,
      listCategory: listSrcCategories
    }
  },
  props: {
    nameEvent: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
    },
    photoEvent: {
      type: String,
      required: true
    },
    cityLocation: {
      type: String,
      required: true,
    },
    dateEvent: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: Array,
      required: true
    }
  },

  methods: {
    click() {
      this.bookmarkBoolean = !this.bookmarkBoolean
    }
  },

  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      }))
    }
  },
}
</script>

