<template>
  <div>
    <div class="table-buttons">
      <router-link to="gateways/add" tag="button" class="button is-success has-text-centered">
        <span class="icon is-small">
          <i class="fa fa-plus center-icon"></i>
        </span>
        <span>
          Add Gateway
        </span>
      </router-link>
    </div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>
            <button v-if="loading.gateways.isLoading" class="button is-white is-loading"></button>
            <tooltip v-if="!loading.gateways.isLoading" label="Reload gateways" placement="top-right">
              <button class="button is-small has-text-centered" v-on:click="loadGateways">
                <i class="fa fa-refresh center-icon"></i>
              </button>
            </tooltip>
          </th>
          <th>Name</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody v-if="loading.gateways.data">
        <router-link v-for="gateway in loading.gateways.data" :key="gateway.id" :to="'gateways/view/' + gateway.id" tag="tr"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td>{{gateway.title}}</td>
          <td>{{gateway.id}}</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Tooltip
  },

  computed: mapGetters({
    loading: 'loading'
  }),

  mounted () {
    this.loadGateways(false)
  },

  methods: {
    ...mapActions([
      'doLoad'
    ]),
    loadGateways (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'gateways', forceLoad })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
