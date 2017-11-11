<template>
  <div v-if="loading.project.data">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Summary</h4>
          <table class="table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{{loading.project.data.id}}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{{loading.project.data.title}}</td>
              </tr>
              <tr>
                <th>Body</th>
                <td>{{loading.project.data.body}}</td>
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
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gateway 01</td>
                <td>65c4a11c-2bd1-4bbc-b56b-0ca6a837f37f</td>
                <td>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</td>
              </tr>
              <tr>
                <td>Gateway 02</td>
                <td>10b852b1-28e6-44dd-96f5-e5282c9239b9</td>
                <td>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</td>
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
  
    <card-modal :visible="showAddGateway" @close="closeAddGateway" @ok="closeAddGateway" @cancel="closeAddGateway" title="Add Gateway">
      <div class="field">
        <label class="label">Gateway</label>
        <div class="control">
          <div class="select">
            <select v-model="gateway">
              <option value="5">Gateway 05</option>
              <option value="6">Gateway 06</option>
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
      loading: 'loading'
    }),
  
    data () {
      return {
        showAddGateway: false,
        gateway: '',

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
      this.loadProjects()
    },
  
    methods: {
      ...mapActions([
        'doLoad'
      ]),
      loadProjects () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'project',
          forceLoad: true,
          params: [this.$route.params.id]
        })
      },
      openAddGateway () {
        this.showAddGateway = true
      },
      closeAddGateway () {
        this.showAddGateway = false
        this.gateway = ''
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
