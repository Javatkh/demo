<template>
  <div class="app-module-title">
    <div>{{ title }}</div>
    <div>{{ description }}</div>
  </div>
</template>

<script>
  export default {
    name: "app-module-title",
    computed: {
    },
    props: [
      'title',
      'description'
    ],
    data() {
      return {
      };
    },
    methods: {
    }
  };
</script>

<style>
  .app-module-title {
    height: 80px;
    background: linear-gradient(90deg, #3eacf9 0%, #43ceee);
    padding: 0 40px;
    color: #fff;
    font-weight: 500;
  }
  .app-module-title div:first-child {
    font-size: 14px;
    padding-top: 20px;
  }
  .app-module-title div:nth-child(2) {
    font-size: 13px;
    padding-top: 10px;
  }
</style>
