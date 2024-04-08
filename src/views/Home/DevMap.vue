<template>
    <div>
        <div id="container" style="width: 15rem;height:calc(100vh - 1.3rem); "></div>
    </div>
  </template>
  <script>
  import { getDevLastData } from '@/request/api/static';
  import AMapLoader from "@amap/amap-jsapi-loader";
  window._AMapSecurityConfig = {
    securityJsCode: 'ac588e0dcc1ebb69b99600e79b75adc6',
 }
  export default {
    data() {
        return {
            map: null,
            event: [],
        }
    },
     mounted() {
        this.event = JSON.parse(sessionStorage.getItem('devPosition'));
        setTimeout(async() => {
            await this.initAMap(this.event);
            window.closeInfoWindow = () => {
            this.map.clearInfoWindow();
            };
        },10)

    },
    beforeDestroy() {
        this.map?.destroy();
    },
    methods: {
      async initAMap(event) {
        AMapLoader.load({
          key: "fed48757e9e0d4561ed80ec67752731a", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ["AMap.ToolBar","AMap.Scale","AMap.Geocoder","AMap.IndexCluster","AMap.InfoWindow"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        })
          .then((AMap) => {
            this.map = new AMap.Map("container", {
              viewMode: "3D", // 是否为3D地图模式
              zoom: 4, // 初始化地图级别
              center: [116.397428, 39.90923], // 初始化地图中心点位置
            });
            var toolbar = new AMap.ToolBar();
            this.map.addControl(toolbar);
            var Scale = new AMap.Scale();
            this.map.addControl(Scale);
            var geocoder = new AMap.Geocoder({
                //city: "010", //城市设为北京，默认：“全国”
                //radius: 1000 //范围，默认：500
            });
            var points = [];
            for (let i = 0; i < event?.length; i++) {
              let obj={}
              event[i].LNG=event[i].LNG+0.006164
              event[i].LAT=event[i].LAT+0.001512
              obj.lnglat=[event[i].LNG,event[i].LAT]
              geocoder.getAddress(obj.lnglat, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                    obj.city=result.regeocode.addressComponent.province
                    obj.formatAddress=result.regeocode.formattedAddress
                    obj.aliasName=event[i].AliasName
                }else{
                    log.error('根据经纬度查询地址失败')
                }
                });
              points.push(obj)
            }

            var clusterIndexSet = {
                //定义点聚合规则
                city: {
                    minZoom: 2,
                    maxZoom: 7,
                },
                formatAddress:{
                    minZoom: 7,
                    maxZoom: 15,
                },
                aliasName:{
                    minZoom: 15,
                    maxZoom: 26,
                }
                };

            var _renderClusterMarker =  (context)=> {
                var clusterCount = context.count; //聚合点内点数量
                if(clusterCount>1){
                    context.marker.setOffset(new AMap.Pixel(-18, -18));
                    context.marker.setContent(
                        `<div style="position: relative; width: 48px; height: 48px; background: url(http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m0.png); background-size: cover;">
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                ${clusterCount}
                            </div>
                        </div>
                        `
                    );
                }
                else{
                    context.marker.setOffset(new AMap.Pixel(-9.5, -32));
                    context.marker.setContent(
                            '<img width="19px" height="32px" src="//webapi.amap.com/theme/v1.3/markers/b/mark_bs.png"></img>'
                    );
                    context.marker.on('click', (e) => {
                        const UserID=JSON.parse(sessionStorage.getItem('UserID'));
                        function findTarget(event,context){
                            const clng=context.clusterData[0].lnglat.lng
                            const clat=context.clusterData[0].lnglat.lat
                            for(let i=0;i<event.length;i++){
                                if(event[i].LNG.toFixed(6)==clng && event[i].LAT.toFixed(6)==clat){
                                    return event[i]
                                }
                            }
                        }
                        const targetDev=findTarget(event,context)
    
                        getDevLastData(UserID,targetDev.devID).then(res=>{
                            const infoWindowDev=res.data.devLastData[0]
                            infoWindowDev.DataECStr=infoWindowDev.DataECStr||'设备暂不支持该功能'
                            
                            var infoWindow = new AMap.InfoWindow({
                            isCustom: true, //使用自定义窗体
                            content: `
                                <div class="close-btn" style="float: right;margin-top: 3px; margin-right: 16px;color:red;font-size:16px;font-weight:700" onclick="closeInfoWindow()">X</div>
                                <div style="width:3.4rem; background-color: #f5f5f5; border: 1px solid #dcdcdc; border-radius: 4px; padding: 10px; margin: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: left; font-family: Arial, sans-serif;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">查看设备最新消息</div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div style="flex: 1; margin-right: 10px;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">设备ID：</div>
                                            <div>${infoWindowDev.devID}</div>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">设备别名：</div>
                                            <div>${targetDev.AliasName}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div style="flex: 1; margin-right: 10px;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">设备型号：</div>
                                            <div>${targetDev.devType}</div>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">采集时间：</div>
                                            <div>${infoWindowDev.TIME}</div>
                                        </div>
                                        
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div style="flex: 1;margin-right: 10px;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">信号质量：</div>
                                            <div>${infoWindowDev.CSQ}</div>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">剩余电量：</div>
                                            <div>${infoWindowDev.POWER}%</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div style="flex: 1; margin-right: 10px;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">空气温度：</div>
                                            <div>${infoWindowDev.DataAT}°C</div>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">大气压强：</div>
                                            <div>${infoWindowDev.DataATM}Pa</div>
                                        </div>
                                    </div>
                                    <div style="display: flex;  justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                        <div style="display:flex;flex: 1; margin-right: 10px;flex-direction:row;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">土壤温度(°C)：</div>
                                            <div>${infoWindowDev.DataTEMPStr}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction:row; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                        <div style="display:flex;flex: 1; margin-right: 10px;flex-direction:row;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">土壤湿度(%)：</div>
                                            <div>${infoWindowDev.DataSWCStr}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction:row; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                        <div style="display:flex;flex: 1; margin-right: 10px;flex-direction:row;">
                                            <div style="font-weight: bold; margin-bottom: 3px;">土壤电导率(ms/cm)：</div>
                                            <div>${infoWindowDev.DataECStr}</div>
                                        </div>
                                    </div>

                                    <div style="text-align: right; margin-top: 10px;">
                                        <button style="background-color: #1a5276; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;" onclick="closeInfoWindow()">取消</button>
                                    </div>
                                </div>
                                `,
                            offset: new AMap.Pixel(0, -20)
                            });
                            infoWindow.open(this.map, [context.clusterData[0].lnglat.lng, context.clusterData[0].lnglat.lat]);
                        })
                        })    
                }
                
            };

            var indexCluster = new AMap.IndexCluster(this.map, points, {
                renderClusterMarker: _renderClusterMarker, //自定义聚合点样式
                clusterIndexSet: clusterIndexSet, //聚合规则
                //renderMarker: _renderMarker,
            });
            indexCluster.setMap(this.map);
            this.map.zoomIn() 
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
  </script>
  <style scoped lang="less">

  </style>
  