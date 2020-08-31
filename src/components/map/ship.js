import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

import * as olProj from 'ol/proj'

export function getshipjson() {	
  var gesonboject = []
  var coordinaete = olProj.transform([ 119,39 ], 'EPSG:4326', 'EPSG:3857');
  var course = 300 / 180 * 3.14;
  // var speed = 10;				
  var shipjson = new Feature({
    geometry : new Point(coordinaete),
    'type' : 'ship',
    'mmsi' : "412123456",
    'name' : "天康河",
    "course" : course,									
    "id" : 1
  });
            
  gesonboject.push(shipjson)
  return gesonboject
}

export function showShip(map, vectorLayer, geojsonObject) {
  map.removeLayer(vectorLayer);//vectorlayer 是全局变量，其实就是图标所在的图层，每次加载之前应该清除之前的图层
  vectorLayer = new VectorLayer({ // 初始化矢量图层
    source : new VectorSource({
      features : geojsonObject  // geojosnobject就是上面返回的featrue json 数组
    }),
    style :function(feature) {
      var style = new Style({
        image : new Icon({
          rotation : feature.get('course'),//图标旋转的角度及图标存储位置
          src : feature.get('speed') > 3 ? 'images/ship.png':'images/anchor1.png'
        })
      })
      return [style]
    }
  })
  map.addLayer(vectorLayer) //map是之前的map地图容器
}