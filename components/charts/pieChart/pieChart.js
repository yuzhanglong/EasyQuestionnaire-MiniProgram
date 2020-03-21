import * as echarts from '../ec-canvas/echarts';


Component({
    properties: {
      backGroundColor: String,
      chartColor: Array,
      chartData: Array,
      width: Number,
      height: Number
    },
    data: {
      ec: {
        lazyLoad: true
      }
    },
    lifetimes: {
      created() {
        this.ecComponent = this.selectComponent('.mychart-dom-bar');

      },
      attached() {
        this.initPieChart();
      }
    },
    methods: {
      initPieChart() {
        this.ecComponent.init((canvas, width, height, dpr) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          this.setOption(chart);
          this.chart = chart;
          return chart;
        })
      },
      setOption(chart) {
        console.log(this.properties);
        const option = {
          backgroundColor: this.properties.backGroundColor || "#ffffff",
          color: this.properties.chartColor || ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
          series: [{
            label: {
              normal: {
                fontSize: 14
              }
            },
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: this.properties.chartData || [{value: 55, name: '测试数据'}]
          }]
        };
        chart.setOption(option);
      }
    }
  }
);

