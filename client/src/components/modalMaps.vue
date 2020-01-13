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
    msg: {},
    display: {}
  },
  watch: {
    display: function(){
      console.log("message rafiné")
      if(this.currentRestaurant.address.coord)
        setTimeout(() =>{
          this.initMap(this.currentRestaurant.address.coord[1], this.currentRestaurant.address.coord[0])
        },500)
    },
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
      console.log("couille")

      this.map = L.map("basicMap").setView([latitude, longitude], 13);
      this.tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        {
          maxZoom: 30,
          attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        }
      );
      this.tileLayer.addTo(this.map);
      console.log("tileLayer:",this.tileLayer,"map:",this.map)
      console.log(latitude + " / " + longitude)
    },
  }
};
</script>

<style>
#basicMap {
  width: 100%;
  height: 20px;
  margin: 0;
}
</style>