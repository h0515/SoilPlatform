<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="设备列表" name="first">
        <DevTable></DevTable>
    </el-tab-pane>
    <el-tab-pane label="设备分布图" name="second" :lazy="true">
        <DevMap></DevMap>
    </el-tab-pane>
    <el-tab-pane label="墒情分布图" name="three">
        <SoilMap></SoilMap>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import DevTable from '@/views/Home/DevTable'
  import DevMap from '@/views/Home/DevMap'
  import SoilMap from '@/views/Home/SoilMap'
  export default {
    data() {
      return {
        activeName: 'first',
      };
    },
    components: {
      DevTable,
      DevMap,
      SoilMap
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    },
    mounted(){
    }
  };
</script>
<style lang="less" scoped>
  /deep/ .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }
</style>