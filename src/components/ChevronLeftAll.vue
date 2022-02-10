<template>
  <button>
    <slot></slot>
    <svg width="20" height="24" viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.828 2.547 2.172 14.5l12.656 11.953"
        stroke="#023e73"
        stroke-width="4.419"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="matrix(.26458 0 0 .26458 -.017 -.116)"
        style="fill:none"
      />
      <path
        d="M14.828 2.547 2.172 14.5l12.656 11.953"
        stroke="#023e73"
        stroke-width="4.419"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="matrix(.26458 0 0 .26458 2.766 -.116)"
        style="fill:none"
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
