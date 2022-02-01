<script>
export default {
    props: {
        activeCategory: {
            type: String,
        },
        //     pageSelection: {
        //         type: String,
        //         default: "page-unselected",
        //     }
    },

    data() {
        return {
            numberPages: 0,
        }
    },
    // page-selected y page-unselected ya estan en .css
    methods: {
        clearPagination() {
            while (containerNavPages.hasChildNodes()) {
                containerNavPages.firstChild.remove();
            }
        },
        // pagination(allEvents) { },
        delete() {
            this.clearPagination();
            const containerNavPages = document.querySelector(".pagination");
            while (containerNavPages.hasChildNodes()) {
                containerNavPages.firstChild.remove();
            }

            // Código paginación index.js

        },

        pagination() {
            // const containerNavPages = document.querySelector(".pagination");
            // clearPagination();
            // const result = 96 / 12; // ? Aqui divides todo el array de eventos en elementos de 12
            const listAllEvents = this.$store.state.currentListEvents.length; // ? Aqui divides todo el array de eventos en elementos de 12
            const result = listAllEvents / 12;
            //let numberPages;//? El numero de las págins depende de si coincide con multiplo de 12
            if (result === Math.trunc(result)) {
                // para listas que sean múltiplos de 12 (12, 24, 36...)
                this.numberPages = Math.trunc(result);
            } else {
                this.numberPages = Math.trunc(result) + 1;
            }
            this.$store.dispatch('showPagination', true);
            return this.numberPages;
        }
    },

    created() {
        this.pagination();
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
            <button
                class="page-unselected"
                @click="$store.dispatch('divideList', number)"
            >{{ number }}</button>
        </div>
    </div>
</template>
