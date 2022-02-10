import AppEventMap from "./AppEventMap.vue";

export default {
  title: 'AnecEvents/AppEvent',
  component: AppEventMap,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'},
    widthIframe: {control: 'number'}
  }
};
const Template = (args) =>({
  components:  {AppEventMap},
  setup(){
    return{args};
  },
  template:' <AppEventMap v-bind="args" />',
});


export const EventMap = Template.bind({});
EventMap.args = {
  comments: "Tres décadas de éxitos internacionales han hecho de Luis Cobos un divulgador de la música instrumental, clásica y popular, y un ícono en la dirección de orquesta. En este magnífico concierto se percibe un trabajo hecho con pasión, constancia, exigencia profesional y energía, que transmite emociones.",
  widthIframe: 400,
  heighIframe: 200,
  site: "Teatro Principal de Alicante, Plaza Ruperto Chapí, s/n, 03001 Alicante."

};
EventMap.parameters = {};
