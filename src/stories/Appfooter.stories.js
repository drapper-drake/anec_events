import AppFooter from "./AppFooter.vue";

export default {
  title: 'AnecEvents/AppFooter',
  component: AppFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' }
  }
};

const Template = (args) => ({
  components: { AppFooter },
  setup() {
    return { args };
  },
  template: '<AppFooter v-bind="args" />',
});

export const UpBtn = Template.bind({});
UpBtn.args = {};
