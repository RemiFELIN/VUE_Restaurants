<template>
  <div id="RightPanel">
    <md-table>
      <md-table-row>
        <!-- <md-table-head md-numeric>ID</md-table-head> -->
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
        <!-- <md-table-head>Arrondissement</md-table-head> -->
        <md-table-head>Rue</md-table-head>
        <md-table-head>Code Postal</md-table-head>
      </md-table-row>

      <md-table-row
        v-for="item in restaurants"
        :key="item.id"
        v-on:click="sendRestaurantData(item)"
        style="cursor:pointer"
      >
        <!-- <md-table-cell md-numeric>{{item.restaurant_id}}</md-table-cell> -->
        <md-table-cell>{{item.name}}</md-table-cell>
        <md-table-cell>{{item.cuisine}}</md-table-cell>
        <!-- <md-table-cell>{{item.borough}}</md-table-cell> -->
        <md-table-cell>{{item.address.street}}</md-table-cell>
        <md-table-cell>{{item.address.zipcode}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  props: {
    msg: {}
  },
  data() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      page: 0,
      pagesize: 20,
      nomRecherche: "",
      restaurant: null
    };
  },
  watch: {
    msg: function() {
      this.restaurant = this.msg;
      if (this.restaurant.restaurant_id) this.modifierRestaurant(this.restaurant);
      else this.ajouterRestaurant(this.restaurant);
    }
  },
  mounted() {
    this.getDataFromServer();
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
    async ajouterRestaurant(restaurant) {
      this.restaurants.push(restaurant);
      let donneesFormulaire = new FormData();
      donneesFormulaire.append("name", restaurant.name);
      donneesFormulaire.append("cuisine", restaurant.cuisine);
      donneesFormulaire.append("address.street", restaurant.address.street);
      donneesFormulaire.append("address.zipcode", restaurant.address.zipcode);

      let reponseJSON = await fetch(this.apiBaseURL, {
        method: "POST",
        body: donneesFormulaire
      });
      let reponseJS = await reponseJSON.json();
      console.log(reponseJS.msg);
    },
    sendRestaurantData(restaurant) {
      this.$emit("restaurantData", restaurant);
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
        donneesFormulaire.append("restaurant_id", restaurant.restaurant_id);
        donneesFormulaire.append("cuisine", restaurant.cuisine);
        let reponseJSON = await fetch(this.apiBaseURL + "/" + restaurant.restaurant_id, {
          method: "PUT",
          body: donneesFormulaire
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant modifié : " + reponseJS.msg);
        // this.getDataFromServer(); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs DELETE " + err.msg);
      }
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
.md-table-head {
  text-align: center !important;
}
</style>