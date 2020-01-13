<template>
  <div id="modalMaps">
    <modal name="modal">
      <span v-if="msg">
        <md-progress-spinner
          style=" position: absolute;
                  left: 44%;
                  top: 40%;
                "
          v-if="!loaded"
          md-mode="indeterminate"
        ></md-progress-spinner>
        <div id="basicMap" v-if="msg.address.coord"></div>

        <span v-if="loaded">
          <div class="center" v-if="!msg.address.coord">
            <p>Ce restaurant n'a pas fourni des informations sur son emplacement.</p>
          </div>
        </span>
      </span>
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
      this.loaded = false;
      setTimeout(() => {
        this.loaded = true;
        if (this.msg.address.coord)
          this.initMap(this.msg.address.coord[1], this.msg.address.coord[0]);
      }, 3000);
    }
  },
  data() {
    return {
      loaded: false,
      map: null,
      tileLayer: null,
      layers: []
    };
  },
  methods: {
    initMap(latitude, longitude) {
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
    }
  }
};
</script>

<style>
#basicMap {
  padding-left: 30%;
  height: 350px;
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