import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { ZoomSlider, Zoom } from 'ol/control'
import Map from 'ol/Map'
import View from 'ol/View'
import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Heatmap as HeatmapLayer} from 'ol/layer';

export function mapInstance() {
  var seamap = new Tile({
    source: new XYZ({
      url: "http://112.126.96.159/Ship/Map?z={z}&y={y}&x={x}",
      projection: 'EPSG:3857'
    })
  });
  var zoomslider = new ZoomSlider();
  var zoomcontrol = new Zoom();

  //================================HeatMap========================================
  var getData = [
    {
      x: 42.1734,
      y: 41.3851,
      weight: 0.7
    },
    {
      x: 45.209,
      y: 50.84,
      weight: 0.8
    },
    {
      x: 50.209,
      y: 53.845,
      weight: 0.9
    },
    {
      x: 1.209,
      y: 53.845,
      weight: 0.7
    },
    {
      x: 5.209,
      y: 50.845,
      weight: 1
    }
  ]; //getData到时候会用axios.get获取，数据格式也可能改变，但逻辑不变
  var data = new VectorSource();
  var coord;
  var pointFeature;
  var lonLat;
  var coordXY;
  getData.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    lonLat = new Point(coord);
    pointFeature = new Feature({
      geometry: lonLat,
      weight: eachData.weight // e.g. temperature
    });
    data.addFeature(pointFeature);
  });
  var vector = new HeatmapLayer({
    source: data,
    blur: 15,
    radius: 25,
  });
  //================================HeatMap========================================
  var map = new Map({
    layers: [seamap, vector],
    view: new View({
      center: olProj.transform([119.22, 39.222], 'EPSG:4326',
        'EPSG:3857'),
      projection: 'EPSG:3857',
      zoom: 5,
      minZoom: 2,
      maxZoom: 15,
    }),
    target: 'map',
    controls: [zoomslider, zoomcontrol]
  });

  return map
}

