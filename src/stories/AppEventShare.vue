<template>
  <div :style="style" class="share-bar">
    <a v-if="linkTickets" class="btn-more-info">{{ btnInfo }}</a>

    <div class="share-icon gap-3">
      <img src="/img/icons/Share.svg" alt="Icono de compartir" />
      <p class="text-base font-bold" tabindex="0">Comparte con tus amigos</p>
    </div>
    <div class="container-social">
      <button>
        <img src="/img/icons/twitterBlack.svg" class="cursor-pointer" alt="Twitter" />
      </button>
      <button>
        <img src="/img/icons/fb-icon.svg" class="cursor-pointer" alt="Facebook" />
      </button>
      <button>
        <img src="/img/icons/Email-icon.svg" class="cursor-pointer" alt="Enviar por correo" />
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  props: {
    linkTickets: {
      type: Boolean,
      required: true
    },
    btnInfo: {
      type: String,
      default: "Más información",
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
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
