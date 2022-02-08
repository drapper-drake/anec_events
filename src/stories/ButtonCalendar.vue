<template>
  <button class="btn-calendar" :style="style"> 
       <p>{{textFilter}}</p> 
  </button> 
</template>


<script>
import { reactive, computed } from 'vue';

export default{
  props:{
    textFilter:{
      type: String,
      required: true,
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