<template>
  <div class="hello">
    <md-field>
      <label>Initial Value </label>
      <md-input v-model="initial"></md-input>
    </md-field>

    <md-field>
      <label>Initial Value (Read Only)</label>
      <md-input v-model="initial" readonly></md-input>
    </md-field>

    <md-field>
      <label>Type here!</label>
      <md-input v-model="type"></md-input>
      <span class="md-helper-text">Helper text</span>
    </md-field>

    <md-field>
      <label>With label</label>
      <md-input v-model="withLabel" placeholder="A nice placeholder"></md-input>
    </md-field>

    <md-field md-inline>
      <label>Inline</label>
      <md-input v-model="inline"></md-input>
    </md-field>

    <md-field>
      <label>Number</label>
      <md-input v-model="number" type="number"></md-input>
    </md-field>

    <md-field>
      <label>Textarea</label>
      <md-textarea v-model="textarea"></md-textarea>
    </md-field>

    <md-field>
      <label>Textarea with Autogrow</label>
      <md-textarea v-model="autogrow" md-autogrow></md-textarea>
    </md-field>

    <md-field>
      <label>Disabled</label>
      <md-input v-model="disabled" disabled></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => ({
    initial: "Initial Value",
    type: null,
    withLabel: null,
    inline: null,
    number: null,
    textarea: null,
    autogrow: null,
    disabled: null,
    responseBack: null,
    apiBaseURL: "http://localhost:9000/api/restaurants"
  }),
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getDataFromServer();
  },
  methods: {
    async getDataFromServer() {
      let url = this.apiBaseURL;
      try {
        let reponseJSON = await fetch(url);
        let reponseJS = await reponseJSON.json();
        console.log("la reponse JS:", reponseJS);
        this.responseBack = reponseJS.data;
      } catch (err) {
        console.log("Erreur dans les fetchs GET " + err.msg);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
