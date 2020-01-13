<template>
  <div id="modalMaps">
    <modal name="modal" v-if="msg">
      <div id="basicMap" v-if="msg.address.coord"></div>
      <div v-if="!msg.address.coord">Ce restaurant n'a pas de Longitude/latitude</div>
    </modal>
  </div>
</template>

<script>
import L from "leaflet";
export default {
  name: "modalMaps",
  props: {
    msg: {}
  },
  watch: {
    msg: function() {
      this.currentRestaurant = this.msg;
      this.waitForElement("basicMap", () => {
        this.initMap(this.msg.address.coord[1], this.msg.address.coord[0]);
      });
    }
  },
  data() {
    return {
      currentRestaurant: null,
      map: null,
      tileLayer: null,
      layers: []
    };
  },
  methods: {
    waitForElement(elementId, callBack) {
      window.setTimeout(() => {
        var element = document.getElementById(elementId);
        if (element) {
          callBack(elementId, element);
        } else {
          this.waitForElement(elementId, callBack);
        }
      }, 500);
    },
    initMap(latitude, longitude) {
      console.log("initMap");
      this.map = L.map("basicMap").setView([latitude, longitude], 1);
      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 55,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }
      );
      this.tileLayer.addTo(this.map);
      console.log(latitude + " / " + longitude);
    },
    initLayers() {},
    mounted() {
      this.initMap();
    }
  }
};
</script>

<style>
#basicMap {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>