<template>
    <div id="main" style="width: 14rem;height:calc(100vh - 1.3rem); margin: 0 0.5rem;">
      
    </div>
  </template>
  
  <script>
  import { soilEcharts } from '@/echarts/echart';
  export default {
      data() {
          return {
          
        }
      },
      mounted() {
          soilEcharts('main')
      }
  }
  </script>
  
  <style lang="less" scoped>
  </style>
  