
<template >
  <div id="leftPanel">
    <addCuisine @inputData="updateMessage" :displayAddCuisine="display"></addCuisine>
    <displayRestaurant @display="updateDisplay" @restaurantUpdated="updateMessage" :msg="currentRestaurant"></displayRestaurant>
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