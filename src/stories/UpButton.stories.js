import UpButton from "./UpButton.vue";

export default {
  title: 'AnecEvents/UpButton',
  component: UpButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    scroll: { control: 'number' }
  }
};

const Template = (args) => ({
  components: { UpButton },
  setup() {
    return { args };
  },
  template: '<UpButton v-bind="args" />',
});

export const UpBtn = Template.bind({});
UpBtn.args = {
  scroll: 505
};
