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
            // ? El bucle For de acontinuacion lo podriais hacer con vue que generase tantos elementos como numero de paginas
            // ? y que esta función solo devuelva el número de páginas que puede tener la página.
            // for (let page = 0; page <= numberPages; page++) {
            //     const anchor = document.createElement("a");
            //     anchor.textContent = page + 1;
            //     anchor.className = page === 0 ? pageSelected : pageUnSelected;
            //     anchor.addEventListener("click", changePagination);
            //     containerNavPages.appendChild(anchor);
            // }
            // this.numberPages=
            return this.numberPages;
        },
        divideListEventForPagination(numberPage) {
            let list = [];
            switch (activeCategory) {
                case "all":
                    list = [...allEvents];
                    break;
                case "bookmark":
                    list = allEvents.filter(event => event.bookmark)
                    break;
                default:
                    list = allEvents.filter(event => event.category.includes(activeCategory));
            }
            let min = 12 * (numberPage - 1);
            let max = (min + 11) > list.length ? list.length : min + 11;
            return list = list.slice(min, max + 1);
        }
    },

    created() {
        this.pagination();
        // divideListEventForPagination(1);
    }
};



</script>

<template>
    <h1>La paginacion va aqui</h1>
    <!-- La clase de css pagination sobra en vue -->
    <div
        v-if="this.$store.state.showPagination"
        class="pagination flex flex-row flex-wrap justify-center gap-2 p-6"
    >
        <div v-for="number in pagination()">
            <button
                class="page-unselected"
                @click="divideListEventForPagination(number)"
            >{{ number }}</button>
        </div>
    </div>
</template>
