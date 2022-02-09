import AppFilter from "./AppFilter.vue";

export default {
  title: 'AnecEvents/AppFilter',
  component: AppFilter,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'},
  }
};
const Template = (args) =>({
  components:  {AppFilter},
  setup(){
    return{args};
  },
  template:' <AppFilter v-bind="args" />',
});


export const filter = Template.bind({});
filter.args = {
};
filter.parameters = {};
