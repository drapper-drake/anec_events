//import AppCards from "../components/AppCards.vue";
import AppCards from "./Cards.vue"

export default {
  title: 'AnecEvents/Cards',
  component: AppCards,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'}
  }
};
const Template = (args) =>({
  components: {AppCards},
  setup(){
    return{args};
  },
  template:'<AppCards v-bind="args" />',
});

export const Cards = Template.bind({});
Cards.args = {
  nameEvent: 'Del informalismo a la abstracción mediterránea',
  photoEvent: 'https://res.cloudinary.com/dlwvv3xmg/image/upload/w_500/v1641060841/MUBAG_-_Del_informalismo_a_la_abstracci%C3%B3n_mediterr%C3%A1nea_a7ztsm.png',
  cityLocation: 'Alicante',
  dateEvent: 'Del 22 DIC al 31 DIC 2022',
  category: ['Museum'],
  free: true,
  
};

export const CardsPay = Template.bind({});
CardsPay.args = {
  nameEvent: 'UNA NOCHE CON LUIS COBOS',
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1642598144/anac-event/f3pkkwykhttwglpgfcvh.png',
  cityLocation: 'Alicante',
  dateEvent: 'Solo el 8 FEB 2022',
  category: ['Music'],
  free: false,

};
Cards.parameters = {};