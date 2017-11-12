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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="gateways.data">
        <tr v-for="(gateway, index) in gateways.data" :key="gateway._id"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td><router-link :to="'gateways/view/' + gateway._id">{{gateway.name}}</router-link></td>
          <td>{{gateway._id}}</td>
          <td>
            <button class="button is-danger has-text-centered" @click="openDeleteGateway(gateway, index)">
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </td>
        </tr>
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
    <card-modal :visible="showDeleteGateway && !!gatewayToDelete && indexToDelete !== null" @close="closeDeleteGateway" @ok="deleteGateway(gatewayToDelete, indexToDelete)" @cancel="closeDeleteGateway" okText="Yes" cancelText="No" title="Delete Project">
      <p>Do you really wish to delete {{gatewayToDelete && gatewayToDelete.name}}?</p>
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
      name: '',

      showDeleteGateway: false,
      gatewayToDelete: null,
      indexToDelete: null
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
      'doDelete',
      'doPush',
      'doSplice'
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
    openDeleteGateway (gateway, index) {
      this.showDeleteGateway = true
      this.gatewayToDelete = gateway
      this.indexToDelete = index
    },
    closeDeleteGateway () {
      this.showDeleteGateway = false
      this.gatewayToDelete = null
      this.indexToDelete = null
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
    },
    deleteGateway (gateway, index) {
      if (gateway) {
        this.doDelete({
          http: this.$http,
          whatToPost: 'deleteGateway',
          params: [gateway._id],
          callback: () => {
            this.doSplice({ whereToSplice: 'gateways', start: index, deleteCount: 1 })
            this.closeDeleteGateway()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
