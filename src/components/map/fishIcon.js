import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';

import fish_data from '../data/fish_data'

export function showIcon(map, fishIconLayer, flag) {
    map.removeLayer(fishIconLayer);
    if(!flag)
      return;

    // var getFishData = [
    //     {
    //       x: -42.1734,
    //       y: 41.3851,
    //     },
    //     {
    //       x: -45.209,
    //       y: 50.84,
    //     },
    //     {
    //       x: -50.209,
    //       y: 53.845,
    //     },
    //     {
    //       x: -10.209,
    //       y: 33.845,
    //     },
    //     {
    //       x: -5.209,
    //       y: 50.845,
    //     }
    //   ]
      var getFishData = fish_data;
      var data = new VectorSource();
      var coord;
      var pointFeature;
      var lonLat;
      var coordXY;

      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.9],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/fish.png',
        }),
      });

      getFishData.forEach(function (eachData) {
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
        pointFeature.setStyle(iconStyle);
        data.addFeature(pointFeature);
      });

      fishIconLayer = new VectorLayer({
        source: data,
      });

      map.addLayer(fishIconLayer);

      return fishIconLayer
}