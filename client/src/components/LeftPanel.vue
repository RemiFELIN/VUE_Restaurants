
<template >
  <div id="leftPanel">
    <addCuisine @inputData="updateMessage" :displayAddCuisine="display"></addCuisine>
    <displayRestaurant @display="updateDisplay" @restaurantUpdated="updateMessage" :msg="currentRestaurant"></displayRestaurant>
    <viewRestaurant></viewRestaurant>
  </div>
</template>

<script>
import addCuisine from "./leftPanel/addCuisine";
import displayRestaurant from "./leftPanel/displayRestaurant";
import viewRestaurant from "./leftPanel/viewRestaurant";

export default {
  components: {
    addCuisine,
    displayRestaurant,
    viewRestaurant
  },
  name: "LeftPanel",
  props: {
    msg: {
      type: null
    }
  },
  mounted(){
    // var headerHeight = document.getElementById("header").style.height;
    // document.getElementById("LeftPanel").style.height = window.height - headerHeight;
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
      display:true
    };
  },
  methods: {
    updateMessage(variable) {
      this.$emit("inputData", variable);
    },
    updateDisplay(){
      this.display = true;
    },
    updateRestaurant(variable){
      this.$emit("restaurantUpdated",variable)
    },
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
}
</style>

