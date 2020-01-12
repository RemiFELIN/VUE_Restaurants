<script src="https://unpkg.com/vuejs-paginate@latest"></script>
<script src="https://unpkg.com/vue-star-rating/dist/star-rating.min.js"></script>
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<template>
  <div id="app">
    <md-toolbar class="md-primary" id="header">
      <h3 class="md-title">
        <md-icon>room_service</md-icon>&nbsp;Gestionnaire de menus pour restaurants
      </h3>
    </md-toolbar>
    <LeftPanel :msg="currentRestaurant" @inputData="updateMessage"/>
    <RightPanel :msg="childData" @restaurantData="updateCurrentRestaurant" />
    <modalMaps :msg="currentRestaurant"></modalMaps>
  </div>

</template>



<script>
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import modalMaps from './components/modalMaps';
import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.component('paginate', VuejsPaginate);
Vue.component('star-rating', VueStarRating.default);

export default {
  name: "App",
  components: {
    LeftPanel,
    RightPanel,
    modalMaps
  },
  data: function() {
    return {
      childData: "",
      currentRestaurant: "",
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    },
    updateCurrentRestaurant(variable) {
      this.currentRestaurant = variable;
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
