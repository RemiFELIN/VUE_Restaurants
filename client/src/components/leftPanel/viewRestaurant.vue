<template>
  <div id="viewRestaurant" v-if="display">
    <md-button class="md-accent md-raised" v-on:click="getMapWithOpenStreetMap()">
      <md-icon>view</md-icon>Voir sur la carte
    </md-button>
  </div>
</template>

<script>
export default {
  name: "viewRestaurant",
  props: {
    msg: {
      type: null
    }
  },
  watch: {
    msg: function() {
      this.display = true;
      this.msg.delete = false;
      this.msg.update = false;
      this.restaurant = this.msg;
    }
  },
  data() {
    return {
      lat: "",
      lng: "",
      zoom: 11,
      //https://www.openstreetmap.org/#map=**ZOOM**/**LAT**/**LNG**
      apiBaseURL: "https://www.openstreetmap.org/",
      restaurant: {
        restaurant_id: null,
        name: null,
        cuisine: null,
        borough: null,
        address: {
          street: null,
          zipcode: null
        }
      }
    };
  },
  methods: {
    async getMapWithOpenStreetMap(){
        let urlAPI = this.apiBaseURL + "#map=" + this.zoom + "/" + this.lat + "/" + this.lng
        //try {
            let reponseJSON = await fetch(urlAPI);
            let reponseJS = await reponseJSON.json();
            console.log("test : " + reponseJS)
        //} catch (err) {
            //console.log("Erreur dans les fetchs GET " + err.msg);
        //}
    }
  }
};
</script>

<style >
.retour-icon {
  margin: 0% 0% 0% 0% !important;
}
</style>