<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="vista"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :class="iconColor">
      <slot />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 25
    },
    height: {
      type: [Number, String],
      default: 25
    },
    iconColor: {
      type: [String, Array],
      default: 'fill-white'
    }
  },
  data() {
    return {
      vista: this.whichViewBox()
    }
  },
  methods: {
    whichViewBox() {
      const rectangleCasesViewBox = ["Kids", "Play"]
      // let viewBox = "0 0 50 50"
      let viewBox = `0 0 ${this.width * 2} ${this.height * 2} `
      if (rectangleCasesViewBox.includes(this.iconName)) {
        viewBox = "0 0 60 50"
      }
      if (this.iconName === "Bookmark") {
        viewBox = `0 0 ${this.width} ${this.height} `
      }
      return viewBox;

    }
  }
}
</script>
