<template>
  <div v-if="project.data">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Summary</h4>
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{project.data.name}}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{{project.data.createdAt|formatDateAndTime}}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td>{{project.data._id}}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{{project.data.ownedBy.username}}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
  
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Events</h4>
          <chartist class="lines-bars" :type="'Line'" :data="eventData" :options="eventOptions"></chartist>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Gateways</h4>
          <div class="table-buttons">
            <button class="button is-success is-small has-text-centered" @click="openAddGateway">
              <span class="icon is-small">
                <i class="fa fa-plus center-icon"></i>
              </span>
              <span>
                Add Gateway
              </span>
            </button>
          </div>
          <table class="table is-fullwidth is-stripped is-narrow">
            <thead>
              <tr>
                <th>Name</th>
                <th>Iot ID</th>
                <th>Registration Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="project.data.gateways">
              <tr v-for="(gateway, index) in project.data.gateways" :key="gateway._id">
                <td>{{gateway.name}}</td>
                <td>{{gateway.iotId}}</td>
                <td>{{gateway.registrationCode}}</td>
                <td>
                  <button class="button is-small has-text-centered" @click="openEditGateway(gateway, index)">
                    <i class="fa fa-pencil center-icon"></i>
                  </button>
                  <button class="button is-danger is-small has-text-centered" @click="openDeleteGateway(gateway, index)">
                    <i class="fa fa-trash-o center-icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Logs</h4>
          <table class="table is-fullwidth is-stripped is-narrow">
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>103221</td>
                <td>11/10/2017 10:06 pm</td>
                <td>{{JSON.stringify({ sensorId: 'rofl', data: 10.05 })}}</td>
              </tr>
            </tbody>
          </table>
          <tooltip label="See all logs" placement="right">
            <button class="button has-text-centered">
              <i class="fa fa-chevron-down center-icon"></i>
            </button>
          </tooltip>
        </article>
      </div>
    </div>
  
    <card-modal
      :visible="showAddGateway"
      @ok="addGatewayToProject"
      @close="closeAddGateway"
      @cancel="closeAddGateway"
      title="Add Gateway"
    >
      <div class="field">
        <label class="label">Gateway</label>
        <div class="control">
          <div class="select">
            <select v-model="selectedGateway" v-if="gateways.data">
              <option v-for="gateway in gateways.data" :key="gateway._id" :value="gateway._id">{{gateway.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </card-modal>

    <card-modal
      :visible="showDeleteGateway && !!gatewayToDelete && indexToDelete !== null"
      @ok="deleteGateway(gatewayToDelete, indexToDelete)"
      @close="closeDeleteGateway"
      @cancel="closeDeleteGateway"
      okText="Yes"
      cancelText="No"
      title="Remove Gateway"
    >
      <p>Do you really wish to remove {{gatewayToDelete && gatewayToDelete.name}} from the project?</p>
    </card-modal>

    <card-modal
      :title="'Edit ' + (gatewayToEdit && gatewayToEdit.name)"
      :visible="showEditGateway && !!gatewayToEdit && indexToEdit !== null"
      okText="Save"
      @ok="editGateway(gatewayToEdit, indexToEdit)"
      @close="closeEditGateway"
      @cancel="closeEditGateway"
    >
      <div class="field" v-if="configurations.data">
        <label class="label">Configuration</label>
        <div class="control">
          <div class="select">
            <select v-model="selectedConfiguration">
              <option v-for="configuration in configurations.data" :key="configuration._id" :value="configuration._id">{{configuration.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </card-modal>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import Chartist from 'vue-bulma-chartist'
  import { CardModal } from 'vue-bulma-modal'
  import Tooltip from 'vue-bulma-tooltip'
  
  export default {
    components: {
      CardModal,
      Chartist,
      Tooltip
    },
  
    computed: mapGetters({
      project: 'project',
      gateways: 'gateways',
      configurations: 'configurations'
    }),
  
    data () {
      return {
        showAddGateway: false,
        selectedGateway: '',

        showDeleteGateway: false,
        gatewayToDelete: null,
        indexToDelete: null,

        showEditGateway: false,
        gatewayToEdit: null,
        indexToEdit: null,
        selectedConfiguration: '',

        eventData: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          series: [
            [5, 9, 7, 8, 5, 3, 5]
          ]
        },
        eventOptions: {
          low: 0,
          showArea: true
        }
      }
    },
  
    mounted () {
      this.loadProject()
    },
  
    methods: {
      ...mapActions([
        'doLoad',
        'doPost',
        'doDelete',
        'doPush',
        'doSplice'
      ]),

      loadProject () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'project',
          forceLoad: true,
          params: [this.$route.params.id]
        })
      },

      loadGateways (forceLoad = true) {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'gateways',
          forceLoad,
          params: [this.$route.params.id]
        })
      },

      loadConfigurations (forceLoad = true) {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'configurations',
          forceLoad
        })
      },

      openAddGateway () {
        this.showAddGateway = true
        this.loadGateways(false)
      },

      closeAddGateway () {
        this.showAddGateway = false
        this.selectedGateway = ''
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

      openEditGateway (gateway, index) {
        this.loadConfigurations(false)
        this.showEditGateway = true
        this.gatewayToEdit = gateway
        this.indexToEdit = index
      },

      closeEditGateway () {
        this.showEditGateway = false
        this.gatewayToEdit = null
        this.indexToEdit = null
        this.selectedConfiguration = null
      },

      addGatewayToProject () {
        this.doPost({
          http: this.$http,
          whatToPost: 'addGatewayToProject',
          params: [
            this.$route.params.id,
            this.selectedGateway
          ],
          callback: (item) => {
            this.doPush({ whereToPush: 'project', subPath: 'gateways', item })
            this.closeAddGateway()
          }
        })
      },

      deleteGateway (gateway, index) {
        if (gateway) {
          this.doDelete({
            http: this.$http,
            whatToPost: 'removeGatewayFromProject',
            params: [this.$route.params.id, gateway._id],
            callback: () => {
              this.doSplice({ whereToSplice: 'project', subPath: 'gateways', start: index, deleteCount: 1 })
              this.closeDeleteGateway()
            }
          })
        }
      },

      editGateway (gateway, index) {
        if (gateway) {
          this.closeEditGateway()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  .panel-label {
    color: $text-light;
    margin-right: 7px;
  }
</style>
