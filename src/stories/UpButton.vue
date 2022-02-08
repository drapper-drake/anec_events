<template>
  <div
    class="w-14 h-14 bg-dark flex justify-center items-center rounded-full cursor-pointer border-4 border-solid border-bg-dark"
    :class="this.scroll > 500 ? 'scale-100' : 'scale-0'"
    :style="style"
  >
    <img class="arrow-up" src="/img/icons/arrow.svg" alt="Volver arriba" />
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
export default {
  props: {
    scroll: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String
    }
  },
  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor
      }))
    }
  }
}
</script>
