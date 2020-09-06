import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';

import unknown_data from '../data/unknown_data'

export function showIcon(map, unknownIcon, flag) {
  map.removeLayer(unknownIcon);
  if (!flag)
    return;

  // var getFishData = [
  //     {
  //       x: -46.1734,
  //       y: 21.3851,
  //     },
  //     {
  //       x: -25.209,
  //       y: 30.84,
  //     },
  //     {
  //       x: -10.209,
  //       y: 13.845,
  //     }
  //   ]
  var getFishData = unknown_data;
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
      scale: [0.15, 0.15],
      src: 'http://qfx2psjj1.hn-bkt.clouddn.com/question.svg',
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

  unknownIcon = new VectorLayer({
    source: data,
  });

  map.addLayer(unknownIcon);

  return unknownIcon
}