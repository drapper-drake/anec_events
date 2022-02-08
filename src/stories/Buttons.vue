<template>
  <div>
    <button :style="style" :class="[primary ? 'filter-selected' : 'filter-unselected']"> 
      <p>{{textFilter}}</p>
    </button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default{
  props:{
    textFilter:{
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    calendar:{
      type: Boolean,
      default: false,
    },
    
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    }
  },
    
    emits: ['click'],

 setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      })),
      onClick() {
        emit('click');
      }
    }
  },
}
</script>