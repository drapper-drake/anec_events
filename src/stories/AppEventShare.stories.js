import AppEventShare from "./AppEventShare.vue";

export default {
  title: 'AnecEvents/AppEvent',
  component: AppEventShare,
  argTypes: {
    backgroundColor: {control: 'color'},
    linkTickets: {control: 'boolean'},
    color: {control: 'color'},
  }
};
const Template = (args) =>({
  components:  {AppEventShare},
  setup(){
    return{args};
  },
  template:' <AppEventShare v-bind="args" />',
});


export const EventShare = Template.bind({});
EventShare.args = {
  linkTickets: true,
  btnInfo: 'Más información'
};
EventShare.parameters = {};
