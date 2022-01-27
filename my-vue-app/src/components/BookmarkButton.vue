<script>
export default {
  emits: ['selectedBookmark'],

}
</script>
<template>
  <div class="bookmark" @click.stop="this.$emit('selectedBookmark', event.id)">
    <img v-if="event.bookmark" src="/img/icons/bookmark-selected.svg" />
    <img v-else src="/img/icons/bookmark.svg" />
  </div>
</template>
<style scoped></style>
