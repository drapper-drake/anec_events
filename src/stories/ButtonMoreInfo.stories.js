import ButtonMoreInfo from "./ButtonMoreInfo.vue";


export default {
  title: 'AnecEvents/Buttons',
  component: ButtonMoreInfo,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'}
  }
};

const Template = (args) =>({
  components: {ButtonMoreInfo},
  setup(){
    return{args};
  },
  template:'<ButtonMoreInfo v-bind="args" />',
});


export const btnMoreInfo = Template.bind({});
btnMoreInfo.args = {
  textFilter: 'Más información'
};
btnMoreInfo.parameters = {};