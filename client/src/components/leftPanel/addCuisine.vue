
<template>
  <div id="addCuisine" v-if="display">
    <md-list class="md-double-line">
      <md-subheader>     <md-switch v-model="admin">Mode admin</md-switch></md-subheader>

      <md-list-item>
        <md-icon class="md-primary">create</md-icon>
        <md-field>
          <label>Nom</label>
          <md-input v-bind:disabled='!admin'  v-model="nom" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>
        <md-field>
          <label>Cuisine</label>
          <md-input v-bind:disabled='!admin'  v-model="cuisine" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">location_city</md-icon>
        <md-field>
          <label>Arrondissement (optionnel)</label>
          <md-input v-bind:disabled='!admin' v-model="borough" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">streetview</md-icon>
        <md-field>
          <label>Rue (optionnel)</label>
          <md-input v-bind:disabled='!admin' v-model="street" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-icon class="md-primary">location_searching</md-icon>
        <md-field>
          <label>Code Postal (optionnel)</label>
          <md-input v-bind:disabled='!admin' v-model="zipCode" v-on:keyup.enter="onEnter"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
        <md-button
          class="md-raised md-primary"
          style="margin:auto"
          v-on:click="submit"
          v-bind:disabled="this.nom == '' || this.cuisine == '' || !this.admin"
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
      borough: "",
      display: true,
      admin:false
    };
  },
  methods: {
    submit: function() {
      var restaurant = {
        name: this.nom,
        cuisine: this.cuisine,
        borough: this.borough,
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
      this.borough = "";
    },
    onEnter: function() {
      if (
        this.nom != "" &&
        this.cuisine != "" && this.admin
      )
        this.submit();
    }
  }
};
</script>

<style >
</style>