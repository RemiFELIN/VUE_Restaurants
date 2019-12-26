
<template>
  <div id="leftPanel">
    <md-list class="md-double-line">
      <md-subheader>Restaurant                 
    </md-subheader>

      <md-list-item>
        <md-icon class="md-primary">create</md-icon>
        <md-field>
          <label>Nom</label>
          <md-input v-model="nom" ></md-input>
        </md-field>
      </md-list-item>

    <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>
        <md-field >
          <label>Cuisine</label>
          <md-input v-model="cuisine" ></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
          <md-button class="md-raised md-primary" style="margin:auto" v-on:click="submit">Ajouter</md-button>
      </md-list-item>

    </md-list>
  </div>
</template>

<script>
export default {
  name: "LeftPanel",
  data() {
    return {
      nom: "",
      cuisine: ""
    };
  },
  methods: {
    submit: function() {
      var virgule = /;/i;
      if(this.nom.match(virgule) || this.cuisine.match(virgule))
        alert("Le caractère ';' est interdit !");
      else if(this.nom != "" && this.cuisine != ""){
        this.$emit("inputData", this.nom + ";"  + this.cuisine);
        this.cuisine = "";
        this.nom = "";
      }
    }
  }
};
</script>

<style >
#leftPanel {
    width:25%;
    border: 1px solid rgba(0,0,0,0.12);
    height:100%;
    position: fixed;
    background: white;
}
</style>