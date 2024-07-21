import * as echarts from 'echarts';
import china from './map/json/china.json';

export function lineEcharts(id,data) {
  var myChart = echarts.init(document.getElementById(id));
  //配置图表
  const colors = ['#5470C6', '#91CC75', '#EE6666'];
  if(data.ec!==undefined){
      var option = {
        color: colors,
        title: {
          text: '土壤参数图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['土壤温度', '土壤湿度', '土壤电导率']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: data.depth
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '土壤温度',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '土壤湿度',
            position: 'left',
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '土壤电导率',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
          series: [
            {
              name: '土壤温度',
              type: 'bar',
              data: data.temp,
              
            },
            {
              name: '土壤湿度',
              type: 'bar',
              data: data.swc,
              yAxisIndex: 1,
            },
            {
              name: '土壤电导率',
              type: 'line',
              data: data.ec,
              yAxisIndex: 2,
            }
          ]
        }
      myChart.setOption(option);
      
      return
  } 
  var option = {
      title: {
        text: '土壤参数图'
      },
      tooltip: {
        trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
      },
      legend: {
        data: ['土壤温度', '土壤湿度']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        //boundaryGap: false,
        data: data.depth
      },
      yAxis: [
        {
          type: 'value',
          name: '土壤温度',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        {
          type: 'value',
          name: '土壤湿度',
          position: 'right',
          alignTicks: true,
          //offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} %'
          }
        }],
      series: [
        {
          name: '土壤温度',
          type: 'bar',
          data: data.temp
        },
        {
          name: '土壤湿度',
          type: 'bar',
          data: data.swc,
          yAxisIndex: 1,
        }
      ]
    }
  myChart.setOption(option);
  window.addEventListener("resize",()=> {//监听浏览器窗口大小
    myChart.resize();
  });
}

export function lineEcharts1(id,data) {
    var myChart = echarts.init(document.getElementById(id));
    //配置图表
    if(data.ec!==undefined){
        var option = {
            title: {
              text: '土壤数据折线图'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['土壤温度', '土壤湿度','土壤电导率']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data.depth
            },
            yAxis: {
              type: 'value',
              axisLine:{
                onZero:false
              },
              offset:10
            },
            series: [
              {
                name: '土壤温度',
                type: 'line',
                data: data.temp
              },
              {
                name: '土壤湿度',
                type: 'line',
                data: data.swc
              },
              {
                name: '土壤电导率',
                type: 'line',
                data: data.ec
              }
            ]
          }
        myChart.setOption(option);
        
        return
    } 
    var option = {
        title: {
          text: '土壤温湿度折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['土壤温度', '土壤湿度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.depth
        },
        yAxis: {
          type: 'value',
          axisLine:{
            onZero:false
          },
          offset:10
        },
        series: [
          {
            name: '土壤温度',
            type: 'line',
            data: data.temp
          },
          {
            name: '土壤湿度',
            type: 'line',
            data: data.swc
          }
        ]
      }
    myChart.setOption(option);
    window.addEventListener("resize",()=> {//监听浏览器窗口大小
      myChart.resize();
    });
}
export function lineTotalEcharts(id,data) {
    var myChart = echarts.init(document.getElementById(id));
    //配置图表
    if(data.DataTEMPStr3.length>0){
        var option = {
            title: {
              text: '土壤数据图',
            },
            tooltip: {
              trigger: 'axis',
              
            position: function (point, params, dom, rect, size) {
                // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                // 提示框位置
                var x = 0; // x坐标位置
                var y = 0; // y坐标位置
            
                // 当前鼠标位置
                var pointX = point[0];
                var pointY = point[1];
            
                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];
            
                // 提示框大小
                var boxWidth = size.contentSize[0];
                var boxHeight = size.contentSize[1];
            
                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                x = 5;
                } else { // 左边放的下
                x = pointX - boxWidth;
                }
            
                // boxHeight > pointY 说明鼠标上边放不下提示框
                if (boxHeight > pointY) {
                y = 5;
                } else { // 上边放得下
                y = pointY - boxHeight;
                }
            
                return [x, y];
            }},
            legend: {
                orient: 'horizontal',
                right: 'center',
              data: ['10cm处温度','20cm处温度','40cm处温度','60cm处温度','80cm处温度','10cm处湿度','20cm处湿度','40cm处湿度','60cm处湿度','80cm处湿度','电量','空气温度','空气压强'],
              selected: {
                '电量':false,
                '空气温度':false,
                '空气压强':false
              }
            },
            grid: {
              top:'25%',  
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data.TIME
            },
            yAxis: {
              type: 'value',
              axisTick: {
                show: true, // 显示刻度
                interval: 20// 指定刻度间隔
              },

              offset:10
            },
            series: [
              {
                name: '10cm处温度',
                type: 'line',
                data: data.DataTEMPStr
              },
              {
                name: '20cm处温度',
                type: 'line',
                data: data.DataTEMPStr1
              },
              {
                name: '40cm处温度',
                type: 'line',
                data: data.DataTEMPStr2
              },
              {
                name: '60cm处温度',
                type: 'line',
                data: data.DataTEMPStr3
              },
              {
                name: '80cm处温度',
                type: 'line',
                data: data.DataTEMPStr4
              },
              {
                name: '10cm处湿度',
                type: 'line',
                data: data.DataSWCStr
              },
              {
                name: '20cm处湿度',
                type: 'line',
                data: data.DataSWCStr1
              },
              {
                name: '40cm处湿度',
                type: 'line',
                data: data.DataSWCStr2
              },
              {
                name: '60cm处湿度',
                type: 'line',
                data: data.DataSWCStr3
              },
              {
                name: '80cm处湿度',
                type: 'line',
                data: data.DataSWCStr4
              },
              {
                name: '电量',
                type: 'line',
                data: data.POWER
              },
              {
                name: '空气温度',
                type: 'line',
                data: data.DataAT
              },
              {
                name: '空气压强',
                type: 'line',
                data: data.DataATM
              }
            ]
          }
        myChart.setOption(option);
        return 
    }
    if(data.DataECStr.length>0){
        var option = {
            title: {
              text: '土壤数据图'
            },
            tooltip: {
                trigger: 'axis',
                
              position: function (point, params, dom, rect, size) {
                  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                  // 提示框位置
                  var x = 0; // x坐标位置
                  var y = 0; // y坐标位置
              
                  // 当前鼠标位置
                  var pointX = point[0];
                  var pointY = point[1];
              
                  // 外层div大小
                  // var viewWidth = size.viewSize[0];
                  // var viewHeight = size.viewSize[1];
              
                  // 提示框大小
                  var boxWidth = size.contentSize[0];
                  var boxHeight = size.contentSize[1];
              
                  // boxWidth > pointX 说明鼠标左边放不下提示框
                  if (boxWidth > pointX) {
                  x = 5;
                  } else { // 左边放的下
                  x = pointX - boxWidth;
                  }
              
                  // boxHeight > pointY 说明鼠标上边放不下提示框
                  if (boxHeight > pointY) {
                  y = 5;
                  } else { // 上边放得下
                  y = pointY - boxHeight;
                  }
              
                  return [x, y];
              }},
            legend: {
                orient: 'horizontal',
                right: 'center',
              data: ['10cm处温度','20cm处温度','40cm处温度','10cm处湿度','20cm处湿度','40cm处湿度','10cm处电导率','20cm处电导率','40cm处电导率','电量','空气温度','空气压强'],
              selected: {
                '电量':false,
                '空气温度':false,
                '空气压强':false
              }
            },
            grid: {
              top:'25%',  
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data.TIME
            },
            yAxis: {
              type: 'value',
              axisLine:{
                onZero:false
              },
              offset:10
            },
            series: [
              {
                name: '10cm处温度',
                type: 'line',
                data: data.DataTEMPStr
              },
              {
                name: '20cm处温度',
                type: 'line',
                data: data.DataTEMPStr1
              },
              {
                name: '40cm处温度',
                type: 'line',
                data: data.DataTEMPStr2
              },
              {
                name: '10cm处湿度',
                type: 'line',
                data: data.DataSWCStr
              },
              {
                name: '20cm处湿度',
                type: 'line',
                data: data.DataSWCStr1
              },
              {
                name: '40cm处湿度',
                type: 'line',
                data: data.DataSWCStr2
              },
              {
                name: '10cm处电导率',
                type: 'line',
                data: data.DataECStr
              },
              {
                name: '20cm处电导率',
                type: 'line',
                data: data.DataECStr1
              },
              {
                name: '40cm处电导率',
                type: 'line',
                data: data.DataECStr2
              },
              {
                name: '电量',
                type: 'line',
                data: data.POWER
              },
              {
                name: '空气温度',
                type: 'line',
                data: data.DataAT
              },
              {
                name: '空气压强',
                type: 'line',
                data: data.DataATM
              }
            ]
          }
        myChart.setOption(option);
        return 
    }
    var option = {
        title: {
          text: '土壤数据图'
        },
        tooltip: {
            trigger: 'axis',
            
          position: function (point, params, dom, rect, size) {
              // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
              // 提示框位置
              var x = 0; // x坐标位置
              var y = 0; // y坐标位置
          
              // 当前鼠标位置
              var pointX = point[0];
              var pointY = point[1];
          
              // 外层div大小
              // var viewWidth = size.viewSize[0];
              // var viewHeight = size.viewSize[1];
          
              // 提示框大小
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1];
          
              // boxWidth > pointX 说明鼠标左边放不下提示框
              if (boxWidth > pointX) {
              x = 5;
              } else { // 左边放的下
              x = pointX - boxWidth;
              }
          
              // boxHeight > pointY 说明鼠标上边放不下提示框
              if (boxHeight > pointY) {
              y = 5;
              } else { // 上边放得下
              y = pointY - boxHeight;
              }
          
              return [x, y];
          }},
        legend: {
            orient: 'horizontal',
            right: 'center',
  
          data: ['10cm处温度','20cm处温度','40cm处温度','10cm处湿度','20cm处湿度','40cm处湿度','电量','空气温度','空气压强'],
          selected: {
            '电量':false,
            '空气温度':false,
            '空气压强':false
          }
        },
        grid: {
          top:'25%',  
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.TIME
        },
        yAxis: {
          type: 'value',
          axisLine:{
            onZero:false
          },
          offset:10
        },
        series: [
          {
            name: '10cm处温度',
            type: 'line',
            data: data.DataTEMPStr
          },
          {
            name: '20cm处温度',
            type: 'line',
            data: data.DataTEMPStr1
          },
          {
            name: '40cm处温度',
            type: 'line',
            data: data.DataTEMPStr2
          },
          {
            name: '10cm处湿度',
            type: 'line',
            data: data.DataSWCStr
          },
          {
            name: '20cm处湿度',
            type: 'line',
            data: data.DataSWCStr1
          },
          {
            name: '40cm处湿度',
            type: 'line',
            data: data.DataSWCStr2
          },
          {
            name: '电量',
            type: 'line',
            data: data.POWER
          },
          {
            name: '空气温度',
            type: 'line',
            data: data.DataAT
          },
          {
            name: '空气压强',
            type: 'line',
            data: data.DataATM
          }
        ]
      }
    myChart.setOption(option);
    window.addEventListener("resize",()=> {//监听浏览器窗口大小
      myChart.resize();
    });
}


