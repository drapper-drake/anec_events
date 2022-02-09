<template>
  <div class="container-nav w-full flex flex-col justify-center">
    <nav
      class="navegation ml-1 flex justify-start font-bold text-bg-dark gap-3 md:flex-row overflow-x-scroll lg:justify-center xl:overflow-x-hidden"
    >
      <button
        :style="style"
        @click="changeStyleAndFilter('all')"
        :class="[categorySelected === 'all' ? 'filter-selected' : 'filter-unselected']"
      >Todos</button>

      <button
        :style="style"
        @click="changeStyleAndFilter('bookmark')"
        :class="[categorySelected === 'bookmark' ? 'filter-selected' : 'filter-unselected']"
      >
        <BaseIcon height="23" iconName="bookmark">
          <IconBookmark></IconBookmark>
        </BaseIcon>Favoritos
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Sports')"
        :class="[categorySelected === 'Sports' ? 'filter-selected' : 'filter-unselected']"
      >
        <BaseIcon iconName="sports">
          <IconSports></IconSports>
        </BaseIcon>Deporte
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Kids')"
        :class="[categorySelected === 'Kids' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Kids' ? 'page' : 'false']"
      >
        <BaseIcon icon-name="kids">
          <IconKids></IconKids>
        </BaseIcon>Infantil
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Food')"
        :class="[categorySelected === 'Food' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Food' ? 'page' : 'false']"
      >
        <BaseIcon iconName="food">
          <IconFood></IconFood>
        </BaseIcon>Gastrónomico
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Music')"
        :class="[categorySelected === 'Music' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Music' ? 'page' : 'false']"
      >
        <BaseIcon iconName="music">
          <IconMusic></IconMusic>
        </BaseIcon>Música
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Theatre')"
        :class="[categorySelected === 'Theatre' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Theatre' ? 'page' : 'false']"
      >
        <BaseIcon iconName="theatre">
          <IconTheatre></IconTheatre>
        </BaseIcon>Teatro
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Museum')"
        :class="[categorySelected === 'Museum' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Museum' ? 'page' : 'false']"
      >
        <BaseIcon iconName="museum">
          <IconMuseum></IconMuseum>
        </BaseIcon>Museos
      </button>
      <button
        :style="style"
        @click="changeStyleAndFilter('Party')"
        :class="[categorySelected === 'Party' ? 'filter-selected' : 'filter-unselected']"
        :aria-current="[categorySelected === 'Party' ? 'page' : 'false']"
      >
        <BaseIcon iconName="party">
          <IconParty></IconParty>
        </BaseIcon>Fiestas
      </button>
      <button
        :style="style"
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

<script>
import { reactive, computed } from 'vue';
import BaseIcon from "../components/BaseIcon.vue";
import IconKids from "../components/icons/IconKids.vue";
import IconSports from "../components/icons/IconSports.vue";
import IconPlay from "../components/icons/IconPlay.vue";
import IconParty from "../components/icons/IconParty.vue";
import IconMuseum from "../components/icons/IconMuseum.vue";
import IconTheatre from "../components/icons/IconTheatre.vue";
import IconMusic from "../components/icons/IconMusic.vue";
import IconBookmark from "../components/icons/IconBookmark.vue";
import IconFood from "../components/icons/IconFood.vue";

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
      categorySelected: "all",
    };
  },
  methods: {
    changeStyleAndFilter(category) {
      this.categorySelected = category
    }
  },
  props: {
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    }
  },
  setup(props) {
    props = reactive(props);
    return {
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      }))
    }
  },

}


</script>

<style scoped>
</style>
