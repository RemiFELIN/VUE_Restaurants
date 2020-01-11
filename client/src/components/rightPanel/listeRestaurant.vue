<template>
  <div id="listeRestaurant">
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Rechercher par nom..."
            v-model="nomRecherche"
            @input="getDataFromServer()"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        v-on:click="sendRestaurantData(item)"
        style="cursor:pointer"
      >
        <md-table-cell md-label="Nom" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Arrondissement" md-sort-by="borough">{{item.borough}}</md-table-cell>
        <md-table-cell md-label="Rue" md-sort-by="address.street">{{item.address.street}}</md-table-cell>
        <md-table-cell md-label="Code postal" md-sort-by="address.zipcode">{{item.address.zipcode}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "listeRestaurant",
  props: {
    msg: {}
  },
  data() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      page: 0,
      pagesize: 30,
      nomRecherche: "",
      restaurant: null
    };
  },
  watch: {
    msg: function() {
      this.restaurant = this.msg;
      if (this.restaurant.update) this.modifierRestaurant(this.restaurant);
      else if (this.restaurant.delete)
        this.supprimerRestaurant(this.restaurant._id);
      else this.ajouterRestaurant(this.restaurant);
    }
  },
  mounted() {
    this.getDataFromServer();
    this.resizeWindow();
  },
  methods: {
    async getDataFromServer() {
      let url =
        this.apiBaseURL +
        "?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      try {
        let reponseJSON = await fetch(url);
        let reponseJS = await reponseJSON.json();
        this.restaurants = reponseJS.data;
        this.nbRestaurants = reponseJS.count;
      } catch (err) {
        console.log("Erreur dans les fetchs GET " + err.msg);
      }
    },
    resizeWindow() {
      var headerHeight = document.getElementById("app").offsetHeight;
      var footerHeight = document.getElementById("footer").offsetHeight;
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
      this.getDataFromServer();
      console.log(reponseJS.msg);
    },
    async supprimerRestaurant(id) {
      try {
        let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
          method: "DELETE"
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant supprime : " + reponseJS.msg);
        this.getDataFromServer(); // on rafraichit l'affichage
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
        this.getDataFromServer(); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs PUT " + err.msg);
      }
    },
    sendRestaurantData(restaurant) {
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
</style>