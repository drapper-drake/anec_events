import AppEvent from "./AppEvent.vue";

export default {
  title: 'AnecEvents/AppEvent',
  component: AppEvent,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'},
    nameEvent: {control: 'text'},
    price: {control: 'text'},
    photoEvent: {control: 'text'},
    site: {control: 'text'},
    hours: {control: 'text'},
    textButton: {control: 'text'},
    linkTickets: {control: 'boolean'},
    btnInfo: {control: 'text'},
    heighIframe: {control: 'number'},
    widthIframe: {control: 'number'},
    comments: {control: 'text'}
    
  }
};
const Template = (args) =>({
  components: {AppEvent},
  setup(){
    return{args};
  },
  template:'<AppEvent v-bind="args" />',
});

export const Event = Template.bind({});
Event.args = {
  nameEvent: 'UNA NOCHE CON LUIS COBOS',
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1642598144/anac-event/f3pkkwykhttwglpgfcvh.png',
  dateEvent: 'Solo el 8 FEB 2022',
  linkTickets: true,
  category: ['Music'],
  free: false,
  price: '20',
  site: 'Teatro Principal Alicante',
  hours: '20:00',
  textButton: 'Añadir al Calendario',
  comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  widthIframe: 800,
  heighIframe: 300,
};
Event.parameters = {};