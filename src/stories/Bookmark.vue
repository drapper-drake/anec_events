<template>
  <div @click="click" class="bookmark tooltip">
    <button>
      <img
        :src="[bookmarkBoolean ? '/img/icons/bookmark-selected.svg' : '/img/icons/bookmark.svg']"
        alt="Añadir a favoritos"
      />
      <span class="tooltip-text">{{ textFilter }}</span>
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      bookmarkBoolean: false,

    }
  },

  props: {
    textFilter: {
      type: String,
      required: true,
    },
  },

  methods: {
    click() {       this.bookmarkBoolean = !this.bookmarkBoolean     }
  },

}
</script>
