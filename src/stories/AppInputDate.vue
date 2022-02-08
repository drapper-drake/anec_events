<template>
  <div :style="style" class="w-full flex flex-row justify-center my-4">
    <form @submit.prevent="" class="flex flex-col items-center md:flex-row">
      <label :style="style" class="m-1 w-24 font-sans font-bold text-sm text-bg-light" for="start">{{textStartDate}}:</label>
      <input
        id="start"
        class="m-1 w-40 cursor-pointer text-neutral-600 text-sm text-right rounded border-2 border-solid border-dark"
        type="date"
        required
        v-model="dateEvent.dateStart"
      />
      <label :style="style" class="m-1 w-24 font-sans font-bold text-sm text-bg-light" for="final">{{textEndDate}}:</label>
      <input
        id="final"
        class="m-1 w-40 cursor-pointer text-neutral-600 text-sm text-right rounded border-2 border-solid border-dark"
        type="date"
        required
        v-model="dateEvent.dateFinal"
      />
      <Buttons :textFilter="textButton" :backgroundColor="backgroundButton" :color="colorButton"/>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import Buttons from "./ButtonMoreInfo.vue";

export default {
  data() {
    return {
      dateEvent: {
        dateStart: new Date().toISOString().slice(0, 10),
        dateFinal: new Date().toISOString().slice(0, 10),
      }
    }
  },
  components: {
    Buttons,
  },
  props: {
    textStartDate: {
      type: String,
    },
    textEndDate: {
      type: String,
    },
    backgroundColor:{
      type: String,
    },
    color: {
      type: String,
    },
    backgroundButton:{
      type: String,
    },
    colorButton: {
      type: String,
    },
    textButton:{
      type: String,
      default: 'Buscar'
    }
  },
  
  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      })),
      styleButton: computed(() => ({
        backgroundColor: props.backgroundButton,
        color: props.colorButton,
      }))
    }
  },

}
</script>