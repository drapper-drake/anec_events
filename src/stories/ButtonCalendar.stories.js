import ButtonCalendar from "./ButtonCalendar.vue";


export default {
  title: 'AnecEvents/Buttons',
  component: ButtonCalendar,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'}
  }
};

/* <button @click="requestCalendar(eventID)" class="btn-calendar">Añadir al calendario</button>

requestCalendar(e) {
      e.preventDefault;
      e.stopPropagation;
      let start = dayjs(e.dateStart).format("YYYYMMDD");
      let end = dayjs(e.dateStart).add(1, "days").format("YYYYMMDD");
      if (e.hasOwnProperty("dateFinal")) {
        end = dayjs(e.dateFinal).add(1, "days").format("YYYYMMDD");
      }
      const URL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${e.nameEvent}&location=${e.site}&dates=${start}/${end}`;
      window.open(URL, "_blank");
*/
const Template = (args) =>({
  components: {ButtonCalendar},
  setup(){
    return{args};
  },
  template:'<ButtonCalendar v-bind="args" />',
});


export const btnCalendar = Template.bind({});
btnCalendar.args = {
  calendar: true,
  textFilter: 'Añadir al calendario'
};
btnCalendar.parameters = {};