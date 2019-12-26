<template>
  <div>
    <li>{{ nom }}</li>
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
      nbRestaurants:0,
      page:0,
      pagesize:10,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      nom: String,
      cuisine: String,
      restaurants: [],
    };
  },
  watch: {
    msg:  function() {
      this.nom = this.msg.split(";")[0];
      this.cuisine = this.msg.split(";")[1];
      // this.getDataFromServer(this.nom);
    }
  },
  // methods: {
  //   async getDataFromServer(nom) {

  //     // Avec await
  //     let url = this.apiBaseURL +
  //     "?page=" + this.page +
  //     "&pagesize=" + this.pagesize +
  //     "&name=" + nom;

  //     try {
  //       let reponseJSON = await fetch(url);
  //       let reponseJS = await reponseJSON.json();
  //       this.restaurants = reponseJS.data;
  //       this.nbRestaurants = reponseJS.count;
  //     } catch (err) {
  //       console.log("Erreur dans les fetchs GET " + err.msg);
  //     }
  //   }
  // }
};
</script>


<style >
#RightPanel {
  width: 75%;
  left: 25%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  position: fixed;
  background: white;
}
</style>