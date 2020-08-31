<template>
  <div id="map" class="map"></div>
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
</style>
