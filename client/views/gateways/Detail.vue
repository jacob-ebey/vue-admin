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
              <tr v-if="!gateway.data.registrationCode">
                <th>Registered</th>
                <td>
                  <button class="button is-danger is-small has-text-centered" @click="unregisterOpen = true">
                    Unregister
                  </button>
                <td/>
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
    <div v-if="gatewayLogs.data" class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Logs</h4>
          <table class="table is-fullwidth is-stripped is-narrow">
            <thead>
              <tr>
                <th>Time</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, index) in [...gatewayLogs.data].splice(0, logCount)" :key="index">
                <template v-if="event.message && event.message.payload">
                  <td>{{event.message.payload.time}}</td>
                  <td>{{JSON.stringify(event.message.payload.data)}}</td>
                </template>
              </tr>
            </tbody>
          </table>
          <tooltip label="Show more" placement="right">
            <button class="button is-small has-text-centered" @click="logCount += 10">
              <i class="fa fa-chevron-down center-icon"></i>
            </button>
          </tooltip>
          <span>
            Showing {{gatewayLogs.data.length < logCount ? gatewayLogs.data.length : logCount}} of {{gatewayLogs.data.length}} (currenly only supports the last 100)
          </span>
        </article>
      </div>
    </div>

    <card-modal
      :visible="unregisterOpen"
      @ok="handleUnregister"
      @close="unregisterOpen = false"
      @cancel="unregisterOpen = false"
      okText="Yes"
      cancelText="No"
      title="Unregister Gateway"
    >
      <div v-show="unregisterGateway.error" style="color:red; word-wrap:break-word;">{{ unregisterGateway.error }}</div>
      <p>Do you really wish to unregister the physical device?</p>
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
      gateway: 'gateway',
      gatewayLogs: 'gatewayLogs',
      unregisterGateway: 'unregisterGateway'
    }),
  
    data () {
      return {
        unregisterOpen: false,
        logCount: 10,

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
      this.loadGatewayLogs()
    },

    destroyed () {
      this.websocketSend({ event: 'stopMonitorGateway', token: this.$auth.token() })
    },
  
    methods: {
      ...mapActions([
        'doLoad',
        'doDelete',
        'setProperty',
        'doPush',
        'websocketSend',
        'websocketEventHandler'
      ]),

      loadGateway () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'gateway',
          forceLoad: true,
          params: [this.$route.params.id]
        })
      },

      loadGatewayLogs () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'gatewayLogs',
          forceLoad: true,
          params: [this.$route.params.id],
          callback: () => {
            this.websocketEventHandler({ event: 'gatewayLog', callback: this.handleGatewayMessage })
            this.websocketSend({ event: 'monitorGateway', token: this.$auth.token(), id: this.$route.params.id })
          }
        })
      },

      handleUnregister () {
        this.doDelete({
          http: this.$http,
          whatToPost: 'unregisterGateway',
          params: [this.$route.params.id],
          callback: (registrationCode) => {
            this.setProperty({
              whereToSet: 'gateway',
              callback: (gateway) => {
                this.unregisterOpen = false
                gateway.data.registrationCode = registrationCode
              }
            })
          }
        })
      },

      handleGatewayMessage (payload) {
        this.doPush({
          whereToPush: 'gatewayLogs',
          beginning: true,
          item: {
            message: {
              payload
            }
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
