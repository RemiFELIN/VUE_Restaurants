
<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title"><md-icon>room_service</md-icon>  Gestionnaire de menus pour restaurants </h3>
    </md-toolbar>
    <LeftPanel/>
  </div>
</template>

<script>
import LeftPanel from './components/LeftPanel.vue'

import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

export default {
  name: 'app',
  components: {
    LeftPanel
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
