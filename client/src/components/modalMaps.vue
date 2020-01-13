<template>
  <div id="modalMaps">
    <modal name="modal" v-if="msg">
      <div id="basicMap" v-if="msg.address.coord"></div>
      <div class="center" v-if="!msg.address.coord">
        <p>Ce restaurant n'a pas fourni des informations sur son emplacement.</p>
      </div>
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
    msg: function() {
      console.log("modals Maps")
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
        console.log(element)
        if (element) {
          callBack(elementId, element);
        } else {
          this.waitForElement(elementId, callBack);
        }
      }, 500);
    },
    initMap(latitude, longitude) {
      console.log("couille");

      this.map = L.map("basicMap").setView([latitude, longitude], 13);
      this.tileLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        {
          maxZoom: 30,
          attribution:
            'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
        }
      );
      this.tileLayer.addTo(this.map);
      console.log("tileLayer:", this.tileLayer, "map:", this.map);
      console.log(latitude + " / " + longitude);
    }
  }
};
</script>

<style>
#basicMap {
  width: 100%;
  height: 20px;
  margin: 0;
}
.center {
  line-height: 300px;
  height: 300px;
  text-align: center;
}

.center p {
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
}
</style>