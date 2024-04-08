<template>
    <div>
        <el-table
            :data="devlist"
            border
            highlight-current-row
            @row-dblclick="showDetail"
            style="width: 100%;height: calc(100% - 2.2rem);">
            <el-table-column
            type="index"
            label="序号"
            width="70">
            </el-table-column>
            <el-table-column
            prop="devID"
            label="设备编号"
            width="150">
            </el-table-column>
            <el-table-column
            prop="AliasName"
            label="设备名称"
            >
            </el-table-column>
            <el-table-column
            prop="devType"
            label="型号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="devActiTime"
            label="激活时间"
            width="120">
            </el-table-column>
            <el-table-column
            prop="devTermTime"
            label="到期时间"
            width="120">
            </el-table-column>
            <el-table-column
            prop="position"
            label="安装位置"
            width="190">
            </el-table-column>
            <el-table-column
            
            label="操作"
            width="200">
            <template slot-scope="scope">
                <div style="display: flex;"> 
                <el-button type="primary" plain size="mini" @click="showDetail(scope.row)">查看详情</el-button>
                <el-button type="warning" plain size="mini" @click="changeDevName(scope.row)">修改名称</el-button></div>
               
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getDevList,setName} from '../../request/api/home'
    export default {
        data() {
            return {
                devlist:[],
            }
        },
        methods:{
          showDetail(row){
              this.$router.push('/static')
              sessionStorage.setItem('devInfo',JSON.stringify(row))
          },
        changeDevName(row) {
        this.$prompt('请输入设备名称', '设置设备名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const UserID=JSON.parse(sessionStorage.getItem('UserID'))
            setName(UserID,row.devID,value).then(res=>{
                console.log(res);
                  if(res.data.IsSuccess===true){
                      this.$message({
                          message:'设备名称修改成功',
                          type:'success'
                      })
                      this.$router.go(0)
                  }else{
                      this.$message({
                          message:'设备名称修改失败',
                          type:'error'
                      })
                  }
              })
        }).catch((e) => {
            console.log(e);
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
          initTable(){
            const UserID=JSON.parse(sessionStorage.getItem('UserID'))
            getDevList(UserID).then(res=>{
                this.devlist=res.data.devList
                this.devlist.map(item=>{
                    item.AliasName=item.AliasName || '暂无数据'
                    item.devActiTime=item.devActiTime || '暂无数据'
                    item.devTermTime=item.devTermTime || '暂无数据'
                    item.position=`东经${item.LNG.toFixed(2)}°,北纬${item.LAT.toFixed(2)}°`
                    //console.log(item.LAT);

                    return item
            })
            sessionStorage.setItem('devPosition',JSON.stringify(res.data.devList))  
            }) 
          },
        },
        mounted() {
            
            this.initTable()
        },
    }
</script>
<style lang="less" scoped>
  /deep/ .cell{
    text-align: center;
  }
  /deep/ .el-table th{
    background-color: rgb(156, 210, 230) !important;
    .cell{
        font-size: 0.2rem;
        font-weight: 600;
    }
  }
  /deep/ .el-button:focus:not(.el-button:hover) {
  color: #E6A23C;
  background-color: #fdf6ec;
  border-color: #f5dab1;
}

</style>