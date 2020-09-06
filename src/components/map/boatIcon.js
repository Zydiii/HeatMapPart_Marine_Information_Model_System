import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';

import boat_data from '../data/boat_data'


export function showIcon(map, boatIconLayerRed, boatIconLayerBlack, flag0) {
    map.removeLayer(boatIconLayerRed);
    map.removeLayer(boatIconLayerBlack);

    if(!flag0)
      return;

    // var getBoatData = [
    //     {
    //       x: -42.1734,
    //       y: 46.3851,
    //     },
    //     {
    //       x: -55.209,
    //       y: 63.845,
    //     },
    //     {
    //       x: -10.209,
    //       y: 3.845,
    //     },
    //     {
    //       x: -5.209,
    //       y: 5.845,
    //     }
    //   ]
      var getBoatData = boat_data;
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
          scale: [0.15, 0.15],
          src: ' http://qfx2psjj1.hn-bkt.clouddn.com/boat1.svg',
        }),
      });

      var iconStyle2 = new Style({
        image: new Icon({
          anchor: [0.5, 100],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: [0.15, 0.15],
          src: ' http://qfx2psjj1.hn-bkt.clouddn.com/boat.svg',
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

      boatIconLayerRed = new VectorLayer({
        source: data1,
        visible: true
      });
      var flag = true
      setInterval(() => {
        flag = !flag
        boatIconLayerRed.setVisible(flag)
      }, 1000);

      boatIconLayerBlack = new VectorLayer({
        source: data2,
        visible: true
      });
      var flag1 = false
      setInterval(() => {
        flag1 = !flag1
        boatIconLayerBlack.setVisible(flag1)
      }, 1000);
      
      map.addLayer(boatIconLayerBlack);
      map.addLayer(boatIconLayerRed);

      return [boatIconLayerRed, boatIconLayerBlack]
}
