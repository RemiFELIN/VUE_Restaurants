<template>
  <div id="rightPanel">
    <ListeRestaurant :msg="childData" @restaurantData="updateCurrentRestaurant" />
    <md-bottom-bar style="position:fixed;bottom:0;" id="footer">Bonjour<br>Aurevoir</md-bottom-bar>
  </div>
</template>

<script>
import ListeRestaurant from "./rightPanel/ListeRestaurant";

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
    ListeRestaurant
  },
  mounted() {
    var headerHeight = document.getElementById("app").offsetHeight;
    var RightPanel = document.getElementById("rightPanel");
    var newHeight = window.innerHeight - headerHeight;
    RightPanel.style.height = newHeight + "px";
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
    }
  }
};
</script>


<style >
#rightPanel {
  width: 75%;
  left: 25%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: calc(100% - 64px); /*64px par default mais peut varier*/
  position: fixed;
  background: white;
  overflow-y: auto;
}
</style>