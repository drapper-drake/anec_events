
<template>
  <div class="xl:max-w-4xl flex flex-row justify-center p-6">
    <ChevronLeftAll
      :style="styleChevron"
      class="page-unselected first-item-pagination h-[42px]"
      @click="changePage(1)"
      aria-label="Ir a la primera página"
    >
      <span class="sr-only">Ir a la primera página</span>
    </ChevronLeftAll>
    <ChevronLeft
      :style="styleChevron"
      class="page-unselected h-[42px]"
      @click="previousPage()"
      aria-label="Ir a la primera página"
    >
      <span class="sr-only">Ir a la página anterior</span>
    </ChevronLeft>
    <div class="container-pagination w-2/12 flex overflow-x-scroll">
      <button
        :style="style"
        :class="pageSelection[index - 1]"
        v-for="index in pagination()"
        @click="changePage(index)"
      >{{ index }}</button>
    </div>
    <ChevronRight
      :style="styleChevron"
      class="page-unselected h-[42px]"
      @click="nextPage()"
      aria-label="Ir a la última página"
    >
      <span class="sr-only">Ir a la siguiente página</span>
    </ChevronRight>
    <ChevronRightAll
      :style="styleChevron"
      class="page-unselected last-item-pagination h-[42px]"
      @click="changePage(this.pagination())"
      aria-label="Ir a la última página"
    >
      <span class="sr-only">Ir a la última página</span>
    </ChevronRightAll>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import ChevronLeftAll from "../components/ChevronLeftAll.vue";
import ChevronRightAll from "../components/ChevronRightAll.vue";
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
    ChevronRight,
    ChevronLeftAll,
    ChevronRightAll
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
    },
    actualPage() {
      const urlParams = new URLSearchParams(window.location.search)
      const currentPage = Number(urlParams.get('p'))
      return currentPage;

    },
    nextPage() {
      const nextPagination = this.actualPage() + 1;
      if (nextPagination > this.pagination()) {
        return;
      }
      this.changePage(nextPagination)
    },
    previousPage() {
      const previousPagination = this.actualPage() - 1;
      if (previousPagination === 0) {
        return;
      }
      this.changePage(previousPagination)
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
.first-item-pagination {
  border-radius: 50% 0 0 50%;
}
.last-item-pagination {
  border-radius: 0 50% 50% 0;
}
</style>
