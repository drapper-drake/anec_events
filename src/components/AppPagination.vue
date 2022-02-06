<script>
import ChevronLeft from "@/components/ChevronLeft.vue"
import ChevronRight from "@/components/ChevronRight.vue"
export default {
    data() {
        return {
            numberPages: 0,
            pageSelection: []
        }
    },
    components: {
        ChevronLeft,
        ChevronRight
    },
    methods: {
        initialPage() {
            this.pageSelection = Array(this.numberPages).fill("page-unselected");
            this.pageSelection[0] = "page-selected";
        },
        setPage(numberPage) {
            this.pageSelection.fill("page-unselected");
            this.pageSelection[numberPage - 1] = "page-selected";
        },
        pagination() {
            // ? Aqui divides todo el array de eventos en elementos de 12
            const listAllEvents = this.$store.state.currentListEvents.length;
            const result = listAllEvents / 12;
            //? El numero de las páginas depende de si coincide con multiplo de 12
            if (result === Math.trunc(result)) {
                // para listas que sean múltiplos de 12 (12, 24, 36...)
                this.numberPages = Math.trunc(result);
            } else {
                this.numberPages = Math.trunc(result) + 1;
            }

            this.$store.dispatch('showPagination', true);
            return this.numberPages;
        },
        changePage(pageNumber) {
            this.setPage(pageNumber);
            this.$store.dispatch('divideList', pageNumber);
            window.scrollTo(0, 0);
            this.$router.push({ name: 'home', query: { p: pageNumber } })
        }
    },
    watch: {
        numberPages() {
            this.initialPage();
        }
    },

    created() {
        this.pagination();
        this.initialPage();
        this.$store.dispatch('divideList', 1);
        this.$router.push({ query: { p: this.$store.state.pageId } })
    }
};
</script>

<template>
    <div v-if="this.$store.state.showPagination" class="flex flex-row justify-center gap-2 p-6">
        <ChevronLeft class="page-unselected h-[42px]" @click="changePage(1)" />
        <div class="container-pagination w-[100px] md:w-[200px] flex overflow-x-scroll">
            <div v-for="number in pagination()">
                <button :class="pageSelection[number - 1]" @click="changePage(number)">{{ number }}</button>
            </div>
        </div>
        <ChevronRight class="page-unselected h-[42px]" @click="changePage(this.pagination())" />
    </div>
</template>

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
