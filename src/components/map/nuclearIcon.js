import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';

import nuclear_data from '../data/nuclear_data'


export function showIcon(map, nuclearIconLayerRed, nuclearIconLayerBlack, flag0) {
    map.removeLayer(nuclearIconLayerRed);
    map.removeLayer(nuclearIconLayerBlack);

    if(!flag0)
      return;

    // var getBoatData = [
    //     {
    //       x: -52.1734,
    //       y: 16.3851,
    //     },
    //     {
    //       x: -65.209,
    //       y: 23.845,
    //     }
    //   ]
      var getBoatData = nuclear_data;
      var data1 = new VectorSource();
      var data2 = new VectorSource();
      var coord;
      var pointFeature;
      var lonLat;
      var coordXY;

      var iconStyle1 = new Style({
        image: new Icon({
          anchor: [0.5, 100],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: [0.23, 0.23],
          src: ' http://qfx2psjj1.hn-bkt.clouddn.com/boat3.svg',
        }),
      });

      var iconStyle2 = new Style({
        image: new Icon({
          anchor: [0.5, 100],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: [0.23, 0.23],
          src: ' http://qfx2psjj1.hn-bkt.clouddn.com/boat4.svg',
        }),
      });

      getBoatData.forEach(function (eachData) {
        //console.log(eachData);
        coordXY = [eachData.x, eachData.y];
        coord = olProj.fromLonLat(coordXY);
        lonLat = new Point(coord);
        pointFeature = new Feature({
          geometry: lonLat,
          name: 'icon',
          population: 4000,
          rainfall: 500,
        });
        pointFeature.setStyle(iconStyle1);
        data1.addFeature(pointFeature);
      });

      getBoatData.forEach(function (eachData) {
        //console.log(eachData);
        coordXY = [eachData.x, eachData.y];
        coord = olProj.fromLonLat(coordXY);
        lonLat = new Point(coord);
        pointFeature = new Feature({
          geometry: lonLat,
          name: 'icon',
          population: 4000,
          rainfall: 500,
        });
        pointFeature.setStyle(iconStyle2);
        data2.addFeature(pointFeature);
      });

      nuclearIconLayerRed = new VectorLayer({
        source: data1,
        visible: true
      });
      var flag = true
      setInterval(() => {
        flag = !flag
        nuclearIconLayerRed.setVisible(flag)
      }, 1000);

      nuclearIconLayerBlack = new VectorLayer({
        source: data2,
        visible: true
      });
      var flag1 = false
      setInterval(() => {
        flag1 = !flag1
        nuclearIconLayerBlack.setVisible(flag1)
      }, 1000);
      
      map.addLayer(nuclearIconLayerBlack);
      map.addLayer(nuclearIconLayerRed);

      return [nuclearIconLayerRed, nuclearIconLayerBlack]
}