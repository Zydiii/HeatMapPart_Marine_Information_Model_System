<template>
  <div id="map" class="map"><div id="css_animation"></div></div>
</template>
<script>
import 'ol/ol.css'
import * as Map from './map/map'
import * as Ship from './map/ship'

export default {
  name: 'SeaMap',
  components: {
  },
  data () {
    return {
      mapType: 1,
      map: null,
      view: null,
      shipointLayer: null,
      vectorLayer: null,
      lt: [ 0, 0 ],
      rb: [ 0, 0 ],
      center: [ 0, 0 ],
      viewheight: 0.173,
      viewwidth: 0.445,
      vectorshow: false,
      point_overlay: null,
      start: false,
      showtimer: null,
      oneLayer: null,
      trailbegin: false
    }
  },
  created () {
    
  },
  mounted () {
    console.log('mount')
    this.map = Map.mapInstance()
    Ship.showShip(this.map,
      this.vectorLayer,
      Ship.getshipjson()
    )

    console.log(this.map)
  },
  methods: {
  }
}
</script>
<style>
  .map {
    width: 1900px;
    height: 1080px;
  }
  /** 地图上的故障处理器显示效果*/
#css_animation{
    height:50px;
    width:50px;
    border-radius: 25px;
    background: rgba(255, 0, 0, 0.9);
    transform: scale(0);
    animation: myfirst 3s;
    animation-iteration-count: infinite;
}
@keyframes myfirst{
    to{
        transform: scale(2);
        background: rgba(0, 0, 0, 0);
    }
}
</style>
