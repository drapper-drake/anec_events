<template>
  <main class="text-bg-light mb-8 flex flex-col items-center">
    <div :style="style" class="container md:shadow-2xl text-lg py-3.5">
      <div class="md:border-solid">
        <div class="flex flex-col-reverse justify-around items-center md:flex-row-reverse">
          <div class="flex flex-col gap-2 relative md:max-w-sm lg:max-w-sm">
            <h2 class="text-center font-serif text-3xl font-bold p-5" tabindex="0">{{ nameEvent }}</h2>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/euro.svg" alt=" " />
              <p class="sr-only">Evento</p>
              <p>{{ price }}</p>
            </div>
            <div class="flex" tabindex="0">
              <p class="sr-only">Categorías del evento:</p>
              <div v-for="index in category" class="category">
                <img :src="listCategory[index].iconEventDark" class="labelsSvg" alt=" " />
                <p>{{ listCategory[index].nameIconEvent }}</p>
              </div>
            </div>

            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/location.svg" alt="Ubicación:    " class="labelsSvg" />
              <p>{{ site }}</p>
            </div>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/date.svg" alt=" " class="labelsSvg" />
              <p v-if="dateFinal">{{ dateFinal }}</p>
              <p v-else>{{ dateEvent }}</p>
            </div>
            <div class="info-icon-event" tabindex="0">
              <img src="/img/icons/Schedule.svg" alt=" " class="labelsSvg" />
              <p>{{ hours }}</p>
            </div>

            <Calendar :textFilter="textButton" />
          </div>
          <div class="p-5 md:max-w-md lg:p-0 lg:max-w-lg xl:max-w-screen-sm relative">
            <img :src="photoEvent" class="w-full rounded-2xl" />
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive, computed } from 'vue';
import Bookmark from "./Bookmark.vue";
import Calendar from "./ButtonCalendar.vue";
import { listSrcCategories } from '../listSrcTitlesCategories';

export default {
  emits: ['click'],
  data() {
    return {
      bookmarkBoolean: false,
      listCategory: listSrcCategories,
    }
  },
  components: {
    Bookmark,
    listSrcCategories,
    Calendar
  },
  props: {
    nameEvent: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
    },
    price: {
      type: String
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
    hours: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    dateFinal: {
      type: String,
    },
    site: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: Array,
      required: true
    },
    textButton: {
      type: String,
      default: 'Añadir al Calendario'
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
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
