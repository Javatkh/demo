<template>
  <div class="g2_demo">
    <!-- 柱状图 -->
    <div id="c1"></div>
    <!-- 折线图 -->
    <div id="c2"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  name: "g2_demo",
  computed: {},
  data() {
    return {
      // 柱状图数据
      data1: [
        {
          year: "1951 年",
          sales: 38
        },
        {
          year: "1952 年",
          sales: 52
        },
        {
          year: "1956 年",
          sales: 61
        },
        {
          year: "1957 年",
          sales: 145
        },
        {
          year: "1958 年",
          sales: 48
        },
        {
          year: "1959 年",
          sales: 38
        },
        {
          year: "1960 年",
          sales: 38
        },
        {
          year: "1962 年",
          sales: 38
        }
      ],
      // 折线图数据
      data2: [
        {
          year: "1991",
          value: 3
        },
        {
          year: "1992",
          value: 4
        },
        {
          year: "1993",
          value: 3.5
        },
        {
          year: "1994",
          value: 5
        },
        {
          year: "1995",
          value: 4.9
        },
        {
          year: "1996",
          value: 6
        },
        {
          year: "1997",
          value: 7
        },
        {
          year: "1998",
          value: 9
        },
        {
          year: "1999",
          value: 13
        }
      ]
    };
  },
  methods: {},
  mounted() {
    // 柱状图
    var chart1 = new G2.Chart({
      container: "c1",
      // 是否自适应
      // forceFit: true,
      width: 600,
      // height: window.innerHeight
      height: 300
    });
    // 加载数据
    chart1.source(this.data1);
    //
    chart1.scale("sales", {
      tickInterval: 20
    });
    chart1.interval().position("year*sales");
    chart1.render();

    // 折线图
    var chart2 = new G2.Chart({
      container: "c2",
      // 是否自适应
      // forceFit: true,
      width:600,
      height: 300
    });
    chart2.source(this.data2);
    chart2.scale("value", {
      min: 0
    });
    chart2.scale("year", {
      range: [0, 1]
    });

    // 提示信息
    chart2.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    // 提示信息内容
    chart2.line().position('year*value');
    chart2.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart2.render();
      }
    };
</script>

<style>
.g2_demo {
  height: 100%;
  position: relative;
}
</style>

