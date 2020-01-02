
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
      console.log("left panel msg:", this.msg);
      if (typeof this.msg == "object") {
        this.currentRestaurant = this.msg;
        this.display = false;
      }
    }
  },
  data() {
    return {
      nom: "",
      cuisine: "",
      zipCode: "",
      street: "",
      currentRestaurant: null,
      mode: 0,
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
    }
    //   async supprimerRestaurant(id) {
    //     try {
    //       let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
    //         method: "DELETE"
    //       });
    //       let reponseJS = await reponseJSON.json();
    //       console.log("Restaurant supprime : " + reponseJS.msg);
    //       this.getDataFromServer(); // on rafraichit l'affichage
    //     } catch (err) {
    //       console.log("Erreur dans le fetchs DELETE " + err.msg);
    //     }
    //   },
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