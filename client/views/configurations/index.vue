<template>
  <div>
    <div class="table-buttons">
      <button @click="addConfigurationOpen = true" class="button is-success has-text-centered">
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
            <button class="button has-text-centered" @click="configurationToCopy = configuration; addConfigurationOpen = true">
              <i class="fa fa-copy center-icon"></i>
            </button>
            <button class="button is-danger has-text-centered" @click="openDeleteConfiguration(configuration, index)">
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <configuration-form
      :visible="addConfigurationOpen"
      :initialValues="configurationToCopy"
      @submit="handleAddConfiguration"
      @cancel="addConfigurationOpen = false"
    />

    <card-modal
      :visible="showDeleteConfiguration && !!configurationToDelete && indexToDelete !== null"
      @ok="removeConfiguration(configurationToDelete, indexToDelete)"
      @close="showDeleteConfiguration = false"
      @cancel="showDeleteConfiguration = false"
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

import ConfigurationForm from './forms/ConfigurationForm'

export default {
  components: {
    CardModal,
    ConfigurationForm,
    Tooltip
  },

  computed: mapGetters({
    configurations: 'configurations',
    createConfiguration: 'createConfiguration',
    deleteConfiguration: 'deleteConfiguration'
  }),

  data () {
    return {
      showDeleteConfiguration: false,
      configurationToDelete: null,
      indexToDelete: null,

      addConfigurationOpen: false,
      configurationToCopy: null
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

    handleAddConfiguration (configuration, clear) {
      console.log(configuration)
      this.doPost({
        http: this.$http,
        whatToPost: 'createConfiguration',
        body: configuration,
        callback: (item) => {
          this.addConfigurationOpen = false
          this.doPush({ whereToPush: 'configurations', item })
          clear()
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
            this.showDeleteConfiguration = false
          }
        })
      }
    },

    openDeleteConfiguration (configuration, index) {
      this.showDeleteConfiguration = true
      this.configurationToDelete = configuration
      this.indexToDelete = index
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
