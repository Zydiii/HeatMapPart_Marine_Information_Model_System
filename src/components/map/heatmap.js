import * as olProj from 'ol/proj'
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Heatmap as HeatmapLayer } from 'ol/layer';
import temper_data from '../data/temper_data.js'

export function showHeatmap(map, heatmapLayer, flag) {

  console.log(temper_data);

    map.removeLayer(heatmapLayer);

    if(!flag)
    return;

    // var getData = [
    //     {
    //       x: 42.1734,
    //       y: 41.3851,
    //       weight: 0.7
    //     },
    //     {
    //       x: 45.209,
    //       y: 50.84,
    //       weight: 0.8
    //     },
    //     {
    //       x: 50.209,
    //       y: 53.845,
    //       weight: 0.9
    //     },
    //     {
    //       x: 1.209,
    //       y: 53.845,
    //       weight: 0.7
    //     },
    //     {
    //       x: 5.209,
    //       y: 50.845,
    //       weight: 1
    //     }
    //   ]; //getData到时候会用axios.get获取，数据格式也可能改变，但逻辑不变
      var getData = temper_data;
      var data = new VectorSource();
      var coord;
      var pointFeature;
      var lonLat;
      var coordXY;
      getData.forEach(function (eachData) {
        //console.log(eachData);
        coordXY = [eachData.x, eachData.y];
        coord = olProj.fromLonLat(coordXY);
        lonLat = new Point(coord);
        pointFeature = new Feature({
          geometry: lonLat,
          weight: eachData.weight // e.g. temperature
        });
        data.addFeature(pointFeature);
      });
      heatmapLayer = new HeatmapLayer({
        source: data,
        blur: 10,
        radius: 10,
      });

      map.addLayer(heatmapLayer);

      return heatmapLayer
}