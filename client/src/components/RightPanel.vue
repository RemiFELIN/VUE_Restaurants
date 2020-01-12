<template>
  <div id="RightPanel">
    <listeRestaurant :pageNum="pageNum" :msg="childData" @restaurantData="updateCurrentRestaurant"></listeRestaurant>
    <footerPagination @pageNum="updatePageNum"></footerPagination>
  </div>
</template>

<script>
import listeRestaurant from "./rightPanel/listeRestaurant";
import footerPagination from "./rightPanel/footerPagination";

export default {
  name: "RightPanel",
  props: {
    msg: {}
  },
  watch: {
    msg: function() {
      this.childData = this.msg;
    }
  },
  components: {
    listeRestaurant,
    footerPagination
  },
  mounted() {
    this.resizeWindow();
  },
  data() {
    return {
      childData: "",
      currentRestaurant: "",
      resource_url:
        "http://hootlex.github.io/vuejs-paginator/samples/animals1.json",
      pageNum: 1
    };
  },
  methods: {
    updateCurrentRestaurant(variable) {
      this.$emit("restaurantData", variable);
    },
    resizeWindow() {
      var headerHeight = document.getElementById("app").offsetHeight;
      var RightPanel = document.getElementById("RightPanel");
      var newHeight = window.innerHeight - headerHeight;
      RightPanel.style.height = newHeight + "px";
    },
    updateResource(data) {
      this.animals = data;
    },
    updatePageNum(pageNum) {
      this.pageNum = pageNum;
    }
  }
};
</script>


<style >
#RightPanel {
  width: 75%;
  left: 25%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: calc(100% - 64px);
  position: fixed;
  background: white;
  overflow-y: auto;
}
</style>