export function soilEcharts(id){  
    echarts.registerMap('china', china); 
    var myChart = echarts.init(document.getElementById(id));
    var option = {
    title: {
        text: "全国墒情",
        x: "center"
    },
    tooltip: {
        trigger: "item"
    },
    dataRange: {
        min: 0,
        max: 60,
        x: "left",
        y: "bottom",
        text: ["饱合", "干旱"],
        color: ["rgb(0, 0, 255)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"],
        calculable: true
    },
    toolbox: {
        show: true,
        orient: "vertical",
        x: "right",
        y: "top",
        feature: {
            /* dataView: {
                show: true,
                readOnly: false
            }, */
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    roamController: {
        mapTypeControl: {
            china: true
        }
    },
    series: [
        {
            name: "体积含水量",
            type: "map",
            mapType: "china",
            roam: true,
            mapValueCalculation: "average",
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: [
                {
                    value: 23.4,
                    name: "北京"
                },
                {
                    value: 32,
                    name: "天津"
                },
                {
                    value: 34,
                    name: "上海"
                },
                {
                    value: 45,
                    name: "重庆"
                },
                {
                    value: 23,
                    name: "河北"
                },
                {
                    value: 30,
                    name: "河南"
                },
                {
                    value: 42,
                    name: "云南"
                },
                {
                    value: 34,
                    name: "辽宁"
                },
                {
                    value: 34.2,
                    name: "黑龙江"
                },
                {
                    value: 39,
                    name: "湖南"
                },
                {
                    value: 36,
                    name: "安徽"
                },
                {
                    value: 25,
                    name: "山东"
                },
                {
                    value: 7,
                    name: "新疆"
                },
                {
                    value: 34,
                    name: "江苏"
                },
                {
                    value: 37,
                    name: "浙江"
                },
                {
                    value: 38,
                    name: "江西"
                },
                {
                    value: 34,
                    name: "湖北"
                },
                {
                    value: 44,
                    name: "广西"
                },
                {
                    value: 22,
                    name: "甘肃"
                },
                {
                    value: 17,
                    name: "山西"
                },
                {
                    value: 23,
                    name: "内蒙古"
                },
                {
                    value: 23,
                    name: "陕西"
                },
                {
                    value: 28,
                    name: "吉林"
                },
                {
                    value: 42,
                    name: "福建"
                },
                {
                    value: 43,
                    name: "贵州"
                },
                {
                    value: 44,
                    name: "广东"
                },
                {
                    value: 32,
                    name: "青海"
                },
                {
                    value: 26,
                    name: "西藏"
                },
                {
                    value: 42,
                    name: "四川"
                },
                {
                    value: 17,
                    name: "宁夏"
                },
                {
                    value: 49,
                    name: "海南"
                },
                {
                    value: 43,
                    name: "台湾"
                },
                {
                    value: 47,
                    name: "香港"
                },
                {
                    value: 43,
                    name: "澳门"
                }
            ]
        }
    ]
    };
    myChart.setOption(option);
    window.addEventListener("resize",()=> {//监听浏览器窗口大小
      myChart.resize();
    });
}