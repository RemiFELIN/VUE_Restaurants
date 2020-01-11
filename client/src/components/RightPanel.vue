<template>
  <div id="RightPanel">
    <listeRestaurant :msg="childData" @restaurantData="updateCurrentRestaurant" />
    <md-bottom-bar style="position:fixed;bottom:0" id="footer">Bonjour</md-bottom-bar>
  </div>
</template>

<script>
import listeRestaurant from "./rightPanel/listeRestaurant";

export default {
  name: "RightPanel",
  props: {
    msg: {}
  },
  watch: {
    msg: function() {
      this.childData = this.msg;
    }
  },
  components: {
    listeRestaurant
  },
  mounted() {
    this.resizeWindow();
  },
  data() {
    return {
      childData: "",
      currentRestaurant: ""
    };
  },
  methods: {
    updateCurrentRestaurant(variable) {
      this.$emit("restaurantData", variable);
    },
    resizeWindow() {
      var headerHeight = document.getElementById("app").offsetHeight;
      var RightPanel = document.getElementById("RightPanel");
      var newHeight = window.innerHeight - headerHeight;
      RightPanel.style.height = newHeight + "px";
    }
  }
};
</script>


<style >
#RightPanel {
  width: 75%;
  left: 25%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: calc(100% - 64px);
  position: fixed;
  background: white;
  overflow-y: auto;
}
</style>