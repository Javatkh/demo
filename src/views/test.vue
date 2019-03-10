<template>
  <div id="app">
    <div id="mountNode"></div>
  </div>
</template>

<script>
  import G6 from '@antv/g6';
  export default {
    name: 'app',
    computed: {
    },
    data() {
      return {
        nodes:[],
        edges:[],
      }
    },
    methods: {
      
    },
    mounted(){
      this.$post("/action", {})
      .then(data => {
        this.$data.nodes = data.nodes,
        this.$data.edges = data.edges
        // 绘制
        const graph = new G6.Graph({
          container: 'mountNode',
          width: 500,
          height: 500
        });
        // console.log(data)
        graph.read(this.$data);
      })
      
    },
    props: {
      
    }
  }
</script>

<style scoped>
  
</style>

