<template>
  <div id="displayRestaurant" v-if="display">
    <md-button @click="retour">
      <md-subheader>
        <md-icon class="retour-icon">keyboard_backspace</md-icon>Retour
      </md-subheader>
    </md-button>

    <md-list class="md-double-line">
      <!--Nom du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">assignment</md-icon>

        <div v-if="!displayInputName" class="md-list-item-text">
          <span>Nom</span>
          <span>{{restaurant.name}}</span>
        </div>

        <md-field v-if="displayInputName">
          <label>Nom</label>
          <md-input
            v-model="restaurant.name"
            v-on:keyup.enter="displayInputName = !displayInputName"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputName = !displayInputName"
        >
          <md-icon v-if="!displayInputName">edit</md-icon>
          <md-icon v-if="displayInputName">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Nom de la cuisine-->
      <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>

        <div v-if="!displayInputCuisine" class="md-list-item-text">
          <span>Cuisine</span>
          <span>{{restaurant.cuisine}}</span>
        </div>

        <md-field v-if="displayInputCuisine">
          <label>Cuisine</label>
          <md-input
            v-model="restaurant.cuisine"
            v-on:keyup.enter="displayInputCuisine = !displayInputCuisine"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputCuisine = !displayInputCuisine"
        >
          <md-icon v-if="!displayInputCuisine">edit</md-icon>
          <md-icon v-if="displayInputCuisine">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Nom de l'arrondissement-->
      <md-list-item>
        <md-icon class="md-primary">location_city</md-icon>

        <div v-if="!displayInputBorough" class="md-list-item-text">
          <span>Arrondissement</span>
          <span>{{restaurant.borough}}</span>
        </div>

        <md-field v-if="displayInputBorough">
          <label>Arrondissement</label>
          <md-input
            v-model="restaurant.borough"
            v-on:keyup.enter="displayInputBorough = !displayInputBorough"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputBorough = !displayInputBorough"
        >
          <md-icon v-if="!displayInputBorough">edit</md-icon>
          <md-icon v-if="displayInputBorough">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Rue du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">streetview</md-icon>

        <div v-if="!displayInputStreet" class="md-list-item-text">
          <span>Rue</span>
          <span>{{restaurant.address.street}}</span>
        </div>

        <md-field v-if="displayInputStreet">
          <label>Rue</label>
          <md-input
            v-model="restaurant.address.street"
            v-on:keyup.enter="displayInputStreet = !displayInputStreet"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputStreet = !displayInputStreet"
        >
          <md-icon v-if="!displayInputStreet">edit</md-icon>
          <md-icon v-if="displayInputStreet">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Code postal du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">gps_not_fixed</md-icon>

        <div v-if="!displayInputZipCode" class="md-list-item-text">
          <span>Code postal</span>
          <span>{{restaurant.address.zipcode}}</span>
        </div>

        <md-field v-if="displayInputZipCode">
          <label>Code postal</label>
          <md-input
            v-model="restaurant.address.zipcode"
            v-on:keyup.enter="displayInputZipCode = !displayInputZipCode"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputZipCode = !displayInputZipCode"
        >
          <md-icon v-if="!displayInputZipCode">edit</md-icon>
          <md-icon v-if="displayInputZipCode">check_circle</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <!-- METTRE A JOUR -->
    <md-button class="md-primary md-raised" v-on:click="update">
      <md-icon>cached</md-icon>Mettre à jour
    </md-button>

    <!-- DELETE -->
    <md-button class="md-accent md-raised" v-on:click="deleteRestaurant()">
      <md-icon>delete</md-icon>Supprimer
    </md-button>

    <!-- AFFICHER LA CARTE -->
    <md-button class="md-raised maps" v-on:click="launch()">
      <md-icon style="color:white">streetview</md-icon>Afficher la carte
      <viewRestaurant @close="quit()"></viewRestaurant>
    </md-button>
  </div>
</template>

<script>
import viewRestaurant from "./viewRestaurant.vue";

export default {
  name: "displayRestaurant",
  components: {
    viewRestaurant
  },
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
      display: false,
      displayInputStreet: false,
      inputStreet: "",
      displayInputZipCode: false,
      inputZipCode: "",
      displayInputName: false,
      inputName: "",
      displayInputCuisine: false,
      inputCuisine: "",
      displayInputBorough: false,
      inputBorough: "",
      showModal: false,
      apiBaseURL: "http://localhost:9000/api/restaurants",
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
    retour: function() {
      this.display = false;
      this.$emit("display", false);
    },
    update: function() {
      this.restaurant.update = true;
      this.$emit("restaurantUpdated", this.restaurant);
    },
    deleteRestaurant: function() {
      this.restaurant.delete = true;
      this.$emit("restaurantUpdated", this.restaurant);
      this.retour();
    },
    launch() {
      this.$emit("showModal", (this.showModal = true));
      console.log("afficher la carte : OK\nshowModal = " + this.showModal);
    },
    quit() {
      this.$emit("showModal", (this.showModal = false));
    }
  }
};
</script>

<style >
.retour-icon {
  margin: 0% 0% 0% 0% !important;
}
.maps.md-button.md-theme-default.md-raised:not([disabled]) {
  background-color: #26bd07 !important;
  color: white;
}
</style>