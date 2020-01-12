<template >
  <div id="leftPanel" >
    <addCuisine @inputData="updateMessage" :displayAddCuisine="display"></addCuisine>
    <displayRestaurant
      @display="updateDisplay"
      @restaurantUpdated="updateMessage"
      :msg="currentRestaurant"
      v-on:event="afficheModal()"
      v-on:close="close()"
    ></displayRestaurant>
  </div>
</template>

<script>
import addCuisine from "./leftPanel/addCuisine";
import displayRestaurant from "./leftPanel/displayRestaurant";

export default {
  components: {
    addCuisine,
    displayRestaurant
  },
  name: "LeftPanel",
  props: {
    msg: {
      type: null
    }
  },
  mounted() {
    this.resizeWindow();
  },
  watch: {
    msg: function() {
      if (typeof this.msg == "object") {
        this.currentRestaurant = this.msg;
        this.display = false;
      }
    }
  },
  data() {
    return {
      currentRestaurant: null,
      display: true
    };
  },
  methods: {
    updateMessage(variable) {
      this.$emit("inputData", variable);
    },
    updateDisplay() {
      this.display = true;
    },
    updateRestaurant(variable) {
      this.$emit("restaurantUpdated", variable);
    },
    resizeWindow() {
      var headerHeight = document.getElementById("app").offsetHeight;
      var leftPanel = document.getElementById("leftPanel");
      var newHeight = window.innerHeight - headerHeight;
      leftPanel.style.height = newHeight + "px";
    },
    afficheModal() {
      this.$emit("event")
      console.log("leftPanel : methode -> OK")
    },
    close() {
      this.$emit("close")
    }
    //   pageSuivante() {
    //     console.log("page suivante");
    //     this.page++;
    //     this.getDataFromServer();
    //   },
    //   pagePrecedente() {
    //     console.log("page precedente");
    //     this.page--;
    //     this.getDataFromServer();
    //   }
  }
};
</script>

<style >
#leftPanel {
  width: 25%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  position: fixed;
  background: white;
  overflow-y: auto;
}
</style>

