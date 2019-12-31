
<template >
  <div id="displayRestaurant">
    <md-table v-if="resturant" :key="componentKey">
      <md-table-row md-numeric>ID:{{resturant.restaurant_id}}</md-table-row>
      <md-table-row>Nom:{{resturant.name}}</md-table-row>
      <md-table-row>Cuisine:{{resturant.cuisine}}</md-table-row>
      <md-table-row>Arrondissement:{{resturant.borough}}</md-table-row>
      <md-table-row>Rue:{{resturant.address.street}}</md-table-row>
      <md-table-row>Code Postal:{{resturant.address.zipcode}}</md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "displayRestaurant",
  props: {
    msg: {
      type: null
    }
  },
  data() {
    return {
      resturant: null,
      componentKey:0
    };
  },
  watch: {
    msg: function() {
      console.log(this.msg);
      this.resturant = this.msg;
      this.componentKey += 1;
    }
  }
};
</script>

<style >
</style>