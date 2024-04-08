<template>
    <div class="static">
      <el-divider>设备信息</el-divider>
      <el-descriptions border>
        <el-descriptions-item label="设备编号">{{devInfo.devID}}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{devInfo.AliasName}}</el-descriptions-item>
        <el-descriptions-item label="设备型号">
          <el-tag size="small">{{devInfo.devType}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      
      <el-descriptions title="最新数据" border>
        <template slot="extra">
          <el-button type="primary" @click="getDevData" size="small">查看历史数据</el-button>
        </template>
        <el-descriptions-item label="更新时间">{{devLastData.TIME}}</el-descriptions-item>
        <el-descriptions-item label="设备位置">{{realPosition?realPosition:devInfo.position}}</el-descriptions-item>
        <el-descriptions-item label="设备电量">
          <el-progress text-color="#fff" :text-inside="true" :stroke-width="28" :percentage="devLastData?.POWER" :color="customColors"></el-progress>
        </el-descriptions-item>
        <el-descriptions-item label="信号质量">{{devLastData.CSQ}}</el-descriptions-item>
        <el-descriptions-item label="空气温度">{{devLastData.DataAT ? `${devLastData.DataAT}°C`: '暂无数据'}}</el-descriptions-item>
        <el-descriptions-item label="空气压强">{{devLastData.DataATM ? `${(devLastData.DataATM/1000).toFixed(2)}kPa` : '暂无数据'}}</el-descriptions-item>
      </el-descriptions>
      <div class="chart">
        <div id="main"></div>
        <div class="table">
          <p>土壤数据表格</p>
          <el-table
          :data="tableData"
          v-if="tableData[0]?.ec===undefined"
          style="width: 100%"
          border
          >
          <el-table-column
            prop="depth"
            label="土壤深度"
            width="150">
          </el-table-column>
          <el-table-column
            prop="temp"
            label="温度(°C)"
            width="150">
          </el-table-column>
          <el-table-column
            prop="swc"
            label="湿度(%)"
            >
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData"
          style="width: 100%"
          v-if="tableData[0]?.ec!==undefined"
          border
          >
          <el-table-column
            prop="depth"
            label="土壤深度"
            width="120">
          </el-table-column>
          <el-table-column
            prop="temp"
            label="温度(°C)"
            width="110">
          </el-table-column>
          <el-table-column
            prop="swc"
            label="湿度(%)"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="ec"
            label="电导率(ms/cm)"
            >
          </el-table-column>
        </el-table> 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  src="https://webapi.amap.com/maps?v=2.0&key=fed48757e9e0d4561ed80ec67752731a&plugin=AMap.Geocoder">
  </script>
  <script>
  import { getDevLastData } from '@/request/api/static';
  import { lineEcharts } from '@/echarts/echart';
  export default {
    data() {
      return {
        devLastData:{},
        devInfo:[],
        tableData: [],
        realPosition: '',
        echartsData: {
        },
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      }
    },
    methods: {
      addmarker(LNG,LAT) {
            var geocoder = new AMap.Geocoder({
                //city: "010", //城市设为北京，默认：“全国”
                //radius: 1000 //范围，默认：500
            });

            geocoder.getAddress([LNG, LAT], (status, result)=>{
                if (status === 'complete'&&result.regeocode) {
                    const res=result.regeocode.addressComponent;
                    this.realPosition = `${res.province}${res.district}${res.township}${res.street}`;
                }else{
                  log.error('根据经纬度查询地址失败');
                }
            });
        },
      processData(DataSWCStr, DataTEMPStr, DataECStr) {
          const swcArray = DataSWCStr.split(',').map(parseFloat);
          const tempArray = DataTEMPStr.split(',').map(parseFloat);
          const ecArray = DataECStr?.split(',').map(parseFloat);
          const dataTable = [];
          const depthArray = [10,20,40,60,80];
          for (let i = 0; i < swcArray.length; i++) {
              const depth = depthArray[i];
              const swc = swcArray[i];
              const temp = tempArray[i];
              const dataPoint = {
                  'depth': depth+'cm',
                  'swc': swc,
                  'temp': temp, 
              };
              if(ecArray){
                  const ec = ecArray[i];
                  dataPoint['ec'] = ec;}
              dataTable.push(dataPoint);
          }
          return dataTable;
      },
      getDevData(){
        const devID=JSON.parse(sessionStorage.getItem('devInfo')).devID
        console.log(devID);
        this.$router.push({path:'/active',query:{devID:devID}})
      }
    },
    mounted() {
      const UserID=JSON.parse(sessionStorage.getItem('UserID'))
      this.devInfo=JSON.parse(sessionStorage.getItem('devInfo'))
      getDevLastData(UserID,this.devInfo.devID).then(res=>{
        this.devLastData=res.data.devLastData[0]
        if(this.devLastData.CSQ>=25) this.devLastData.CSQ='优'
        else if(this.devLastData.CSQ>=20) this.devLastData.CSQ='良'
        else if(this.devLastData.CSQ>=15) this.devLastData.CSQ='中'
        else this.devLastData.CSQ='差'
        this.tableData=this.processData(this.devLastData.DataSWCStr,this.devLastData.DataTEMPStr,this.devLastData.DataECStr)
        this.echartsData.depth=this.devLastData.DataTEMPStr.split(',').length===3?
                                ['10cm','20cm','40cm']:['10cm','20cm','40cm','60cm','80cm']
        this.echartsData.temp=this.devLastData.DataTEMPStr.split(',').map(parseFloat)
        this.echartsData.swc=this.devLastData.DataSWCStr.split(',').map(parseFloat)
        this.echartsData.ec=this.devLastData.DataECStr?.split(',').map(parseFloat)
        this.$nextTick(()=>{
          lineEcharts('main',this.echartsData)
        })
      })
      this.addmarker(this.devInfo.LNG+0.006164,this.devInfo.LAT+0.001512);
    }
  }
  </script>
  <style lang="less" scoped>
  .static{
    margin: 0 .2rem;
  }
  /deep/ .el-descriptions__header{
    margin-bottom: 0;
  }
  /deep/ .el-descriptions__title{
    margin-left: 7rem;
    width: 1rem;
    text-align: center;
  }
  /deep/ .el-descriptions__extra{
    margin:0.0625rem 1rem 0.0625rem 0;
  }
  .el-progress--line {
        width: 6.25rem;     
    }
  .el-divider--horizontal{
      margin-left: 4.5rem;
      width: 6rem;    
  }
  .chart{
    display: flex;
    flex-direction: row;
    margin-top: 0.125rem;
    .table{
      flex:1;
      p{
        text-align: center;
        font-size: 0.2rem;
        font-weight: 600;
        color: rgb(110, 123, 134);
        margin-bottom: 0.2rem;
      }
    }
  }
  #main{
    width: 9rem;
    height: 3.5rem;
    padding-right: 0.3rem;
  }
  /deep/ .cell{
    text-align: center;
  }
  /deep/ .el-table th{
    background-color: rgb(145, 228, 240) !important;
    .cell{
        font-size: 0.2rem;
        font-weight: 600;
    }
  }
  </style>