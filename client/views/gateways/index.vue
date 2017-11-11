<template>
  <div>
    <div class="table-buttons">
      <button @click="openAddGateway" class="button is-success has-text-centered">
        <span class="icon is-small">
          <i class="fa fa-plus center-icon"></i>
        </span>
        <span>
          Add Gateway
        </span>
      </button>
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
    <card-modal :visible="showAddGateway" @close="closeAddGateway" @ok="closeAddGateway" @cancel="closeAddGateway" title="New Gateway">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Gateway 01">
        </div>
      </div>
    </card-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CardModal } from 'vue-bulma-modal'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    CardModal,
    Tooltip
  },

  computed: mapGetters({
    loading: 'loading'
  }),

  data () {
    return {
      showAddGateway: false,
      name: ''
    }
  },

  mounted () {
    switch (this.$route.query.action) {
      case 'add':
        this.showAddGateway = true
        break
    }

    this.loadGateways(false)
  },

  methods: {
    ...mapActions([
      'doLoad'
    ]),
    loadGateways (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'gateways', forceLoad })
    },
    openAddGateway () {
      this.showAddGateway = true
    },
    closeAddGateway () {
      this.showAddGateway = false
      this.name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
