
<template>
  <div id="leftPanel">
    <md-list class="md-double-line">
      <md-subheader>Restaurant                 
    </md-subheader>

      <md-list-item>
        <md-icon class="md-primary">create</md-icon>
        <md-field>
          <label>Nom</label>
          <md-input v-model="type"></md-input>
        </md-field>
      </md-list-item>

    <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>
        <md-field>
          <label>Cuisine</label>
          <md-input v-model="type"></md-input>
        </md-field>
      </md-list-item>

      <md-list-item>
          <md-button class="md-raised md-primary" style="margin:auto">Ajouter</md-button>
      </md-list-item>

    </md-list>
  </div>
</template>

<script>
export default {
  name: "LeftPanel"
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