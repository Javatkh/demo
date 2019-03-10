<template>
  <div class="app-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "app-content",
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
  .app-content {
    height: calc(100% - 45px);
  }
</style>
