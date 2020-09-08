<template>
  <div id="map" class="map">
    <!-- <div id="css_animation"></div>  -->
    <div id="popup" class="ol-popup">
      <!-- <a href="#" id="popup-closer" class="ol-popup-closer"></a> -->
      <div id="popup-content"></div>
    </div>
    <div id="buttons">
      <li v-for="(item, i) in icons" :key="`item-${i}`">
        <Button type="text" shape="circle" @click="showIcon(item.type)" class="button">
          <img style="height:30px;" :src="item.url" />
        </Button>
      </li>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import * as Map from "./map/map";
// import * as Ship from "./map/ship";
import * as IconInfo from "./map/iconInfo";
import * as HeatMap from "./map/heatmap";
import * as FishIcon from "./map/fishIcon";
import * as UnknownIcon from "./map/unknownIcon";
import * as BoatIcon from "./map/boatIcon";
import * as NuclearIcon from "./map/nuclearIcon";

export default {
  name: "SeaMap",
  components: {},
  data() {
    return {
      mapType: 1,
      map: null,
      view: null,
      shipointLayer: null,
      vectorLayer: null,
      lt: [0, 0],
      rb: [0, 0],
      center: [0, 0],
      viewheight: 0.173,
      viewwidth: 0.445,
      vectorshow: false,
      point_overlay: null,
      start: false,
      showtimer: null,
      oneLayer: null,
      trailbegin: false,
      iconInfoLayer: null, //图标信息显示层
      heatmapLayer: null, //热力图显示层
      heatmapLayerFlag: false, //热力图显示层flag
      fishIconLayer: null, //鱼群图标显示层
      fishIconLayerFlag: false, ////鱼群图标显示层flag
      unknownIconLayer: null, //未知图标显示层
      unknownIconLayerFlag: false, //未知图标显示层flag
      boatIconLayerRed: null, //潜艇图标显示层(红)
      boatIconLayerBlack: null, //潜艇图标显示层(黑)
      boatIconLayerFlag: false, //潜艇图标显示层flag
      nuclearIconLayerRed: null, //核潜艇图标显示层(红)
      nuclearIconLayerBlack: null, //核潜艇图标显示层(红)
      nuclearIconLayerFlag: false, //核潜艇图标显示层flag
      icons: [
        { url: "http://qfx2psjj1.hn-bkt.clouddn.com/question.svg", type: "unknown" },
        { url: "http://qfx2psjj1.hn-bkt.clouddn.com/boat.svg", type: "boat" },
        { url: "http://qfx2psjj1.hn-bkt.clouddn.com/boat4.svg", type: "nuclear" },
        { url: "https://openlayers.org/en/latest/examples/data/fish.png", type: "fish" },
        { url: "http://qfx2psjj1.hn-bkt.clouddn.com/heatmap.svg", type: "heatmap" },
      ],
    };
  },
  created() {},
  mounted() {
    //console.log("mount");
    this.map = Map.mapInstance();
    // Ship.showShip(this.map, this.vectorLayer, Ship.getshipjson());
    IconInfo.showInfo(this.map, this.iconInfoLayer);

  },
  methods: {
    showIcon(type) {
      if (type == "unknown") {
        this.unknownIconLayerFlag = !this.unknownIconLayerFlag;
        // console.log(type)
        // console.log(this.unknownIconLayerFlag)
      } else if (type == "boat") {
        this.boatIconLayerFlag = !this.boatIconLayerFlag;
      } else if (type == "nuclear") {
        this.nuclearIconLayerFlag = !this.nuclearIconLayerFlag;
      } else if (type == "fish") {
        this.fishIconLayerFlag = !this.fishIconLayerFlag;
      } else if (type == "heatmap") {
        this.heatmapLayerFlag = !this.heatmapLayerFlag;
      }
    },
  },
  watch: {
    unknownIconLayerFlag: function () {
      this.unknownIconLayer = UnknownIcon.showIcon(
        this.map,
        this.unknownIconLayer,
        this.unknownIconLayerFlag
      );
    },
    boatIconLayerFlag: function () {
      var layers = BoatIcon.showIcon(
        this.map,
        this.boatIconLayerRed,
        this.boatIconLayerBlack,
        this.boatIconLayerFlag
      );
      this.boatIconLayerRed = layers[0];
        this.boatIconLayerBlack = layers[1];
    },
    nuclearIconLayerFlag: function () {
      var layers = NuclearIcon.showIcon(
        this.map,
        this.nuclearIconLayerRed,
        this.nuclearIconLayerBlack,
        this.nuclearIconLayerFlag
      );
      this.nuclearIconLayerRed = layers[0];
        this.nuclearIconLayerBlack = layers[1];
    },
    fishIconLayerFlag: function () {
      this.fishIconLayer = FishIcon.showIcon(this.map, this.fishIconLayer, this.fishIconLayerFlag);
    },
    heatmapLayerFlag: function () {
      this.heatmapLayer = HeatMap.showHeatmap(this.map, this.heatmapLayer, this.heatmapLayerFlag);
    },
  },
};
</script>
<style>
.map {
  width: 1900px;
  height: 1080px;
}
/** 地图上的闪烁显示效果*/
/* #css_animation {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.9);
  transform: scale(0);
  animation: myfirst 3s;
  animation-iteration-count: infinite;
}
@keyframes myfirst {
  to {
    transform: scale(2);
    background: rgba(0, 0, 0, 0);
  }
} */
#popup::before {
  content: "";
  width: 0;
  height: 0;
  border: 10px solid;
  position: absolute;
  bottom: -20px;
  left: 65px;
  border-color: #fff transparent transparent;
}
#popup {
  width: 150px;
  height: 55px;
  border: 2px solid #fff;
  border-radius: 7px; /*圆角弧度为7px*/
  position: relative;
  background-color: #fff;
}
#popup::after {
  content: "";
  width: 0;
  height: 0;
  border: 10px solid;
  position: absolute;
  bottom: -20px;
  left: 65px;
  border-color: #fff transparent transparent;
}
/* .ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "✖";
} */
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  box-shadow: none !important;
}
</style>
