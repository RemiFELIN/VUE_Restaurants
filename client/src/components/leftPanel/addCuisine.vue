
<template>
  <div id="addCuisine" v-if="display">
    <md-list class="md-double-line">
      <md-subheader>Restaurant</md-subheader>

      <md-list-item>
        <md-icon class="md-primary">create</md-icon>
        <md-field>
          <label>Nom</label>
          <md-input v-model="nom" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>
        <md-field>
          <label>Cuisine</label>
          <md-input v-model="cuisine" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">streetview</md-icon>
        <md-field>
          <label>Rue</label>
          <md-input v-model="street" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">location_searching</md-icon>
        <md-field>
          <label>Code Postal</label>
          <md-input v-model="zipCode" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-button
          class="md-raised md-primary"
          style="margin:auto"
          v-on:click="submit"
          v-bind:disabled="this.nom == '' || this.cuisine == '' || this.street == '' || this.zipCode == ''"
        >Ajouter</md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "addCuisine",
  props: {
    displayAddCuisine: {
      type: Boolean
    }
  },
  watch: {
    displayAddCuisine: function() {
      this.display = this.displayAddCuisine;
    }
  },
  data() {
    return {
      nom: "",
      cuisine: "",
      zipCode: "",
      street: "",
      display: true
    };
  },
  methods: {
    submit: function() {
      var restaurant = {
        name: this.nom,
        cuisine: this.cuisine,
        address: {
          street: this.street,
          zipcode: this.zipCode
        }
      };
      this.$emit("inputData", restaurant);
      this.cuisine = "";
      this.nom = "";
      this.street = "";
      this.zipCode = "";
    },
    onEnter: function() {
      if(this.nom != '' && this.cuisine != '' && this.street != '' && this.zipCode != '')
        this.submit();
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
</style>