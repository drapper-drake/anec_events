<script>
export default {
    data() {
        return {
            numberPages: 0,
            pageSelection: []
        }
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
    }
};
</script>

<template>
    <div
        v-if="this.$store.state.showPagination"
        class="flex flex-row flex-wrap justify-center gap-2 p-6"
    >
        <div v-for="number in pagination()">
            <button :class="pageSelection[number - 1]" @click="changePage(number)">{{ number }}</button>
        </div>
    </div>
</template>
