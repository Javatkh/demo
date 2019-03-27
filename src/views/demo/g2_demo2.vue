<template>
  <div class="g2_demo2" id="g2_demo2">
    <div id="c1"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
// 引入element-resize-detector  https://blog.csdn.net/qq_39852145/article/details/83418897    
var elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "g2_demo2",
  computed: {},
  data() {
    return {
      data: [
        {
          year: "1991",
          value: 15468
        },
        {
          year: "1992",
          value: 16100
        },
        {
          year: "1993",
          value: 15900
        },
        {
          year: "1994",
          value: 17409
        },
        {
          year: "1995",
          value: 17000
        },
        {
          year: "1996",
          value: 31056
        },
        {
          year: "1997",
          value: 31982
        },
        {
          year: "1998",
          value: 32040
        },
        {
          year: "1999",
          value: 33233
        }
      ],
      width:'',
      height:'',
    };
  },
  methods: {},
  mounted() {
    var erd = elementResizeDetectorMaker();
    var erdUltraFast = elementResizeDetectorMaker({
      strategy: "scroll" //<-For ultra performance.
    });
    erd.listenTo(document.getElementById("g2_demo2"),element =>{
      this.$data.width = element.offsetWidth;
      this.$data.height = element.offsetHeight;
      console.log(this.$data.width)
      console.log("Size: " + element.offsetWidth + "x" + element.offsetHeight);
    });
    // erd.listenTo(document.getElementById("g2_demo2"), function(element) {
    //   var width = element.offsetWidth;
    //   var height = element.offsetHeight;
    //   console.log("Size" + width + "x" + height);
    // });
    console.log(this.$data.height)
    var chart = new G2.Chart({
      container: "c1",
      // forceFit: true,
      // width: this.$data.width,
      // height: this.$data.height,
      // height: window.innerHeight,
      // width:800,
      // height:400,
    });

    chart.source(this.data);

    // 度量计算
    chart.scale({
      value: {
        min: 10000
      },
      year: {
        range: [0, 1]
      }
    });

    // 坐标轴计算
    chart.axis("value", {
      // 刻度文本
      label: {
        formatter: function formatter(val) {
          return (val / 1000).toFixed(1) + "k";
        }
      }
    });

    // 提示信息
    chart.tooltip({
      // 辅助线 默认为垂直辅助线
      crosshairs: {
        type: "line"
      }
    });

    chart
      .area()
      .position("year*value")
      .label("value", {
        // 提示框文本显示样式
        textStyle: {
          textAlign: "start" // 文本对齐方向，可取值为： start middle end
          // fill: 'red', // 文本的颜色
        }
      })
      // 为区域设置样式
      .style({
          fill: "l(90) 0:#ffffff 0.5:#2CB9F0 1:#0028FF"
      })

    // 渐变
    // .opacity(1);

    chart
      // line 不显示折点  point显示折点
      .point()
      .position("year*value")
      // 折点大小 默认空心蓝色
      .size(2)
      //折线转节点处图案形状  从此处可以不写
      .shape("circular")
      .style({
        // 折点边框颜色和大小
        // stroke: "#fff",
        // lineWidth: 2,
      })
    //折线图上线段 
    chart.lineStack().position('year*value');
    chart.render();
  }
};
</script>

<style>
.g2_demo2 {
  height: 100%;
  position: relative;
}
#canvas_1{
  /* width: 300px !important;
  height: 200px !important; */
}
</style>

