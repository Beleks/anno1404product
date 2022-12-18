<template>
  <div class="rezidents">
    <div>
      <div class="rezident" v-for="(rezident, index) in rezidents" :key="index">
        <div>
          <img :src="rezident.imgPath" alt="" />
        </div>
        <div>
          <input type="number" min="0" max="100000" v-model="rezident.count" />
        </div>
      </div>
    </div>

    <div class="button" @click="saveChange()">Ок</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      value: 0,
      population: [
        {
          type: "beggar",
          count: 0,
        },
        {
          type: "peasant",
          count: 0,
        },
        {
          type: "сitizen",
          count: 0,
        },
        {
          type: "patrician",
          count: 0,
        },
        {
          type: "noblemen",
          count: 0,
        },
        {
          type: "nomads",
          count: 0,
        },
        {
          type: "envoys",
          count: 0,
        },
      ],
    };
  },
  computed: {
    rezidents() {
      let populationFromState = this.$store.state.population;
      for (let index = 0; index < populationFromState.length; index++) {
        let imgPath = new URL(
          `../assets/images/${populationFromState[index].type}.png`,
          import.meta.url
        ).href;
        this.population[index].imgPath = imgPath;
        this.population[index].count = populationFromState[index].count;
      }
      return this.population;
    },
  },
  methods: {
    saveChange() {
      let population = [];
      this.population.forEach((element) => {
        population.push({
          type: element.type,
          count: element.count,
        });
      });
      this.$store.dispatch("savePopulation", population);
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.rezidents {
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rezident {
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    background-color: white;
    text-align: left;
    border-radius: 3px;
    padding: 0.4rem 0.5rem;
    border: 1px solid rgb(200, 200, 200);
    &:focus {
      border: 1px solid #ffe4c4;
    }
  }
}

.button {
  font-weight: bold;
  margin-top: 1rem;
  background-color: #ffe4c4;
  border-radius: 5px;
  padding: 0.8rem 2rem;
}
input {
  all: unset;
}
</style>


