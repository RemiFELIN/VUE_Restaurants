
<template>
  <div id="app">
    <md-toolbar class="md-primary" id="header">
      <h3 class="md-title">
        <md-icon>room_service</md-icon>&nbsp;Gestionnaire de menus pour restaurants
      </h3>
    </md-toolbar>
    <LeftPanel :msg="currentRestaurant" @inputData="updateMessage" />
    <RightPanel :msg="childData" @restaurantData="updateCurrentRestaurant" />
  </div>
</template>
<script>
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);

export default {
  name: "App",
  components: {
    LeftPanel,
    RightPanel
  },
  data: function() {
    return {
      childData: "",
      currentRestaurant: ""
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    },
    updateCurrentRestaurant(variable) {
      this.currentRestaurant = variable;
    }
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
