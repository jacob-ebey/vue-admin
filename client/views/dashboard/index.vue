<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Grows</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="areGrowsLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!areGrowsLoading" label="Reload grows" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadGrows">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="grows">
              <router-link v-for="grow in grows" :key="grow.id" :to="'grows/view/' + grow.id" tag="tr"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{grow.title}}</td>
                <td>{{grow.userId}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!areGrowsLoading" label="Add new grow" placement="bottom-right">
            <router-link to="grows/add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!areGrowsLoading" label="See all grows" placement="bottom-right">
            <router-link to="grows" tag="button" class="button has-text-centered">
              <i class="fa fa-ellipsis-h center-icon"></i>
            </router-link>
          </tooltip>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Gateways</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="areGatewaysLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!areGatewaysLoading" label="Reload gateways" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadGateways">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="gateways">
              <router-link v-for="gateway in gateways" :key="gateway.id" :to="'gateways/view/' + gateway.id" tag="tr"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{gateway.title}}</td>
                <td>{{gateway.userId}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!areGatewaysLoading" label="Add new gateway" placement="bottom-right">
            <router-link to="gateways/add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!areGatewaysLoading" label="See all gateways" placement="bottom-right">
            <router-link to="gateways" tag="button" class="button has-text-centered">
              <i class="fa fa-ellipsis-h center-icon"></i>
            </router-link>
          </tooltip>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Chart,
    Tooltip
  },

  data () {
    return {
      areGrowsLoading: true,
      growsLoadError: undefined,
      grows: undefined,

      areGatewaysLoading: true,
      gatewaysLoadError: undefined,
      gateways: undefined
    }
  },

  mounted () {
    this.loadGrows()
    this.loadGateways()
  },

  methods: {
    loadGrows () {
      this.areGrowsLoading = true
      this.grows = undefined
      this.$http({
        url: 'https://jsonplaceholder.typicode.com/posts',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        this.grows = response.data.slice(0, 5)
        this.growsLoadError = undefined
      }).catch((error) => {
        this.grows = undefined
        this.growsLoadError = error
        console.log(error)
      }).then(() => {
        this.areGrowsLoading = false
      })
    },
    loadGateways () {
      this.areGatewaysLoading = true
      this.gateways = undefined
      this.$http({
        url: 'https://jsonplaceholder.typicode.com/posts',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }]
      }).then((response) => {
        this.gateways = response.data.slice(5, 10)
        this.gatewaysLoadError = undefined
      }).catch((error) => {
        this.gateways = undefined
        this.gatewaysLoadError = error
        console.log(error)
      }).then(() => {
        this.areGatewaysLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
