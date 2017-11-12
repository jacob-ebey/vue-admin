<template>
  <div v-if="gateway.data">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Summary</h4>
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{gateway.data.name}}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{{gateway.data.createdAt|formatDateAndTime}}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td>{{gateway.data._id}}</td>
              </tr>
              <tr v-if="gateway.data.registrationCode">
                <th>Registration Code</th>
                <td>{{gateway.data.registrationCode}}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{{gateway.data.ownedBy.username}}</td>
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
      gateway: 'gateway'
    }),
  
    data () {
      return {
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
      this.loadGateway()
    },
  
    methods: {
      ...mapActions([
        'doLoad'
      ]),
      loadGateway () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'gateway',
          forceLoad: true,
          params: [this.$route.params.id]
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
