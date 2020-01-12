<template>
  <div id="modalMaps">
    <modal name="modal" v-if="currentRestaurant">
      <div id="basicMap" v-if="currentRestaurant.address.coord" v-on:load="initMap(currentRestaurant.address.coord[1], currentRestaurant.address.coord[0])"></div>
      <div v-if="!currentRestaurant.address.coord">Ce restaurant n'a pas de Longitude/latitude</div>
    </modal>
  </div>
</template>

<script>
import L from 'leaflet';
export default {
  name: "modalMaps",
  props: {
    msg: {}
  },
  watch: {
    msg: function() {
      this.currentRestaurant = this.msg;
    }
  },
  data() {
    return {
      currentRestaurant: null,
      map: null,
      tileLayer: null,
      layers: [],
    };
  },
  methods: {
    initMap(latitude, longitude) {
        this.map = L.map('basicMap').setView([latitude, longitude], 1);
        this.tileLayer = L.tileLayer(
                  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                  {
                    maxZoom: 55,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                  }
        );
        this.tileLayer.addTo(this.map);
        console.log(latitude + " / " + longitude)
    },
    initLayers() {},
    mounted() {
      this.initLayers();
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