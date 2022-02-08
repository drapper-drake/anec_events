
<template>
  <div class="flex flex-row justify-center gap-2 p-6">
    <ChevronLeft :style="styleChevron" class="page-unselected h-[42px]" @click="setPage(1)" />
    <div class="container-pagination w-[100px] md:w-[200px] flex overflow-x-scroll">
      <div v-for="index in pagination()">
        <button
          :style="style"
          :class="pageSelection[index - 1]"
          @click="changePage(index)"
        >{{ index }}</button>
      </div>
    </div>
    <ChevronRight
      :style="styleChevron"
      class="page-unselected h-[42px]"
      @click="changePage(this.pagination())"
    />
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import ChevronLeft from "../components/ChevronLeft.vue";
import ChevronRight from "../components/ChevronRight.vue";

export default {
  data() {
    return {
      numberPages: 0,
      pageSelection: []
    }
  },
  props: {
    number: {
      type: Number,
      require: true,
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
    bgColorChevron: {
      type: String,
    }
  },
  components: {
    ChevronLeft,
    ChevronRight
  },
  methods: {

    pagination() {
      // ? Aqui divides todo el array de eventos en elementos de 12
      const listAllEvents = this.pageSelection.length;
      const result = listAllEvents / 12;
      //? El numero de las páginas depende de si coincide con multiplo de 12
      if (result === Math.trunc(result)) {
        // para listas que sean múltiplos de 12 (12, 24, 36...)
        this.numberPages = Math.trunc(result);
      } else {
        this.numberPages = Math.trunc(result) + 1;
      }
      return this.numberPages;
    },
    initialPage() {
      this.pageSelection = Array(50).fill("page-unselected");
      this.pageSelection[0] = "page-selected";
    },
    setPage(numberPage) {
      this.pageSelection.fill("page-unselected");
      this.pageSelection[numberPage - 1] = "page-selected";
    },
    changePage(pageNumber) {
      this.setPage(pageNumber);
    }
  },
  created() {
    this.initialPage()
  },
  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      })),
      styleChevron: computed(() => ({
        backgroundColor: props.bgColorChevron,
      }))

    }
  },
};
</script>


<style scoped>
.container-pagination::-webkit-scrollbar-track {
  height: 5px;
  background-color: #f2f2f2;
}
.container-pagination::-webkit-scrollbar {
  height: 10px;
}
.container-pagination::-webkit-scrollbar-thumb {
  background-color: #ffa438; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
</style>
