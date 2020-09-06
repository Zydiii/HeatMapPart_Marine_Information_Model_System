import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { ZoomSlider, Zoom } from 'ol/control'
import Map from 'ol/Map'
import View from 'ol/View'
import * as olProj from 'ol/proj'

export function mapInstance() {
  var seamap = new Tile({
    source: new XYZ({
      url: "http://112.126.96.159/Ship/Map?z={z}&y={y}&x={x}",
      projection: 'EPSG:3857'
    })
  });
  var zoomslider = new ZoomSlider();
  var zoomcontrol = new Zoom();

  var map = new Map({
    layers: [seamap],
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

  //================================Red Flash========================================

  // var point_div = document.getElementById("css_animation");
  // var point_overlay;
  // getBoatData2.forEach(function (eachData) {
  //   console.log(eachData);
  //   coordXY = [eachData.x, eachData.y];
  //   coord = olProj.fromLonLat(coordXY);
  //   point_overlay = new Overlay({
  //     element: point_div,
  //     positioning: 'center-center'
  //   });
  //   map.addOverlay(point_overlay);
  //   point_overlay.setPosition(coord);
  // });

  //================================Red Flash========================================

  return map
}

