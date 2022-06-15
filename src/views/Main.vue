<template>
  <div>
    <div class="tabs">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active_tab: currentTab == tab.tab }"
        @click="switchTab(tab.tab)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="products">
      <div class="product" v-for="(build, index) in buildings" :key="index">
        <div>
          <div class="img">
            <img :src="build.imgPath" :alt="build.type" />
          </div>
          <!-- <div class="utility"></div> -->
        </div>
        <div class="count">
          {{ Math.ceil(build.totatalIntake / build.productRate) }}
        </div>
      </div>
    </div>
    <div v-if="popupOpen">
      <PopupChain />
    </div>
  </div>
</template>

<script>
// :src="`../assets/images/${build.type}.png`"

import PopupChain from "../components/PopupChain.vue";

export default {
  components: {
    PopupChain,
  },
  data() {
    return {
      tabs: [
        {
          tab: "west",
          title: "Запад",
        },
        {
          tab: "east",
          title: "Восток",
        },
        {
          tab: "resources",
          title: "Стр. ресурсы",
        },
        {
          tab: "menu",
          title: "Меню",
        },
      ],
      currentTab: "west",
      popupOpen: false,
      products: {
        west: [
          "fish",
          "cider",
          "spices",
          "linen_garments",
          "bread",
          "beer",
          "leather_jerkins",
          "books",
          "candlesticks",
          "meat",
          "wine",
          "fur_coats",
          "glasses",
          "brocade_robes",
        ],
        east: [
          "dates",
          "milk",
          "carpets",
          "pearls",
          "coffee",
          "toilet_water",
          "marzipan",
        ],
      },
    };
  },
  computed: {
    buildings() {
      let buildings = [];

      if (!this.products[this.currentTab]) {
        return;
      }

      this.products[this.currentTab].forEach((product) => {
        let imgPath = new URL(
          `../assets/images/${product}.png`,
          import.meta.url
        ).href;
        let industrialBuildings =
          this.$store.getters.totalProductIntake(product);
        buildings.push({
          type: product,
          imgPath,
          ...industrialBuildings,
        });
      });
      console.log(buildings);
      return buildings;
    },
  },
  methods: {
    switchTab(tab) {
      this.popupOpen = false;
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
}
.tab {
  flex-grow: 1;
  padding: 0.5rem 0;
}
.active_tab {
  background-color: bisque;
}
/* content */
.products {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.product {
  /* display: flex; */
  margin: 0.5rem;
}
.img {
  /* background-color: aquamarine; */
  width: 46px;
  height: 46px;
}
.utility {
  width: 4px;
  background-color: brown;
  /* height: 46px; */
}
.count {
  margin-top: 2px;
}
</style>