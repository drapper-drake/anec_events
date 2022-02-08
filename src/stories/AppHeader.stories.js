import AppHeader from './AppHeader.vue';

export default {
  title: 'AnecEvents/Header',
  component: AppHeader,
  argTypes: {
    onRestartFilter: {action: "restartFilter"},
    backgroundColor: {control: 'color'},
    color: {control: 'color'}
  }
};

const Template = (args) => ({
    components: {AppHeader},
    setup(){
      return {args}
    },
    template: "<AppHeader v-bind='args' />"

});


export const Header = Template.bind({});
Header.args = {};
Header.parameters = {};

