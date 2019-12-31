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

      <md-table-row v-for="item in restaurants" :key="item.id">
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
    msg: {
      type: String
    }
  },
  data() {
    return {
      restaurants: [],
      nbRestaurants: 0,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      page: 0,
      pagesize: 20,
      nomRecherche: ""
    };
  },
  watch: {
    msg: function() {
      var restaurant = {
        name: this.msg.split(";")[0],
        cuisine: this.msg.split(";")[1],
        address: {
          street: this.msg.split(";")[2],
          zipcode: this.msg.split(";")[3]
        }
      };
      this.restaurants.push(restaurant);
      this.ajouterRestaurant(restaurant);
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

      let donneesFormulaire = new FormData();
      donneesFormulaire.append("name", restaurant.name);
      donneesFormulaire.append("cuisine", restaurant.cuisine);
      donneesFormulaire.append("address", restaurant.address);

      let reponseJSON = await fetch(this.apiBaseURL, {
        method: "POST",
        body: donneesFormulaire
      });
      let reponseJS = await reponseJSON.json();
      console.log(reponseJS.msg);

    },

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
  overflow-y: scroll;
}
.md-table-head {
  text-align: center !important;
}
</style>