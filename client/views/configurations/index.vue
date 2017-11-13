<template>
  <div>
    <div class="table-buttons">
      <button @click="openAddConfiguration" class="button is-success has-text-centered">
        <span class="icon is-small">
          <i class="fa fa-plus center-icon"></i>
        </span>
        <span>
          Add Configuration
        </span>
      </button>
    </div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>
            <button v-if="configurations.isLoading" class="button is-white is-loading"></button>
            <tooltip v-if="!configurations.isLoading" label="Reload configurations" placement="top-right">
              <button class="button is-small has-text-centered" v-on:click="loadConfigurations">
                <i class="fa fa-refresh center-icon"></i>
              </button>
            </tooltip>
          </th>
          <th>Name</th>
          <th>ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="configurations.data">
        <tr v-for="(configuration, index) in configurations.data" :key="configuration._id"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td><router-link :to="'configurations/view/' + configuration._id">{{configuration.name}}</router-link></td>
          <td>{{configuration._id}}</td>
          <td>
            <button class="button is-danger has-text-centered" @click="openDeleteConfiguration(configuration, index)">
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <card-modal
      :visible="showAddConfiguration"
      @ok="addConfiguration"
      @close="closeAddConfiguration"
      @cancel="closeAddConfiguration"
      title="New Configuration"
    >
      <div v-show="createConfiguration.error" style="color:red; word-wrap:break-word;">{{ createConfiguration.error }}</div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="name">
        </div>
      </div>
    </card-modal>
    <card-modal
      :visible="showDeleteConfiguration && !!configurationToDelete && indexToDelete !== null"
      @ok="removeConfiguration(configurationToDelete, indexToDelete)"
      @close="closeDeleteConfiguration"
      @cancel="closeDeleteConfiguration"
      title="Delete Configuration"
      okText="Yes"
      cancelText="No"
    >
      <p>Do you really wish to delete {{configurationToDelete && configurationToDelete.name}}?</p>
      <div v-show="deleteConfiguration.error" style="color:red; word-wrap:break-word;">{{ deleteConfiguration.error }}</div>
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
    configurations: 'configurations',
    createConfiguration: 'createConfiguration',
    deleteConfiguration: 'deleteConfiguration'
  }),

  data () {
    return {
      showAddConfiguration: false,
      name: '',

      showDeleteConfiguration: false,
      configurationToDelete: null,
      indexToDelete: null
    }
  },

  mounted () {
    switch (this.$route.query.action) {
      case 'add':
        this.showAddConfiguration = true
        break
    }

    this.loadConfigurations(false)
  },

  methods: {
    ...mapActions([
      'doLoad',
      'doPost',
      'doDelete',
      'doPush',
      'doSplice'
    ]),
    loadConfigurations (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'configurations', forceLoad })
    },
    openAddConfiguration () {
      this.showAddConfiguration = true
    },
    closeAddConfiguration () {
      this.showAddConfiguration = false
      this.name = ''
    },
    openDeleteConfiguration (configuration, index) {
      this.showDeleteConfiguration = true
      this.configurationToDelete = configuration
      this.indexToDelete = index
    },
    closeDeleteConfiguration () {
      this.showDeleteConfiguration = false
      this.configurationToDelete = null
      this.indexToDelete = null
    },
    addConfiguration () {
      const configuration = {
        name: this.name
      }

      this.doPost({
        http: this.$http,
        whatToPost: 'createConfiguration',
        body: configuration,
        callback: (item) => {
          this.doPush({ whereToPush: 'configurations', item })
          this.closeAddConfiguration()
        }
      })
    },
    removeConfiguration (configuration, index) {
      if (configuration) {
        this.doDelete({
          http: this.$http,
          whatToPost: 'deleteConfiguration',
          params: [configuration._id],
          callback: () => {
            this.doSplice({ whereToSplice: 'configurations', start: index, deleteCount: 1 })
            this.closeDeleteConfiguration()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
