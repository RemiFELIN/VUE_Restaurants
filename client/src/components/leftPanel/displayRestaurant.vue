<template>
  <div id="displayRestaurant" v-if="display">
    <md-button @click="retour">
      <md-subheader>
        <md-icon class="retour-icon">keyboard_backspace</md-icon>Retour
      </md-subheader>
    </md-button>

    <md-list class="md-double-line">
      <!-- Photo du restaurant -->
      <md-list-item>
        <md-progress-spinner
          style="       position: absolute;
   left: 40%;
   top: 40%;
"
          v-if="!loaded"
          md-mode="indeterminate"
        ></md-progress-spinner>
        <img
          v-if="!restaurant.image "
          v-bind:style="{ opacity: activeOpacity}"
          :src="imgRestaurant[i]"
          v-on:load="loadImage"
        />
        <img
          v-if="restaurant.image "
          v-bind:style="{ opacity: activeOpacity}"
          :src="restaurant.image"
          v-on:load="loadImage"
        />
      </md-list-item>

      <!-- Note du restaurant -->
      <md-list-item>
        <star-rating
          v-if="restaurant.grades"
          :read-only="true"
          v-model="noteMoy"
          style="margin:auto"
          :round-start-rating="false"
        ></star-rating>
        <star-rating v-if="!restaurant.grades" :read-only="true" style="margin:auto"></star-rating>
      </md-list-item>

      <!--Nom du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">assignment</md-icon>

        <div v-if="!displayInputName" class="md-list-item-text">
          <span>Nom</span>
          <span>{{restaurant.name}}</span>
        </div>

        <md-field v-if="displayInputName">
          <label>Nom</label>
          <md-input
            v-model="restaurant.name"
            v-on:keyup.enter="displayInputName = !displayInputName"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputName = !displayInputName"
        >
          <md-icon v-if="!displayInputName">edit</md-icon>
          <md-icon v-if="displayInputName">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Nom de la cuisine-->
      <md-list-item>
        <md-icon class="md-primary">kitchen</md-icon>

        <div v-if="!displayInputCuisine" class="md-list-item-text">
          <span>Cuisine</span>
          <span>{{restaurant.cuisine}}</span>
        </div>

        <md-field v-if="displayInputCuisine">
          <label>Cuisine</label>
          <md-input
            v-model="restaurant.cuisine"
            v-on:keyup.enter="displayInputCuisine = !displayInputCuisine"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputCuisine = !displayInputCuisine"
        >
          <md-icon v-if="!displayInputCuisine">edit</md-icon>
          <md-icon v-if="displayInputCuisine">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Nom de l'arrondissement-->
      <md-list-item>
        <md-icon class="md-primary">location_city</md-icon>

        <div v-if="!displayInputBorough" class="md-list-item-text">
          <span>Arrondissement</span>
          <span>{{restaurant.borough}}</span>
        </div>

        <md-field v-if="displayInputBorough">
          <label>Arrondissement</label>
          <md-input
            v-model="restaurant.borough"
            v-on:keyup.enter="displayInputBorough = !displayInputBorough"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputBorough = !displayInputBorough"
        >
          <md-icon v-if="!displayInputBorough">edit</md-icon>
          <md-icon v-if="displayInputBorough">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Rue du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">streetview</md-icon>

        <div v-if="!displayInputStreet" class="md-list-item-text">
          <span>Rue</span>
          <span>{{restaurant.address.street}}</span>
        </div>

        <md-field v-if="displayInputStreet">
          <label>Rue</label>
          <md-input
            v-model="restaurant.address.street"
            v-on:keyup.enter="displayInputStreet = !displayInputStreet"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputStreet = !displayInputStreet"
        >
          <md-icon v-if="!displayInputStreet">edit</md-icon>
          <md-icon v-if="displayInputStreet">check_circle</md-icon>
        </md-button>
      </md-list-item>

      <!--Code postal du restaurant-->
      <md-list-item>
        <md-icon class="md-primary">gps_not_fixed</md-icon>

        <div v-if="!displayInputZipCode" class="md-list-item-text">
          <span>Code postal</span>
          <span>{{restaurant.address.zipcode}}</span>
        </div>

        <md-field v-if="displayInputZipCode">
          <label>Code postal</label>
          <md-input
            v-model="restaurant.address.zipcode"
            v-on:keyup.enter="displayInputZipCode = !displayInputZipCode"
          ></md-input>
        </md-field>

        <md-button
          class="md-icon-button md-list-action"
          v-on:click="displayInputZipCode = !displayInputZipCode"
        >
          <md-icon v-if="!displayInputZipCode">edit</md-icon>
          <md-icon v-if="displayInputZipCode">check_circle</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <!-- METTRE A JOUR -->
    <md-button class="md-primary md-raised" v-on:click="update">
      <md-icon>cached</md-icon>Mettre à jour
    </md-button>

    <!-- DELETE -->
    <md-button class="md-accent md-raised" v-on:click="deleteRestaurant()">
      <md-icon>delete</md-icon>Supprimer
    </md-button>

    <!-- AFFICHER LA CARTE -->
    <md-button class="md-raised maps" id="show-modal" @click="showModal">
      <md-icon style="color:white">streetview</md-icon>Afficher la localisation
    </md-button>

    <!-- AFFICHER LE MENU -->
    <!-- <md-button class="md-raised maps" id="show-modal" @click="showModal">
      <md-icon style="color:white">streetview</md-icon>Afficher le menu
    </md-button>-->
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
  watch: {
    msg: function() {
      this.display = true;
      this.msg.delete = false;
      this.msg.update = false;
      this.restaurant = this.msg;
      this.loaded = false;
      this.activeOpacity = 0.3;
      if (!this.restaurant.image) {
        if (this.i < this.imgRestaurant.length - 1) this.i++;
        else this.i = 0;
        this.restaurant.image = this.imgRestaurant[this.i];
      }
      this.moyenneDesScores();
    }
  },
  data() {
    return {
      display: false,
      displayInputStreet: false,
      inputStreet: "",
      displayInputZipCode: false,
      inputZipCode: "",
      displayInputName: false,
      inputName: "",
      displayInputCuisine: false,
      inputCuisine: "",
      displayInputBorough: false,
      inputBorough: "",
      noteMoy: 0,
      apiBaseURL: "http://localhost:9000/api/restaurants",
      restaurant: {
        restaurant_id: null,
        name: null,
        cuisine: null,
        borough: null,
        address: {
          street: null,
          zipcode: null,
          coord: null
        },
        grades: [{ date: { $date: null }, grade: null, score: null }],
        image: null,
        activeOpacity: 0.3
      },
      imgRestaurant: [
        "http://d16jvv1mxapgw7.cloudfront.net/cover_hemisphere_regaliaResidence.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/02/21/c7/29/the-french-connection.jpg",
        "https://www.omnihotels.com/-/media/images/hotels/indsev/restaurants/indsev-omni-severin-hotel-1913-restaurant-1.jpg?h=660&la=en&w=1170",
        "https://www.sensesrestaurant.nl/heading/home_48.jpg",
        "https://repo.restaurant.michelin.fr/sites/mtppoi/files/mirazur-menton-20190405-4.jpg",
        "http://www.longisland.com/site_media/images/restaurants/photo_gallery/5565_12_l.jpg",
        "https://abqsunport.com/wp-content/uploads/2014/08/Shops-Restaurants1.jpg",
        "https://avitaltours.com/san-francisco/wp-content/uploads/sites/3/2016/04/San-francisco-restaurants-for-a-business-lunch.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hippopotamus_Montparnasse_Paris_2018_-%C2%AEYann_Deret-8467.jpg/1200px-Hippopotamus_Montparnasse_Paris_2018_-%C2%AEYann_Deret-8467.jpg",
        "https://libertyhouserestaurant.com/wp-content/uploads/sites/13/2016/11/slide-restaurant.jpg",
        "https://i.ytimg.com/vi/OOXbPzgv42g/maxresdefault.jpg",
        "https://www.centarahotelsresorts.com/centara/chy/images/uploads/gallery/thumb/hat-yai-ginger-restaurant-01-640x457.jpg",
        "https://www.movenpick.com/fileadmin/_processed_/0/4/csm_Geneva_xxxxxxxx_i113630_03_5e64eb4cf2.jpg",
        "https://www.floornature.com/media/photos/1/13265/11_lina-ghotmeh-architecture_les-grands-verres_ph-takuji-shimmura_full.jpg",
        "https://secure.i.telegraph.co.uk/multimedia/archive/01113/murano_1113808a.jpg",
        "https://www.bestoftoronto.net/wp-content/uploads/2017/06/NoceRestaurant-BestofToronto-2017-008.jpg",
        "http://www.alpinemountainchalets.com/wp-content/uploads/2013/07/Inside-Restaurant.jpg",
        "https://i.ytimg.com/vi/YR97ghYXfWs/maxresdefault.jpg",
        "http://apparelmagazine.co.nz/restaurantandcafe/wp-content/uploads/sites/3/2018/04/RC-NEWS-RESTAURANTS-TO-BECOME-HEALTH-HAVENS-0518.jpeg",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iamsterdam.com%2Fmedia%2Flocations-ndtrc%2Frestaurants%2Fbordeau-restaurant-amsterdam.jpg%3Fas%3Dfalse%26h%3D328%26w%3D580%26iar%3Dtrue&f=1&nofb=1"
      ],
      i: 0,
      loaded: false
    };
  },
  methods: {
    moyenneDesScores: function() {
      //Moyenne de tout les scores du restaurant sur 20
      if (this.restaurant.grades) {
        this.noteMoy = 0;
        this.restaurant.grades.forEach(item => {
          this.noteMoy += item.score;
        });
        this.noteMoy = parseFloat(
          (this.noteMoy / (this.restaurant.grades.length * 4)).toFixed(2)
        );
        if (this.noteMoy > 5) this.noteMoy = 5;
      }
    },
    retour: function() {
      this.display = false;
      this.$emit("display", false);
    },
    update: function() {
      this.restaurant.update = true;
      this.$emit("restaurantUpdated", this.restaurant);
    },
    deleteRestaurant: function() {
      this.restaurant.delete = true;
      this.$emit("restaurantUpdated", this.restaurant);
    },
    showModal: function() {
      this.$modal.show("modal");
      this.$emit("mapsRestaurant", this.restaurant);
    },
    loadImage: function() {
      this.loaded = true;
      this.activeOpacity = 1;
    }
  }
};
</script>

<style >
.retour-icon {
  margin: 0% 0% 0% 0% !important;
}
.maps.md-button.md-theme-default.md-raised:not([disabled]) {
  background-color: #26bd07 !important;
  color: white;
}
.opacityLow {
  opacity: 1;
}
</style>