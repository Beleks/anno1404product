import { createStore, createLogger } from "vuex";

export default createStore({
  state: {
    population: [
      {
        type: "beggar",
        place: "west",
        count: 0,
        intake: [
          {
            type: "fish",
            rate: 0.007,
          },
          {
            type: "cider",
            rate: 0.003,
          },
        ],
      },
      {
        type: "peasant",
        place: "west",
        count: 0,
        intake: [
          {
            type: "fish",
            rate: 0.01,
          },
          {
            type: "cider",
            rate: 0.0044,
          },
        ],
      },
      {
        type: "сitizen",
        place: "west",
        count: 0,
        intake: [
          {
            type: "fish",
            rate: 0.004,
          },
          {
            type: "cider",
            rate: 0.0044,
          },
          {
            type: "spices",
            rate: 0.004,
          },
          {
            type: "linen_garments",
            rate: 0.0042,
          },
        ],
      },
      {
        type: "patrician",
        place: "west",
        count: 0,
        intake: [
          {
            type: "fish",
            rate: 0.0022,
          },
          {
            type: "cider",
            rate: 0.0023,
          },
          {
            type: "spices",
            rate: 0.0022,
          },
          {
            type: "linen_garments",
            rate: 0.0019,
          },
          {
            type: "bread",
            rate: 0.0055,
          },
          {
            type: "beer",
            rate: 0.0024,
          },
          {
            type: "leather_jerkins",
            rate: 0.0028,
          },
          {
            type: "books",
            rate: 0.0016,
          },
          {
            type: "candlesticks",
            rate: 0.0008,
          },
        ],
      },
      {
        type: "noblemen",
        place: "west",
        count: 0,
        intake: [
          {
            type: "fish",
            rate: 0.0016,
          },
          {
            type: "cider",
            rate: 0.0013,
          },
          {
            type: "spices",
            rate: 0.0016,
          },
          {
            type: "linen_garments",
            rate: 0.0008,
          },
          {
            type: "bread",
            rate: 0.0039,
          },
          {
            type: "beer",
            rate: 0.0014,
          },
          {
            type: "leather_jerkins",
            rate: 0.0016,
          },
          {
            type: "books",
            rate: 0.0009,
          },
          {
            type: "candlesticks",
            rate: 0.0006,
          },
          {
            type: "meat",
            rate: 0.0022,
          },
          {
            type: "wine",
            rate: 0.002,
          },
          {
            type: "fur_coats",
            rate: 0.0016,
          },
          {
            type: "glasses",
            rate: 0.00117,
          },
          {
            type: "brocade_robes",
            rate: 0.00142,
          },
        ],
      },
      {
        type: "nomads",
        place: "east",
        count: 0,
        intake: [
          {
            type: "dates",
            rate: 0.00666,
          },
          {
            type: "milk",
            rate: 0.00344,
          },
          {
            type: "carpets",
            rate: 0.00165,
          },
        ],
      },
      {
        type: "envoys",
        place: "east",
        count: 0,
        intake: [
          {
            type: "dates",
            rate: 0.005,
          },
          {
            type: "milk",
            rate: 0.00225,
          },
          {
            type: "carpets",
            rate: 0.001,
          },
          {
            type: "pearls",
            rate: 0.00133,
          },
          {
            type: "coffee",
            rate: 0.001,
          },
          {
            type: "toilet_water",
            rate: 0.0008,
          },
          {
            type: "marzipan",
            rate: 0.00163,
          },
        ],
      },
    ],
    products: [
      {
        type: "fish",
        rate: 2,
      },
      {
        type: "cider",
        rate: 1.5,
      },
      {
        type: "spices",
        rate: 2,
      },
      {
        type: "linen_garments",
        rate: 2,
      },
      {
        type: "bread",
        rate: 4,
      },
      {
        type: "beer",
        rate: 1.5,
      },
      {
        type: "leather_jerkins",
        rate: 4,
      },
      {
        type: "books",
        rate: 3,
      },
      {
        type: "candlesticks",
        rate: 2,
      },
      {
        type: "meat",
        rate: 2.5,
      },
      {
        type: "wine",
        rate: 2,
      },
      {
        type: "fur_coats",
        rate: 2.5,
      },
      {
        type: "glasses",
        rate: 2,
      },
      {
        type: "brocade_robes",
        rate: 3,
      },
      {
        type: "dates",
        rate: 3,
      },
      {
        type: "milk",
        rate: 1.5,
      },
      {
        type: "carpets",
        rate: 1.5,
      },
      {
        type: "pearls",
        rate: 1,
      },
      {
        type: "coffee",
        rate: 1,
      },
      {
        type: "toilet_water",
        rate: 1,
      },
      {
        type: "marzipan",
        rate: 4,
      },
    ],
  },
  getters: {
    totalProductIntake: (state) => (product) => {
      let totatalIntake = 0; // Общее суммарное потребление this.product

      // Находим скорость производства нужного нам продукта
      let productRate = state.products.find((el) => el.type == product).rate;

      // Ищем продукт у жителей
      state.population.forEach((resident) => {
        let necessaryProduct = resident.intake.find(
          (element) => element.type == product
        );
        let necessaryProductRate = 0;

        // Есть ли такой продукт в потреблении, то считаем суммарное потребление (от кол-во жителей)
        if (necessaryProduct) {
          necessaryProductRate = necessaryProduct.rate * resident.count;
          totatalIntake += +necessaryProductRate;
        }
      });
      totatalIntake = +totatalIntake.toFixed(4);
      return { totatalIntake, productRate };
    },
    getPopulation: (state) => (place) => {
      return state.population.filter((resident) => resident.place == place);
    },
  },
  mutations: {
    setPopulation(state, population) {
      population.forEach((element) => {
        state.population.find((el) => el.type == element.type).count =
          element.count;
      });
      // state.population
    },
  },
  actions: {
    savePopulation({ commit, state }, population) {
      commit("setPopulation", population);
      localStorage.setItem("population", JSON.stringify(population));
    },
    getPopulation({ commit }) {
      let population = localStorage.getItem("population");
      if (population) {
        commit("setPopulation", JSON.parse(population));
      }
    },
  },
});
