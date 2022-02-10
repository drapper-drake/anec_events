<template>
  <button>
    <slot></slot>
    <svg width="20" height="22" viewBox="0 0 17 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.8281 2.54688L2.17188 14.5L14.8281 26.4531"
        stroke="#023E73"
        stroke-width="4.419"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
<script>

</script>
<style scoped>
button:hover path {
  stroke: #f2f2f2;
}
</style>
