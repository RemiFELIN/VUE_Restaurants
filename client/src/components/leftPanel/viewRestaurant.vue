<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Voici la carte
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          Ajouter la carte
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-close"
              @click="close()"
            >
              Ok
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  template: '#modal-template',
  name: "viewRestaurant",
  props: {
    msg: {
      type: null
    }
  },
  watch: {
    msg: function() {
      //this.showModal = true;
    }
  },
  data() {
    return {
      lat: "",
      lng: "",
      zoom: 11,
      showModal: "",
      //https://www.openstreetmap.org/#map=**ZOOM**/**LAT**/**LNG**
      apiBaseURL: "https://www.openstreetmap.org/",
    };
  },
  methods: {
    async getMapWithOpenStreetMap(){
        let urlAPI = this.apiBaseURL + "#map=" + this.zoom + "/" + this.lat + "/" + this.lng
        //try {
        let reponseJSON = await fetch(urlAPI);
        let reponseJS = await reponseJSON.json();
        console.log("test : " + reponseJS)
        //} catch (err) {
            //console.log("Erreur dans les fetchs GET " + err.msg);
        //}
    },
    close() {
      this.$emit("close")
      console.log("close clicked")
    }
  }
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>