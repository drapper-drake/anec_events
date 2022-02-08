import AppPagination from './AppPagination.vue';

export default {
  title: 'AnecEvents/Pagination',
  component: AppPagination,
  argTypes: {
    onRestartFilter: {action: "restartFilter"},
    backgroundColor: {control: 'color'},
    bgColorChevron: {control: 'color'},
    color: {control: 'color'}
  }
};

const Template = (args) => ({
    components: {AppPagination},
    setup(){
      return {args}
    },
    template: "<AppPagination v-bind='args' />"

});


export const pagination = Template.bind({});
pagination.args = {};
pagination.parameters = {};
