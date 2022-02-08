<script>
import BaseIcon from "./BaseIcon.vue";
import IconKids from "./icons/IconKids.vue";
import IconSports from "./icons/IconSports.vue";
import IconPlay from "./icons/IconPlay.vue";
import IconParty from "./icons/IconParty.vue";
import IconMuseum from "./icons/IconMuseum.vue";
import IconTheatre from "./icons/IconTheatre.vue";
import IconMusic from "./icons/IconMusic.vue";
import IconBookmark from "./icons/IconBookmark.vue";
import IconFood from "./icons/IconFood.vue";

export default {
  components: {
    BaseIcon,
    IconSports,
    IconFood,
    IconKids,
    IconMusic,
    IconMuseum,
    IconTheatre,
    IconPlay,
    IconParty
  },
  data() {
    return {
      filterCategory: this.$store.state.filterCategory
    };
  },
  methods: {
    filterByCategory(category) {
      switch (category) {
        case "all":
          let list = [...this.$store.state.allEvents];
          this.$store.dispatch("showAll", list);
          this.$store.dispatch("divideList", 1);
          break;
        case "bookmark":
          let listBookmark = this.$store.state.allEvents.filter(events => events.bookmark);
          this.$store.dispatch("showFilteredEvents", listBookmark);
          this.$store.dispatch("divideList", 1);
          break;
        default:
          let listCategoryEvent = this.$store.state.allEvents.filter(events => events.category.includes(category));
          this.$store.dispatch("showFilteredEvents", listCategoryEvent);
          this.$store.dispatch("divideList", 1);
          break;
      }
    },
    changeStyleAndFilter(category) {
      for (let property in this.filterCategory) {
        this.filterCategory[property] = false;
      }
      this.filterCategory[category] = true;
      this.filterByCategory(category);
    }
  },
}
</script>

<template>
  <div class="container-nav w-full flex flex-col justify-center">
    <nav
      class="navegation ml-1 flex justify-start font-bold text-bg-dark gap-3 md:flex-row overflow-x-scroll lg:justify-center xl:overflow-x-hidden"
    >
      <button
        @click="changeStyleAndFilter('all')"
        :class="[filterCategory.all ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.all ? 'page' : 'false']"
      >Todos</button>

      <button
        @click="changeStyleAndFilter('bookmark')"
        :class="[filterCategory.bookmark ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.bookmark ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconBookmark
            :class="[filterCategory.bookmark ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.bookmark ? 'page' : 'false']"
          ></IconBookmark>
        </BaseIcon>Favoritos
      </button>
      <button
        @click="changeStyleAndFilter('Sports')"
        :class="[filterCategory.Sports ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Sports ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconSports
            :class="[filterCategory.Sports ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Sports ? 'page' : 'false']"
          ></IconSports>
        </BaseIcon>Deporte
      </button>
      <button
        @click="changeStyleAndFilter('Kids')"
        :class="[filterCategory.Kids ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Kids ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconKids
            :class="[filterCategory.Kids ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Kids ? 'page' : 'false']"
          ></IconKids>
        </BaseIcon>Infantil
      </button>
      <button
        @click="changeStyleAndFilter('Food')"
        :class="[filterCategory.Food ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Food ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconFood
            :class="[filterCategory.Food ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Food ? 'page' : 'false']"
          ></IconFood>
        </BaseIcon>Gastrónomico
      </button>
      <button
        @click="changeStyleAndFilter('Music')"
        :class="[filterCategory.Music ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Music ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconMusic
            :class="[filterCategory.Music ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Music ? 'page' : 'false']"
          ></IconMusic>
        </BaseIcon>Música
      </button>
      <button
        @click="changeStyleAndFilter('Theatre')"
        :class="[filterCategory.Theatre ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Theatre ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconTheatre
            :class="[filterCategory.TheIconTheatre ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.TheIconTheatre ? 'page' : 'false']"
          ></IconTheatre>
        </BaseIcon>Teatro
      </button>
      <button
        @click="changeStyleAndFilter('Museum')"
        :class="[filterCategory.Museum ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Museum ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconMuseum
            :class="[filterCategory.Museum ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Museum ? 'page' : 'false']"
          ></IconMuseum>
        </BaseIcon>Museos
      </button>
      <button
        @click="changeStyleAndFilter('Party')"
        :class="[filterCategory.Party ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Party ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconParty
            :class="[filterCategory.Party ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Party ? 'page' : 'false']"
          ></IconParty>
        </BaseIcon>Fiestas
      </button>
      <button
        @click="changeStyleAndFilter('Play')"
        :class="[filterCategory.Play ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[filterCategory.Play ? 'page' : 'false']"
      >
        <BaseIcon>
          <IconPlay
            :class="[filterCategory.Play ? 'fill-dark' : 'fill-light']"
            :aria-current="[filterCategory.Play ? 'page' : 'false']"
          ></IconPlay>
        </BaseIcon>Lúdico
      </button>
    </nav>
  </div>
</template>

<style></style>
