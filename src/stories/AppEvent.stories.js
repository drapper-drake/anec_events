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
  nameEvent: 'Concierto FSO - Ara Malikian',
  photoEvent: 'https://res.cloudinary.com/ddn278n2q/image/upload/w_500/v1643624853/anac-event/orwyv2s8ctlqaongygzm.png',
  dateEvent: 'Solo el 8 FEB 2022',
  linkTickets: true,
  category: ['Music'],
  free: false,
  price: '38',
  site: 'Teatro Río, Plaça Sant Vicent, 0, 03440 Ibi, Alicante',
  hours: 'De 21:00 a 22:30',
  textButton: 'Añadir al Calendario',
  comments: "Cuando vi a mi hijo caminar por primera vez después de meses de caídas, de intentos fallidos, de golpes y vuelta a probar, entendí que un día todos fuimos esa fuerza que el tiempo hace que olvidemos.Los niños son los seres más auténticos que te puedes encontrar, son salvajes, son la ternura en su esencia y están llenos de una verdad insultante, no tienen miedo a equivocarse, son libres y expresivos y todo lo que hacen está repleto de arte. Si miras a un niño entiendes casi todo lo que fuiste y hace un tiempo que no te permites ser. Esta gira es el resultado de ver crecer a mi hijo, es el resultado de mi crecimiento a su lado, es todos esos sonidos y melodías que intentan darle forma a lo que he sentido y me ha inspirado de él y de la vida a través de él. Es un encuentro con el niño que no pude ser y hubiera soñado ser. Es un homenaje a esos seres que son tan libres como un pájaro libre. Esta gira está llena de dinosaurios, calamares robóticos, máquinas del tiempo, pianos voladores y mimos bilingües, este disco es eso que yo había olvidado y que es tan poderoso; la Magia de encontrar cada día y cada senda fascinantes, traigan lo que traigan.",
  widthIframe: 800,
  heighIframe: 300,
};
Event.parameters = {};
