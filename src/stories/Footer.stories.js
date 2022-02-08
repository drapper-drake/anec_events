import Footer from "./Footer.vue";

export default {
  title: 'AnecEvents/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' }
  }
};

const Template = (args) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<Footer v-bind="args" />',
});

export const MyFooter = Template.bind({});
MyFooter.args = {};
