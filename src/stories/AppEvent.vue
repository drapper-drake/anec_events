<template>
    <main class="text-bg-light mb-8 flex flex-col items-center">
        <div :style="style" class="container md:shadow-2xl text-lg py-3.5">
            <div class="md:border-solid">
                <AppEventInfo 
                  :nameEvent="nameEvent" 
                  :free="free" 
                  :price="price" 
                  :photoEvent="photoEvent"
                  :site="site"
                  :color="color"
                  :backgroundColor="backgroundColor"
                  :hours="hours"
                  :dateEvent="dateEvent"
                  :textButton="textButton"
                  :category="category"
                  :textBookmark="textBookmark"
                />
                <AppEventShare
                  :color="color" 
                  :backgroundColor="backgroundColor"
                  :linkTickets="linkTickets"
                  :btnInfo="btnInfo"
                />
                <AppEventMap
                  :color="color"
                  :backgroundColor="backgroundColor"
                  :site="site"
                  :comments="comments"
                  :widthIframe="widthIframe"
                  :heighIframe="heighIframe"

                />
            </div>
        </div>
    </main>
</template>


<script>
import { reactive, computed } from 'vue';

import AppEventInfo from './AppEventInfo.vue';
import AppEventShare from './AppEventShare.vue';
import AppEventMap from './AppEventMap.vue';

export default {
  components:{
    AppEventInfo,
    AppEventShare,
    AppEventMap,
  },
  props:{
    nameEvent: {
      type: String
    },
    free:{
      type: Boolean,
    },
    price:{
      type: String
    },
    photoEvent:{
      type: String
    },
    site: {
      type: String
    },
    color:{
      type: String
    },
    backgroundColor: {
        type: String
    },
    hours:{
      type: String
    },
    dateEvent: {
      type: String
    },
    textButton: {
        type: String
    },
    linkTickets: {
      type: Boolean,
      required: true
    },
    btnInfo: {
      type: String,
      default: "Más información",
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
    comments: {
      type: String,
    },
    widthIframe: {
      type: Number,
    },
    heighIframe: {
      type: Number,
    },
    category: {
      type: Array,
      required: true
    },
    textBookmark:{
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
  }
}
</script>

