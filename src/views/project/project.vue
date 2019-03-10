<template>
  <div class="project">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'project',
    computed: {
      project() {
        let project = this.$store.state.project || this.localStore.get("project");
        return project || {}
      },
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style>
  .project {
    height: 100%;
    position: relative;
  }
</style>

