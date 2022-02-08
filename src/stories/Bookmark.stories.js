import Bookmark from "./Bookmark.vue";

export default {
  title: 'AnecEvents/Buttons',
  component: Bookmark,
  argTypes: {
    onClick: {action: 'click'},
    textBookmark: {control: 'text'}
  }
};
const Template = (args) =>({
  components: {Bookmark},
  setup(){
    return{args};
  },
  template:'<Bookmark v-bind="args" />',
});


export const btnBookmark = Template.bind({});
btnBookmark.args = {
  textBookmark: 'Añadir a favoritos'
};
btnBookmark.parameters = {};