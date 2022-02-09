//import AppCards from "../components/AppCards.vue";
import AppCards from "./AppCards.vue"

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
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1644406658/anac-event/jkzr75mshmcrwcmowicq.webp',
  cityLocation: 'Alicante',
  dateEvent: 'Del 22 DIC al 31 DIC 2022',
  category: ['Museum'],
  free: true,

};

export const CardsPay = Template.bind({});
CardsPay.args = {
  nameEvent: 'Concierto FSO - Ara Malikian',
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1643624853/anac-event/orwyv2s8ctlqaongygzm.png',
  cityLocation: 'Alicante',
  dateEvent: 'Solo el 2 ABR 2022',
  category: ['Music'],
  free: false,

};
Cards.parameters = {};
