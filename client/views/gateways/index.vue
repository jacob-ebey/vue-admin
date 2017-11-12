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
            <button v-if="gateways.isLoading" class="button is-white is-loading"></button>
            <tooltip v-if="!gateways.isLoading" label="Reload gateways" placement="top-right">
              <button class="button is-small has-text-centered" v-on:click="loadGateways">
                <i class="fa fa-refresh center-icon"></i>
              </button>
            </tooltip>
          </th>
          <th>Name</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody v-if="gateways.data">
        <router-link tag="tr" v-for="gateway in gateways.data" :key="gateway._id" :to="'gateways/view/' + gateway._id"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td>{{gateway.name}}</td>
          <td>{{gateway._id}}</td>
        </router-link>
      </tbody>
    </table>
    <card-modal :visible="showAddGateway" @close="closeAddGateway" @ok="addGateway" @cancel="closeAddGateway" title="New Gateway">
      <div v-show="createGateway.error" style="color:red; word-wrap:break-word;">{{ createGateway.error }}</div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="name">
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
    gateways: 'gateways',
    createGateway: 'createGateway'
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
      'doLoad',
      'doPost',
      'doPush'
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
    },
    addGateway () {
      const gateway = {
        name: this.name
      }

      this.doPost({
        http: this.$http,
        whatToPost: 'createGateway',
        body: gateway,
        callback: (item) => {
          this.doPush({ whereToPush: 'gateways', item })
          this.closeAddGateway()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
