<template>
  <main class="text-bg-light mb-8 flex flex-col items-center">
    <div class="container md:shadow-2xl text-lg py-3.5">
      <div class="md:border-solid">
        <div :style="style" class="flex flex-col p-5 text-justify items-center">
          <div v-if="comments" class="py-4 w-3/4 text -justify self-center" tabindex="0">
            <p>{{ comments }}</p>
          </div>
          <div class="self-center py-2">
            <p class="sr-only">Mapa de Google Maps con la dirección del evento</p>
            <iframe
              :title="site"
              :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyB5T7NpM9XqxGDqKWalpsW_KHskmldO2oY&q=${site}`"
              :width="widthIframe"
              :height="heighIframe"
              loading="lazy"
              style="border: 0px;"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  props: {
    site: {
      type: String,
      required: false
    },
    comments: {
      type: String
    },
    widthIframe: {
      type: Number,
    },
    heighIframe: {
      type: Number,
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
