<template>
  <div class="app-module-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "app-module-content",
    computed: {
    },
    props: [
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
  .app-module-content {
    height: calc(100% - 80px);
    padding: 20px 40px;
  }
</style>
