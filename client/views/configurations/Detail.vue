<template>
  <div v-if="configuration.data">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Summary</h4>
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{configuration.data.name}}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{{configuration.data.createdAt|formatDateAndTime}}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td>{{configuration.data._id}}</td>
              </tr>
              <tr v-if="configuration.data.registrationCode">
                <th>IoT ID</th>
                <td>{{configuration.data.iotId}}</td>
              </tr>
              <tr v-if="configuration.data.registrationCode">
                <th>Registration Code</th>
                <td>{{configuration.data.registrationCode}}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{{configuration.data.ownedBy.username}}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Devices</h4>
          <div class="table-buttons">
            <button class="button is-success is-small has-text-centered" @click="openAddDevice">
              <span class="icon is-small">
                <i class="fa fa-plus center-icon"></i>
              </span>
              <span>
                Add Device
              </span>
            </button>
          </div>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Mode</th>
                <th>Address</th>
                <th>Default Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="configuration.data">
              <tr v-for="(device, index) in configuration.data.devices" :key="device._id"> 
                <td>{{device.type}}</td>
                <td>{{device.mode}}</td>
                <td>{{device.address}}</td>
                <td>{{device.defaultValue}}</td>
                <td>
                  <button class="button is-danger is-small has-text-centered" @click="openDeleteDevice(device, index)">
                    <i class="fa fa-trash-o center-icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <card-modal
      :visible="showDeleteDevice && !!deviceToDelete && deviceIndexToDelete !== null"
      @ok="deleteDevice(deviceToDelete, deivceIndexToDelete)"
      @close="closeDeleteDevice"
      @cancel="closeDeleteDevice"
      okText="Yes"
      cancelText="No"
      title="Remove Device"
    >
      <p>Do you really wish to remove this device from the configuration?</p>
    </card-modal>

    <card-modal
      :visible="showAddDevice"
      @ok="doAddDevice"
      @close="closeAddDevice"
      @cancel="closeAddDevice"
      okText="Add"
      title="Add Device"
    >
      <div v-show="addDevice.error" style="color:red; word-wrap:break-word;">{{ addDevice.error }}</div>
      
      <div class="field">
        <label class="label">Type</label>
        <div class="control">
          <div class="select">
            <select v-model="device.type">
              <option value="GPIO">GPIO</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Mode</label>
        <div class="control">
          <div class="select">
            <select v-model="device.mode">
              <option value="discreteOut">Discrete Out</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input v-model="device.address" class="input" type="text" placeholder="name">
        </div>
      </div>

      <div class="field">
        <label class="label">Default Value</label>
        <div class="control">
          <input v-model="device.defaultValue" class="input" type="number" placeholder="name">
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
      configuration: 'configuration',
      addDevice: 'addDevice'
    }),

    data () {
      return {
        showAddDevice: false,
        device: {},

        showDeleteDevice: false,
        deviceToDelete: null,
        deivceIndexToDelete: null
      }
    },

    mounted () {
      this.loadConfiguration()
    },
  
    methods: {
      ...mapActions([
        'doLoad',
        'doPut',
        'doDelete',
        'doPush',
        'doSplice'
      ]),

      loadConfiguration () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'configuration',
          forceLoad: true,
          params: [this.$route.params.id]
        })
      },

      openAddDevice () {
        this.showAddDevice = true
      },

      closeAddDevice () {
        this.showAddDevice = false
        this.device = {}
      },

      openDeleteDevice (device, index) {
        this.showDeleteDevice = true
        this.deviceToDelete = device
        this.deviceIndexToDelete = index
      },

      closeDeleteDevice () {
        this.showDeleteDevice = false
        this.deviceToDelete = null
        this.deviceIndexToDelete = null
      },

      doAddDevice () {
        this.doPut({
          http: this.$http,
          whatToPut: 'addDevice',
          params: [this.$route.params.id],
          body: this.device,
          callback: (item) => {
            this.doPush({ whereToPush: 'configuration', subPath: 'devices', item })
            this.closeAddDevice()
          }
        })
      },

      deleteDevice (device, index) {
        if (device) {
          this.doDelete({
            http: this.$http,
            whatToPost: 'removeDevice',
            params: [this.$route.params.id, device._id],
            callback: () => {
              this.doSplice({ whereToSplice: 'configuration', subPath: 'devices', start: index, deleteCount: 1 })
              this.closeDeleteDevice()
            }
          })
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
