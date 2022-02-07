<template>
<button :class="selectClass[0]"> 
    <p>Todos</p>
    </button>
</template>

<script>
export default{
  data(){
    return {
    selectClass:["filter-selected","filter-unselected"]
    }
  }
}
</script>