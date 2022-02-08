import AppInputDate from "./AppInputDate.vue";

export default {
  title: 'AnecEvents/InputDate',
  component: AppInputDate,
  argTypes: {
    backgroundColor: {control: 'color'},
    color: {control: 'color'},
    textStartDate: {control: 'text'},
    textEndDate: {control: "text"},
    backgroundButton: {control: "color"},
    colorButton: {control: "color"}
  }
};

const Template = (args) => ({
  components: {AppInputDate},
  setup(){
    return {args};
  },
  template: "<AppInputDate v-bind='args' />"
});

export const InputDate = Template.bind({});
InputDate.args = {

  textStartDate: "Desde el día",
  textEndDate: "Hasta el día",
};
InputDate.parameters = {};
