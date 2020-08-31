import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { ZoomSlider, Zoom } from 'ol/control'
import Map from 'ol/Map'
import View from 'ol/View'
import * as olProj from 'ol/proj'

import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Heatmap as HeatmapLayer } from 'ol/layer';

import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import Overlay from 'ol/Overlay';

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
  //==================================Icon=========================================
  var getFishData = [
    {
      x: -42.1734,
      y: 41.3851,
    },
    {
      x: -45.209,
      y: 50.84,
    },
    {
      x: -50.209,
      y: 53.845,
    },
    {
      x: -10.209,
      y: 33.845,
    },
    {
      x: -5.209,
      y: 50.845,
    }
  ]

  var getBoatData = [
    {
      x: -42.1734,
      y: 46.3851,
    },
    {
      x: -55.209,
      y: 63.845,
    },
    {
      x: -10.209,
      y: 3.845,
    },
    {
      x: -5.209,
      y: 5.845,
    }
  ]

  var getBoatData1 = [
    {
      x: -55.209,
      y: 63.845,
    },
    {
      x: -10.209,
      y: 3.845,
    },
    {
      x: -5.209,
      y: 5.845,
    }
  ]

  var getBoatData2 = [
    {
      x: -45.209,
      y: 23.84,
    }
  ]

  var iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 0.9],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://openlayers.org/en/latest/examples/data/fish.png',
    }),
  });

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

  data = new VectorSource();
  var data1 = new VectorSource();
  var data2 = new VectorSource();
  var data3 = new VectorSource();

  getFishData.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    lonLat = new Point(coord);
    pointFeature = new Feature({
      geometry: lonLat,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    pointFeature.setStyle(iconStyle);
    data.addFeature(pointFeature);
  });

  getBoatData.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    lonLat = new Point(coord);
    pointFeature = new Feature({
      geometry: lonLat,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    pointFeature.setStyle(iconStyle1);
    data1.addFeature(pointFeature);
  });

  getBoatData1.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    lonLat = new Point(coord);
    pointFeature = new Feature({
      geometry: lonLat,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    pointFeature.setStyle(iconStyle2);
    data2.addFeature(pointFeature);
  });

  getBoatData2.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    lonLat = new Point(coord);
    pointFeature = new Feature({
      geometry: lonLat,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    pointFeature.setStyle(iconStyle2);
    data3.addFeature(pointFeature);
  });

  var vectorLayer = new VectorLayer({
    source: data,
  });

  var vectorLayer1 = new VectorLayer({
    source: data1,
    visible: false
  });
  var flag = true
  setInterval(() => {
    flag = !flag
    vectorLayer1.setVisible(flag)
  }, 1000);

  var vectorLayer2 = new VectorLayer({
    source: data2,
    visible: false
  });
  var flag1 = false
  setInterval(() => {
    flag1 = !flag1
    vectorLayer2.setVisible(flag1)
  }, 1000);

  var vectorLayer3 = new VectorLayer({
    source: data3,
  });

  //================================Icon========================================

  var map = new Map({
    layers: [seamap, vector, vectorLayer, vectorLayer1, vectorLayer2, vectorLayer3],
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

  var point_div = document.getElementById("css_animation");
  var point_overlay;
  getBoatData2.forEach(function (eachData) {
    console.log(eachData);
    coordXY = [eachData.x, eachData.y];
    coord = olProj.fromLonLat(coordXY);
    point_overlay = new Overlay({
      element: point_div,
      positioning: 'center-center'
    });
    map.addOverlay(point_overlay);
    point_overlay.setPosition(coord);
  });

  return map
}

