<template>
  <div id="modalMaps">
    <modal name="remiNeSaitPasAffichierUneModale" v-if="currentRestaurant"><ul v-if="currentRestaurant.address.coord">
      <li>Latitude:{{currentRestaurant.address.coord[0]}}</li>
      <li>Longitude:{{currentRestaurant.address.coord[1]}}</li>
      </ul>
      <div v-if="!currentRestaurant.address.coord">Ce restaurant n'a pas de Longitude/latitude</div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "modalMaps",
  props: {
    msg: {}
  },
  watch: {
    msg: function() {
      this.currentRestaurant = this.msg;
    }
  },
  data() {
    return {
      currentRestaurant: null
    };
  }
};
</script>