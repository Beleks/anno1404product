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
    <div v-if="this.currentTab == 'east' || this.currentTab == 'west'">
      <div class="population" @click="changePopulation()">
        <div class="residents">
          <div
            class="resident"
            v-for="(resident, index) in residents"
            :key="index"
          >
            <div class="resident_img">
              <img :src="resident.imgPath" :alt="resident.type" />
            </div>
            <div class="count_resident">{{ resident.count }}</div>
          </div>
        </div>
      </div>
      <span>Необходимое кол-во зданий:</span>
    </div>
    <div class="products">
      <div
        class="product"
        v-for="(build, index) in buildings"
        :key="index"
        @click="showChain()"
      >
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
      <PopupChain :product="popupProduct" />
    </div>
  </div>
</template>

<script>
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
        // {
        //   tab: "menu",
        //   title: "Меню",
        // },
      ],
      currentTab: "west",
      popupOpen: false,
      popupProduct: "",
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
      return buildings;
    },
    residents() {
      if (this.currentTab == "east" || this.currentTab == "west") {
        let residents = this.$store.getters.getPopulation(this.currentTab);

        residents.forEach((element) => {
          let imgPath = new URL(
            `../assets/images/${element.type}.png`,
            import.meta.url
          ).href;
          element.imgPath = imgPath;
        });
        return residents;
      }
    },
  },
  methods: {
    switchTab(tab) {
      this.popupOpen = false;
      this.currentTab = tab;
    },
    changePopulation() {
      this.$router.push({
        name: "Population",
      });
    },
    showChain() {
      this.popupOpen = true;
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
  padding: 0.6rem 0;
}
.active_tab {
  background-color: #ffe4c4;
}
.population {
  margin-top: 0.5rem;
  padding: 1rem;
}
.residents {
  display: flex;
  justify-content: space-around;
}
.resident {
  display: flex;
  align-items: center;
}
.resident_img {
  margin-right: 2px;
}
.resident_img img {
  width: 20px;
  height: 20px;
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