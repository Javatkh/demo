<template>
  <div class="g2_demo">
    <!-- 柱状图 -->
    <div id="c1"></div>
    <!-- 折线图 -->
    <div id="c2"></div>
    <!-- 仪表盘 -->
    <div class="c4"></div>
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
      ],
      // 图例
      data3: [
        { 部门: "部门0", 小组: "组名0", 完成人数: 37, 未完成人数: 9 },
        { 部门: "部门0", 小组: "组名2", 完成人数: 29, 未完成人数: 10 },
        { 部门: "部门0", 小组: "组名8", 完成人数: 59, 未完成人数: 14 },
        { 部门: "部门0", 小组: "组名9", 完成人数: 60, 未完成人数: 8 },
        { 部门: "部门0", 小组: "组名10", 完成人数: 83, 未完成人数: 14 },
        { 部门: "部门0", 小组: "组名12", 完成人数: 67, 未完成人数: 21 },
        { 部门: "部门0", 小组: "组名14", 完成人数: 46, 未完成人数: 18 },
        { 部门: "部门0", 小组: "组名17", 完成人数: 19, 未完成人数: 27 },
        { 部门: "部门0", 小组: "组名19", 完成人数: 74, 未完成人数: 17 },
        { 部门: "部门1", 小组: "组名15", 完成人数: 34, 未完成人数: 19 },
        { 部门: "部门1", 小组: "组名20", 完成人数: 71, 未完成人数: 25 },
        { 部门: "部门1", 小组: "组名26", 完成人数: 28, 未完成人数: 23 },
        { 部门: "部门1", 小组: "组名29", 完成人数: 90, 未完成人数: 24 },
        { 部门: "部门2", 小组: "组名7", 完成人数: 50, 未完成人数: 5 },
        { 部门: "部门2", 小组: "组名11", 完成人数: 86, 未完成人数: 26 },
        { 部门: "部门2", 小组: "组名13", 完成人数: 63, 未完成人数: 16 },
        { 部门: "部门2", 小组: "组名27", 完成人数: 76, 未完成人数: 2 },
        { 部门: "部门2", 小组: "组名28", 完成人数: 13, 未完成人数: 28 },
        { 部门: "部门3", 小组: "组名1", 完成人数: 33, 未完成人数: 16 },
        { 部门: "部门3", 小组: "组名3", 完成人数: 14, 未完成人数: 1 },
        { 部门: "部门3", 小组: "组名4", 完成人数: 43, 未完成人数: 25 },
        { 部门: "部门3", 小组: "组名16", 完成人数: 45, 未完成人数: 13 },
        { 部门: "部门3", 小组: "组名18", 完成人数: 50, 未完成人数: 21 },
        { 部门: "部门3", 小组: "组名22", 完成人数: 43, 未完成人数: 7 },
        { 部门: "部门3", 小组: "组名23", 完成人数: 38, 未完成人数: 6 },
        { 部门: "部门3", 小组: "组名24", 完成人数: 33, 未完成人数: 24 },
        { 部门: "部门3", 小组: "组名25", 完成人数: 13, 未完成人数: 27 },
        { 部门: "部门4", 小组: "组名5", 完成人数: 98, 未完成人数: 4 },
        { 部门: "部门4", 小组: "组名6", 完成人数: 88, 未完成人数: 12 },
        { 部门: "部门4", 小组: "组名21", 完成人数: 52, 未完成人数: 9 }
      ]
    };
  },
  methods: {
    
  },
  mounted() {
    // 柱状图
    var chart1 = new G2.Chart({
      container: "c1",
      // 是否自适应
      // forceFit: true,
      width: 600,
      // height: window.innerHeight
      height: 300,
    });
    // 加载数据
    chart1.source(this.data1);
    //
    chart1.scale("sales", {
      tickInterval: 20
    });
    chart1.interval().position("year*sales").label('sales',{
      offset: 15,
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fill: 'red', // 文本的颜色
        fontSize: '12', // 文本大小
        fontWeight: 'bold', // 文本粗细
        rotate: 10, 
        textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
      } 
    })
    // .style({
    //   fill: 'l(90) 0:#ffffff 0.5:#00A8FF 1:#83CDF3'
    // });
    chart1.render();

    // 折线图
    var chart2 = new G2.Chart({
      container: "c2",
      // 是否自适应
      // forceFit: true,
      width: 600,
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
        type: "line"
      }
    });
    // 提示信息内容
    chart2.line().position("year*value").label('value');
    chart2
      .point()
      .position("year*value")
      .size(4)
      //折线转节点处图案形状
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    chart2.render();

    //图例
    const chart3 = new G2.Chart({
      container: "c1",
      forceFit: true,
      height: 300,
      padding: [5, 100, 80]
    });
    chart3.source(this.data3);
    chart3.filter("部门", val => {
      return val === "部门0";
    });
    chart3.coord().transpose();
    // 关键代码：设置对应图例的选择模式
    chart3.legend("部门", {
      selectedMode: "single",
      position: "right-bottom",
      hoverable: false
    });
    chart3.legend("完成状态", false);
    chart3.axis("人数", {
      label: {
        formatter: value => {
          value = parseInt(value);
          return Math.abs(value); // 将负数格式化成正数
        }
      }
    });
    chart3
      .interval()
      .position("小组*人数")
      .color("部门")
      .shape("完成状态", ["rect", "hollowRect"])
      .style({
        lineWidth: 1
      });
    chart3.render();
    var Shape = G2.Shape;

    // 自定义Shape 部分
    function creatData() {
      var data4= [];
      var val = Math.random() * 6;
      val = val.toFixed(1);
      data4.push({
        value: val * 1
      });
      return data4;
    }
    Shape.registerShape('point', 'pointer', {
      drawShape: function drawShape(cfg, group) {
        var center = this.parsePoint({ // 获取极坐标系下画布中心点
          x: 0,
          y: 0
        });
        // 绘制指针
        group.addShape('line', {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: 'round'
          }
        });
        return group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: '#fff'
          }
        });
      }
    });

    var color = ['#0086FA', '#FFBF00', '#F5222D'];
    var chart4 = new G2.Chart({
      container: 'c1',
      // forceFit: true,
      // height: window.innerHeight,
      padding: [20, 0, 30, 0],
      animate: false
    });
    chart4.source(creatData());

    chart4.coord('polar', {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      radius: 0.75
    });
    chart4.scale('value', {
      min: 0,
      max: 6,
      tickInterval: 1,
      nice: false
    });

    chart4.axis('1', false);
    chart4.axis('value', {
      zIndex: 2,
      line: null,
      label: {
        offset: -20,
        textStyle: {
          fontSize: 18,
          fill: '#CBCBCB',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      },
      tickLine: {
        length: -24,
        stroke: '#fff',
        strokeOpacity: 1
      },
      grid: null
    });
    chart4.legend(false);
    chart4.point().position('value*1').shape('pointer').color('value', function(val) {
      if (val < 2) {
        return color[0];
      } else if (val <= 4) {
        return color[1];
      } else if (val <= 6) {
        return color[2];
      }
    }).active(false);

    draw(creatData());
    setInterval(function() {
      draw(creatData());
    }, 1000);

    function draw(data) {
      var val = data[0].value;
      var lineWidth = 25;
      chart4.guide().clear();
      // 绘制仪表盘背景
      chart4.guide().arc({
        zIndex: 0,
        top: false,
        start: [0, 0.92],
        end: [6, 0.92],
        style: { // 底灰色
          stroke: '#CBCBCB',
          lineWidth: lineWidth
        }
      });

      val >= 2 && chart4.guide().arc({
        zIndex: 1,
        start: [0, 0.92],
        end: [val, 0.92],
        style: {
          stroke: color[0],
          lineWidth: lineWidth
        }
      });

      val >= 4 && chart4.guide().arc({
        zIndex: 1,
        start: [2, 0.92],
        end: [4, 0.92],
        style: {
          stroke: color[1],
          lineWidth: lineWidth
        }
      });

      val > 4 && val <= 6 && chart4.guide().arc({
        zIndex: 1,
        start: [4, 0.92],
        end: [val, 0.92],
        style: {
          stroke: color[2],
          lineWidth: lineWidth
        }
      });

      val > 2 && val <= 4 && chart4.guide().arc({
        zIndex: 1,
        start: [2, 0.92],
        end: [val, 0.92],
        style: {
          stroke: color[1],
          lineWidth: lineWidth
        }
      });

      val < 2 && chart4.guide().arc({
        zIndex: 1,
        start: [0, 0.92],
        end: [val, 0.92],
        style: {
          stroke: color[0],
          lineWidth: lineWidth
        }
      });

      // 绘制指标数字
      chart4.guide().html({
        position: ['50%', '95%'],
        html: '<div style="width: 300px;text-align: center;">' + '<p style="font-size: 20px; color: #545454;margin: 0;">完成率</p>' + '<p style="font-size: 36px;color: #545454;margin: 0;">' + val * 10 + '%</p>' + '</div>'
      });
      chart4.changeData(data);
    }
  }
}
</script>

<style>
.g2_demo {
  height: 100%;
  position: relative;
}
</style>

