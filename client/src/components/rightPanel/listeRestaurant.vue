<template>
  <div id="listeRestaurant">
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Rechercher par nom..."
            v-model="nomRecherche"
            @input="getDataFromServer(0)"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        v-on:click="sendRestaurantData(item)"
        style="cursor:pointer"
        :class="{active: restaurant === item}"
      >
        <md-table-cell md-label="Nom" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Arrondissement" md-sort-by="borough">{{item.borough}}</md-table-cell>
        <md-table-cell md-label="Rue" md-sort-by="address.street">{{item.address.street}}</md-table-cell>
        <md-table-cell md-label="Code postal" md-sort-by="address.zipcode">{{item.address.zipcode}}</md-table-cell>
      </md-table-row>
    </md-table>

    <md-snackbar
      md-position="left"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{snackbarText}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Fermer</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import RestaurantService from "../../services/RestaurantService";

export default {
  name: "listeRestaurant",
  props: {
    msg: {},
    pageNum: {}
  },
  data() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      page: 0,
      pagesize: 30,
      nomRecherche: "",
      restaurant: null,
      showSnackbar: false,
      snackbarText: ""
    };
  },
  watch: {
    msg: function() {
      this.restaurant = this.msg;
      if (this.restaurant.update) this.modifierRestaurant(this.restaurant);
      else if (this.restaurant.delete)
        this.supprimerRestaurant(this.restaurant._id);
      else this.ajouterRestaurant(this.restaurant);
    },
    pageNum: function() {
      this.page = this.pageNum;
      this.getDataFromServer(this.page);
    }
  },
  mounted() {
    this.getDataFromServer(0);
    this.resizeWindow();
  },
  methods: {
    async getDataFromServer(page) {
      let url =
        this.apiBaseURL +
        "?page=" +
        page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      try {
        let reponseJSON = await fetch(url);
        let reponseJS = await reponseJSON.json();
        this.restaurants = reponseJS.data;
        this.nbRestaurants = reponseJS.count;
        RestaurantService.setNbResults(this.nbRestaurants);
        console.log(RestaurantService.getNbResults())
      } catch (err) {
        console.log("Erreur dans les fetchs GET " + err.msg);
      }
    },
    resizeWindow() {
      var headerHeight = document.getElementById("app").offsetHeight;
      var footerHeight = document.getElementById("footerPagination")
        .offsetHeight;
      var listeRestaurant = document.getElementById("listeRestaurant");
      var newHeight = window.innerHeight - (headerHeight + footerHeight);
      listeRestaurant.style.height = newHeight + "px";
    },
    async ajouterRestaurant(restaurant) {
      let donneesFormulaire = new FormData();
      donneesFormulaire.append("name", restaurant.name);
      donneesFormulaire.append("cuisine", restaurant.cuisine);
      donneesFormulaire.append("borough", restaurant.borough);
      donneesFormulaire.append("street", restaurant.address.street);
      donneesFormulaire.append("zipcode", restaurant.address.zipcode);

      let reponseJSON = await fetch(this.apiBaseURL, {
        method: "POST",
        body: donneesFormulaire
      });
      let reponseJS = await reponseJSON.json();
      console.log("Restaurant ajouté : " + reponseJS.msg);
      this.snackbarText = "Le restaurant a bien été ajouté";
      this.showSnackbar = true;
      this.getDataFromServer(this.page);
    },
    async supprimerRestaurant(id) {
      try {
        let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
          method: "DELETE"
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant supprimé : " + reponseJS.msg);
        this.snackbarText = "Le restaurant a bien été supprimé";
        this.showSnackbar = true;
        this.getDataFromServer(this.page); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs DELETE " + err.msg);
      }
    },
    async modifierRestaurant(restaurant) {
      try {
        let donneesFormulaire = new FormData();
        donneesFormulaire.append("name", restaurant.name);
        donneesFormulaire.append("cuisine", restaurant.cuisine);
        donneesFormulaire.append("borough", restaurant.borough);
        donneesFormulaire.append("street", restaurant.address.street);
        donneesFormulaire.append("zipcode", restaurant.address.zipcode);
        let reponseJSON = await fetch(this.apiBaseURL + "/" + restaurant._id, {
          method: "PUT",
          body: donneesFormulaire
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant modifié : " + reponseJS.msg);
        this.snackbarText = "Le restaurant a bien été mis à jour";
        this.showSnackbar = true;
        this.getDataFromServer(this.page); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs PUT " + err.msg);
      }
    },
    sendRestaurantData(restaurant) {
      this.restaurant = restaurant;
      this.$emit("restaurantData", restaurant);
    }
  }
};
</script>


<style >
.md-table-head {
  text-align: center !important;
}
#listeRestaurant {
  height: calc(100% - 84);
  overflow-y: auto;
}
.active {
  background-color: lightblue;
}
</style>