import AppEventInfo from "./AppEventInfo.vue";

export default {
  title: 'AnecEvents/AppEvent',
  component: AppEventInfo,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'},
    textBookmark: {control: 'text'}
  }
};
const Template = (args) =>({
  components: {AppEventInfo},
  setup(){
    return{args};
  },
  template:'<AppEventInfo v-bind="args" />',
});


export const EventInfo = Template.bind({});
EventInfo.args = {
  nameEvent: 'UNA NOCHE CON LUIS COBOS',
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1642598144/anac-event/f3pkkwykhttwglpgfcvh.png',
  dateEvent: 'Solo el 8 FEB 2022',
  category: ['Music'],
  textBookmark: 'Añadir a Favoritos',
  free: false,
  price: '20',
  site: 'Teatro Principal Alicante',
  hours: '20:00'
};
EventInfo.parameters = {};
