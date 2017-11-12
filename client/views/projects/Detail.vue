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
              </tr>
            </thead>
            <tbody v-if="project.data.gateways">
              <tr v-for="gateway in project.data.gateways" :key="gateway._id">
                <td>{{gateway.name}}</td>
                <td>{{gateway.iotId}}</td>
                <td>{{gateway.registrationCode}}</td>
              </tr>
            </tbody>
          </table>
          <tooltip label="See all gateways" placement="right">
            <button to="gateways" tag="button" class="button has-text-centered">
                <i class="fa fa-chevron-down center-icon"></i>
              </button>
          </tooltip>
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
  
    <card-modal :visible="showAddGateway" @close="closeAddGateway" @ok="addGatewayToProject" @cancel="closeAddGateway" title="Add Gateway">
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
      gateways: 'gateways'
    }),
  
    data () {
      return {
        showAddGateway: false,
        selectedGateway: '',

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
        'doPush'
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
      openAddGateway () {
        this.showAddGateway = true
        this.loadGateways(false)
      },
      closeAddGateway () {
        this.showAddGateway = false
        this.selectedGateway = ''
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
            console.log(item)
            this.doPush({ whereToPush: 'project', subPath: 'gateways', item })
            this.closeAddGateway()
          }
        })
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
