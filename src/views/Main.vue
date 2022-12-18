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
        @click="showChain(build.type)"
      >
        <div>
          <div class="img">
            <img :src="build.imgPath" :alt="build.type" />
          </div>
        </div>
        <div class="count">
          <div class="utility">
            <div :class="[build.class, 'line']" :style="build.style"></div>
          </div>
          {{ Math.ceil(build.totatalIntake / build.productRate) }}
        </div>
      </div>
    </div>
    <div v-if="popupOpen">
      <PopupChain :product="popupProduct" @closePopup="popupOpen = false" />
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
        east: [
          "dates",
          "milk",
          "carpets",
          "pearls",
          "coffee",
          "toilet_water",
          "marzipan",
        ],
        resources: [
          "wood",
          "instruments",
          "stone",
          "glass",
          "ropes",
          "mosaic",
          "weapons",
          "military_vehicles",
          "cannons",
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
        console.log(industrialBuildings, product);
        let width =
          (industrialBuildings.totatalIntake * 100) /
          Math.ceil(
            industrialBuildings.totatalIntake / industrialBuildings.productRate
          ) /
          industrialBuildings.productRate;
        width = Math.floor(width);
        let color;
        if (width >= 90) {
          color = "critic";
        } else if (width >= 60) {
          color = "warning";
        } else if (width < 60){
          color = "good";
        } else {
          color = "";
        }
        console.log(width, "no floor");
        console.log(Math.floor(width));
        buildings.push({
          type: product,
          imgPath,
          ...industrialBuildings,
          style: {
            width: `${width}%`,
          },
          class: color,
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
    showChain(type) {
      this.popupProduct = type;
      this.popupOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  margin: 0.5rem;
  padding: 0.3rem;
  background-color: white;
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
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
  margin: 0.5rem;
}
.img {
  width: 46px;
  height: 46px;
}
.utility {
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  overflow: hidden;
  margin-bottom: 5px;
  border-radius: 3px;
  height: 5px;
  .line {
    width: 100%;
    height: 100%;
  }
  .good {
    background-color: #27ae60;
  }
  .warning {
    background-color: #f8ae4f;
  }
  .critic {
    background-color: #f74545;
  }
}
.count {
  margin-top: 2px;
}
</style>