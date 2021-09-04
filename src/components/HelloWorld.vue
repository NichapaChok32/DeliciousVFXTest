<template>
  <div id="CarsList">
    <v-row class="cars-row">
      <v-col
        v-for="(item, index) in carsList"
        :key="index"
        class="cars-col"
        cols="3"
      >
        <v-card class="cars-box">
          <v-row class="cars-header">
            <v-col class="cars-header-col col-left" cols="6">
              <v-card-title class="cars-name">
                {{ item.name }}
              </v-card-title>
            </v-col>
            <v-col class="cars-header-col col-right" cols="6">
              <v-btn class="btnDelete" @click="deleteCars(item)">
                <v-icon>fa-times</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-card-subtitle class="cars-year">{{ item.year }}</v-card-subtitle>
          <v-card-text :style="`color: ${item.color}; font-weight: bold`">{{ item.color }}</v-card-text>
          <div class="cars-img">
            <span class="cars">{{ item.brand + ' Image' }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CarsProvider from '../middleware/resources/cars_provider'
const carsService = new CarsProvider()
export default {
  name: 'HelloWorld',
  data () {
    return {
      result: [],
    }
  },
  computed: {
    carsList() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      return this.result.filter(c => c.year >= 2000 && c.year <= 2007).sort((a, b) => compare(a, b) && (a.year - b.year))
    },
  },
  mounted () {
    this.getCarsList()
  },
  methods: {
    async getCarsList() {
      try {
        await carsService.getLists().then((response) => {
          const lists = response
          for (let i = 0; i < lists.length; i++) {
            const car = {
              id: lists[i].id,
              name: lists[i].brand + ' ' + lists[i].model,
              brand: lists[i].brand,
              year: lists[i].year,
              owner: lists[i].owner,
              color: lists[i].color,
            }
            this.result.push(car)
          }
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    deleteCars(car) {
      for (let i = 0; i < this.result.length; i++) {
        if (car.id === this.result[i].id) {
          this.result.splice(i, 1)
        }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#CarsList {
  width: 100%;
  padding: 0;
  margin: 0 7%;
  display: flex;
  flex-wrap: nowrap;
  .cars-row {
    width: 100%;
    margin: 0 auto;
    .cars-col {
      width: 33.33%;
      max-width: 33.33%;
      margin: 10px;
      padding: 0;
      flex: 0 0 20%;
      .cars-box {
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        box-shadow: none;
        .cars-header {
          width: 100%;
          margin: 0;
          .cars-header-col {
            width: 50%;
            max-width: 50%;
            .btnDelete {
              width: fit-content;
              height: fit-content;
              padding: 0;
              margin-left: auto;
              margin-right: 0;
              box-shadow: none;
              background-color: transparent;
            }
          }
          .col-left {
            padding: 0;
          }
          .col-right {
            width: fit-content;
            max-width: fit-content;
            margin-left: auto;
            margin-right: 0;
          }
        }
        .cars-img {
          width: 100%;
          height: 150px;
          padding: 20%;
          background-color: #b1b1b1;
          border-radius: 4px;
          text-align: center;
          .cars {
            color: #2b2a2a;
          }
        }
      }
    }
  }
}
</style>
