<script>
export default {
  name: 'robots',
  methods: {
    goRobots() {
      this.$router.push({ path: '/robots.txt' });
    }
  },
  created() {
    this.goRobots();
  },
}
</script>
