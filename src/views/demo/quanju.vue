<template>
  <div class="quanju">
    <!-- 父传子，通过属性名传值 -->
    <apploading msg-father="dad无可奉告" @sendVal = "getValueFromChild"></apploading>
    <!-- 拿到子组件的值 -->
  </div>
</template>

<script>
  export default {
    name: 'quanju',
    computed: {
    },
    components:{
      
    },
    data() {
      return {
      }
    },
    methods: {
      getValueFromChild(data){
         console.log(data)
      }
    },
    mounted() {
    }
  }
</script>

<style>
  .quanju {
    height: 100%;
    position: relative;
  }
</style>

