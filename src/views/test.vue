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
      this.$post("/action",{
        data: {
          nodes: [{
            id: 'node1',  //id唯一
            color: '#333',           // 颜色
            x: 100,  //距离左侧距离
            y: 200   //距离右侧距离
          },{
            id: 'node2',
            x: 300,
            y: 200
          }],
          //  边的数据模型
          edges: [{
            id: 'edge1',
            color: 'red',          // 颜色
            target: 'node2', //目标节点
            source: 'node1' //源节点
          }]
        }
      })
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

