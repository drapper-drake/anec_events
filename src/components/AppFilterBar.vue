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
    IconBookmark,
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
      filterCategory: this.$store.state.filterCategory,
      categorySelected: "all"
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
      this.categorySelected = category
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
        :class="[categorySelected === 'all' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'all' ? 'page' : 'false']"
      >Todos</button>

      <button
        @click="changeStyleAndFilter('bookmark')"
        :class="[categorySelected === 'bookmark' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'bookmark' ? 'page' : 'false']"
      >
        <BaseIcon height="23" iconName="bookmark">
          <IconBookmark></IconBookmark>
        </BaseIcon>Favoritos
      </button>
      <button
        @click="changeStyleAndFilter('Sports')"
        :class="[categorySelected === 'Sports' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Sports' ? 'page' : 'false']"
      >
        <BaseIcon iconName="sports">
          <IconSports></IconSports>
        </BaseIcon>Deporte
      </button>
      <button
        @click="changeStyleAndFilter('Kids')"
        :class="[categorySelected === 'Kids' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Kids' ? 'page' : 'false']"
      >
        <BaseIcon icon-name="kids">
          <IconKids></IconKids>
        </BaseIcon>Infantil
      </button>
      <button
        @click="changeStyleAndFilter('Food')"
        :class="[categorySelected === 'Food' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Food' ? 'page' : 'false']"
      >
        <BaseIcon iconName="food">
          <IconFood></IconFood>
        </BaseIcon>Gastrónomico
      </button>
      <button
        @click="changeStyleAndFilter('Music')"
        :class="[categorySelected === 'Music' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Music' ? 'page' : 'false']"
      >
        <BaseIcon iconName="music">
          <IconMusic></IconMusic>
        </BaseIcon>Música
      </button>
      <button
        @click="changeStyleAndFilter('Theatre')"
        :class="[categorySelected === 'Theatre' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Theatre' ? 'page' : 'false']"
      >
        <BaseIcon iconName="theatre">
          <IconTheatre></IconTheatre>
        </BaseIcon>Teatro
      </button>
      <button
        @click="changeStyleAndFilter('Museum')"
        :class="[categorySelected === 'Museum' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Museum' ? 'page' : 'false']"
      >
        <BaseIcon iconName="museum">
          <IconMuseum></IconMuseum>
        </BaseIcon>Museos
      </button>
      <button
        @click="changeStyleAndFilter('Party')"
        :class="[categorySelected === 'Party' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Party' ? 'page' : 'false']"
      >
        <BaseIcon iconName="party">
          <IconParty></IconParty>
        </BaseIcon>Fiestas
      </button>
      <button
        @click="changeStyleAndFilter('Play')"
        :class="[categorySelected === 'Play' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Play' ? 'page' : 'false']"
      >
        <BaseIcon iconName="play">
          <IconPlay></IconPlay>
        </BaseIcon>Lúdico
      </button>
    </nav>
  </div>
</template>

<style>
</style>
