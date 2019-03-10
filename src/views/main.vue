<template>
  <div id="app">
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 内容区 -->
    <app-content>
      <router-view></router-view>
    </app-content>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
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
  #app {
    height: 100%;
    position: relative;
  }
</style>

