<template>
    <div>
      <el-descriptions border>
        <el-descriptions-item label="设备编号">{{devInfo.devID}}</el-descriptions-item>
        <el-descriptions-item label="设备别名">{{devInfo.AliasName}}</el-descriptions-item>
        <el-descriptions-item label="设备型号">
          <el-tag size="small">{{devInfo.devType}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="search">
        <el-button type="primary" :class="{ active: button3Active }" @click="handleButtonClick(3)" round size="small">查询近3天数据</el-button>
        <el-button type="primary" :class="{ active: button7Active }" @click="handleButtonClick(7)" round size="small">查询近7天数据</el-button>
        <el-button type="primary" :class="{ active: button15Active }" @click="handleButtonClick(15)" round size="small">查询近15天数据</el-button>
        <span>查询时间范围：</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择起始时间">
        </el-date-picker>
        <span>---</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择结束时间">
        </el-date-picker>
        
        <el-button type="primary"  @click="handleButtonClick(0)" round :disabled="!(startTime&&endTime)">确定</el-button>

      </div>
      <div v-show="showResult">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据表格" name="first">
            <div class="showTitle">
              <p>{{ searchTimeData }}</p>
              <el-button type="primary" @click="handleExport(`${devInfo.devID} ${searchTimeData}`,'#exportTab',{ raw: true })" round size="small" style="right: 0.6rem;">导出 Excel 表 <i class="el-icon-download"></i></el-button>
            </div>
            <el-table :data="tableData" id="exportTab"  highlight-current-row style="width: 100%" height="4.5rem" v-if="tableData[0]?.DataECStr">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="TIME" label="时间"  width="180"></el-table-column>
              <el-table-column label="温度">
                <el-table-column prop="DataTEMPStr" label="10cm"></el-table-column>
                <el-table-column  prop="DataTEMPStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataTEMPStr2" label="40cm"></el-table-column>
              </el-table-column>
              <el-table-column  label="湿度">
                <el-table-column prop="DataSWCStr" label="10cm"></el-table-column>
                <el-table-column prop="DataSWCStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataSWCStr2" label="40cm"></el-table-column>
              </el-table-column>
              <el-table-column  label="电导率">
                <el-table-column prop="DataECStr" label="10cm"></el-table-column>
                <el-table-column prop="DataECStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataECStr2" label="40cm"></el-table-column>
              </el-table-column>
              <el-table-column prop="POWER" label="剩余电量"></el-table-column>
              <el-table-column prop="DataATM" label="大气压强"></el-table-column>
              <el-table-column prop="DataAT" label="空气温度"></el-table-column>
            </el-table>
            <el-table :data="tableData" id="exportTab" highlight-current-row style="width: 100%" height="4.5rem" v-else-if="devInfo.devType.slice(0,4)=='PG5H'">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="TIME" label="时间"  width="180"></el-table-column>
              <el-table-column label="温度">
                <el-table-column prop="DataTEMPStr" label="10cm"></el-table-column>
                <el-table-column  prop="DataTEMPStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataTEMPStr2" label="40cm"></el-table-column>
                <el-table-column  prop="DataTEMPStr3" label="60cm"></el-table-column>
                <el-table-column prop="DataTEMPStr4" label="80cm"></el-table-column>
              </el-table-column>
              <el-table-column  label="湿度">
                <el-table-column prop="DataSWCStr" label="10cm"></el-table-column>
                <el-table-column prop="DataSWCStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataSWCStr2" label="40cm"></el-table-column>
                <el-table-column prop="DataSWCStr3" label="60cm"></el-table-column>
                <el-table-column prop="DataSWCStr4" label="80cm"></el-table-column>
              </el-table-column>
              <el-table-column prop="POWER" label="剩余电量"></el-table-column>
              <el-table-column prop="DataATM" label="大气压强"></el-table-column>
              <el-table-column prop="DataAT" label="空气温度"></el-table-column>
            </el-table>
            <el-table :data="tableData" id="exportTab"  highlight-current-row style="width: 100%" height="4.5rem" v-else>
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="TIME" label="时间"  width="180"></el-table-column>
              <el-table-column label="温度">
                <el-table-column prop="DataTEMPStr" label="10cm"></el-table-column>
                <el-table-column  prop="DataTEMPStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataTEMPStr2" label="40cm"></el-table-column>
              </el-table-column>
              <el-table-column  label="湿度">
                <el-table-column prop="DataSWCStr" label="10cm"></el-table-column>
                <el-table-column prop="DataSWCStr1" label="20cm"></el-table-column>
                <el-table-column prop="DataSWCStr2" label="40cm"></el-table-column>
              </el-table-column>
              <el-table-column prop="POWER" label="剩余电量"></el-table-column>
              <el-table-column prop="DataATM" label="大气压强"></el-table-column>
              <el-table-column prop="DataAT" label="空气温度"></el-table-column>
            </el-table>          
          </el-tab-pane>
          <el-tab-pane label="数据折线图" name="second">
            <div id="main" style="height: 4.4rem;width: 14rem;margin: 0.2rem 0.5rem 0;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  
  <script>
  import { getDevData } from '@/request/api/active'
  import { lineTotalEcharts } from '@/echarts/echart';
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  export default {
    data() {
      return {
        devInfo: {},
        startTime:'',
        endTime:'',
        activeName: 'first',
        showResult: false,
        tableData: [],
        chartData: {},
        button3Active: false,
        button7Active: false,
        button15Active: false,
        searchTimeData:''
      }
    },
    methods: {
      convertToTableData(data) {
        const tableData = [];
        data.forEach(item => {
            let tempValues = item["DataTEMPStr"].split(',');
            let swcValues = item["DataSWCStr"].split(',');
            
            let dataAtm =item["DataATM"] ? (item["DataATM"]/1000).toFixed(2) : '0';
            let tableItem = {
                "TIME": item["TIME"],
                "DataTEMPStr": tempValues[0] || "",
                "DataTEMPStr1": tempValues[1] || "",
                "DataTEMPStr2": tempValues[2] || "",
                "DataTEMPStr3": tempValues[3] || "",
                "DataTEMPStr4": tempValues[4] || "",
                "DataSWCStr": swcValues[0] || "",
                "DataSWCStr1": swcValues[1] || "",
                "DataSWCStr2": swcValues[2] || "",
                "DataSWCStr3": swcValues[3] || "",
                "DataSWCStr4": swcValues[4] || "",
                "DataAT": item["DataAT"] || '0',
                "DataATM": dataAtm || '0',
                "POWER": item["POWER"] || "",
            };
            if(item.DataECStr!==undefined){
              let ecValues = item["DataECStr"]?.split(',');
              tableItem['DataECStr']=ecValues[0] || "";
              tableItem['DataECStr1']=ecValues[1] || "";
              tableItem['DataECStr2']=ecValues[2] || "";
            }
            
            tableData.push(tableItem);
        });
        return tableData;
      },
      convertToChartData(devData) {
          const chartData = {
              'TIME':[],
              'DataAT': [],
              'DataATM': [],  
              'DataSWCStr': [],
              'DataSWCStr1': [],
              'DataSWCStr2': [],
              'DataSWCStr3': [],
              'DataSWCStr4': [],
              'DataTEMPStr': [],
              'DataTEMPStr1': [],
              'DataTEMPStr2': [],
              'DataTEMPStr3': [],
              'DataTEMPStr4': [],
              'DataECStr': [],
              'DataECStr1': [],
              'DataECStr2': [],
              'DataECStr3': [],
              'POWER': []
          };

          devData.forEach(item => {
              const tempValues = item["DataTEMPStr"].split(',');
              const swcValues = item["DataSWCStr"].split(',');
              const ecValues = item["DataECStr"]?.split(',');
              chartData['TIME'].push(item["TIME"]);
              chartData['DataTEMPStr'].push(tempValues[0]);
              chartData['DataTEMPStr1'].push(tempValues[1]);
              chartData['DataTEMPStr2'].push(tempValues[2]);              
              chartData['DataSWCStr'].push(swcValues[0]);
              chartData['DataSWCStr1'].push(swcValues[1]);
              chartData['DataSWCStr2'].push(swcValues[2]);
              if(tempValues.length > 3){
                chartData['DataTEMPStr3'].push(tempValues[3]);
                chartData['DataTEMPStr4'].push(tempValues[4]);
                chartData['DataSWCStr3'].push(swcValues[3]);
                chartData['DataSWCStr4'].push(swcValues[4]);
              }
              if(ecValues){
                chartData['DataECStr'].push(ecValues[0]);
                chartData['DataECStr1'].push(ecValues[1]);
                chartData['DataECStr2'].push(ecValues[2]);
              }
              chartData['DataATM'].push((item['DataATM']/1000).toFixed(2));
              chartData['DataAT'].push(item['DataAT']);
              chartData['POWER'].push(item['POWER']);
          });

          return chartData;
      },
      onSubmit(day) {
        let tureStartTime,tureEndTime
        if(day===0){
          tureStartTime= new Date(new Date(this.startTime).getTime()+8*60*60*1000)
          tureEndTime= new Date(new Date(this.endTime).getTime()+8*60*60*1000)
        }else{
          tureStartTime= new Date(new Date().getTime()+8*60*60*1000-day*24*60*60*1000)
          tureEndTime= new Date(new Date().getTime()+8*60*60*1000)
        }
        
        //console.log(this.endTime);
        const UserID=JSON.parse(sessionStorage.getItem('UserID'))
        getDevData(UserID,this.devInfo.devID,tureStartTime,tureEndTime).then(res=>{
          //console.log(res);
          if(res.data.length==0){
            return
          }
          this.tableData=this.convertToTableData(res.data.devData).reverse()
          this.chartData=this.convertToChartData(res.data.devData)
          //console.log(res.data.devData);
          this.showResult=true
          if(this.activeName==='second') {
            lineTotalEcharts('main',this.chartData)
          }
        })
      },
      handleClick(tab) {
        //console.log(tab.name);
        if(tab.name==='second'){
          lineTotalEcharts('main',this.chartData)
        }
      },
      handleButtonClick(buttonIndex) {
      // 根据按钮索引更新对应按钮的状态变量
      if (buttonIndex === 3) {
        this.searchTimeData='近三天数据'
        this.onSubmit(buttonIndex)
        this.button3Active = true;
        this.button7Active = false; // 可根据需要更新其他按钮的状态变量
        this.button15Active = false; 
      } else if (buttonIndex === 7) {
        this.searchTimeData='近七天数据'
        this.onSubmit(buttonIndex)
        this.button3Active = false;
        this.button7Active = true; // 可根据需要更新其他按钮的状态变量
        this.button15Active = false; 
      }
      else if (buttonIndex === 15){
        this.searchTimeData='近十五天数据'
        this.onSubmit(buttonIndex)
        this.button3Active = false;
        this.button7Active = false; // 可根据需要更新其他按钮的状态变量
        this.button15Active = true; 
      }
      else{
        this.searchTimeData=`${new Date(this.startTime).toLocaleString()} 到 ${new Date(this.endTime).toLocaleString()} 数据`
        this.onSubmit(buttonIndex)
        this.button3Active = false;
        this.button7Active = false; // 可根据需要更新其他按钮的状态变量
        this.button15Active = false; 
      }
      // 其他按钮的处理逻辑
    },
    handleExport(fileName='',idName = "#exportTab",xlsxParam={ raw: true }) {
      // let xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换
      let wb = XLSX.utils.table_to_book(
        document.querySelector(idName),
        xlsxParam
      );
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${fileName}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    }
    },
    mounted() {
      
      this.devInfo=JSON.parse(sessionStorage.getItem('devInfo'))
    }
  }
  </script>
  <style lang="less" scoped>
  .search{
    margin:.075rem 0.125rem;
    span{
      margin-right: 0.25rem;
      margin-left: 0.25rem;
      font-size: .1875rem;
      font-weight: 600;
    }
    .el-button{
      margin-left: 0.2rem;
    }
  }
  .showTitle{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.1rem;
    padding-right: 0.3rem;
    p{
      flex: 1;
      font-size: .3rem;
      font-weight: 600;
      color: #21e0b7;
      text-align: center;
      padding-left: 1.8rem;
    }
    .el-button{
      width: 1.5rem;
      text-align: center;
    }
  }
  .active {
    background-color: #21e0b7;
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
  /deep/ .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }
  </style>
  