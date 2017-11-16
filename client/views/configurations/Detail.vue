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
            <button class="button is-success is-small has-text-centered" @click="addDeviceOpen = true">
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
                <th>Name</th>
                <th>Type</th>
                <th>Mode</th>
                <th>Address</th>
                <th>Default Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="configuration.data">
              <tr v-for="(device, index) in configuration.data.devices" :key="device._id"> 
                <td>{{device.name}}</td>
                <td>{{device.type}}</td>
                <td>{{device.mode}}</td>
                <td>{{device.address}}</td>
                <td>{{device.defaultValue}}</td>
                <td>
                  <button class="button is-small has-text-centered" @click="deviceToEdit = device; deviceIndexToEdit = index">
                    <i class="fa fa-pencil center-icon"></i>
                  </button>
                  <button class="button is-danger is-small has-text-centered" @click="deviceToDelete = device; deviceIndexToDelete = index">
                    <i class="fa fa-trash-o center-icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Controllers</h4>
          <div class="table-buttons">
            <button class="button is-success is-small has-text-centered" @click="addControllerOpen = true">
              <span class="icon is-small">
                <i class="fa fa-plus center-icon"></i>
              </span>
              <span>
                Add Controller
              </span>
            </button>
          </div>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Inputs</th>
                <th>Outputs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="configuration.data">
              <tr v-for="(controller, index) in configuration.data.controllers" :key="controller._id"> 
                <td>{{controller.name}}</td>
                <td>{{controller.type}}</td>
                <td>{{controller.inputs.length}}</td>
                <td>{{controller.outputs.length}}</td>
                <td>
                  <button class="button is-small has-text-centered" @click="controllerToEdit = controller; controllerIndexToEdit = index">
                    <i class="fa fa-pencil center-icon"></i>
                  </button>
                  <button class="button is-danger is-small has-text-centered" @click="controllerToDelete = controller; controllerIndexToDelete = index">
                    <i class="fa fa-trash-o center-icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <device-form
      :visible="addDeviceOpen"
      @submit="handleAddDevice"
      @cancel="addDeviceOpen = false"
    />

    <device-form
      title="Edit Device"
      :visible="!!deviceToEdit"
      :initialValues="deviceToEdit"
      @submit="handleEditDevice"
      @cancel="deviceToEdit = null"
    />

    <card-modal
      :visible="!!deviceToDelete"
      @ok="handleDeleteDevice(deviceToDelete, deviceIndexToDelete)"
      @close="deviceToDelete = null"
      @cancel="deviceToDelete = null"
      okText="Yes"
      cancelText="No"
      title="Remove Device"
    >
      <div v-show="removeDevice.error" style="color:red; word-wrap:break-word;">{{ removeDevice.error }}</div>
      <p>Do you really wish to remove this device from the configuration?</p>
    </card-modal>

    <controller-form
      :visible="addControllerOpen"
      :error="addController.error"
      :devices="configuration.data.devices"
      @submit="handleAddController"
      @cancel="addControllerOpen = false"
    />

    <controller-form
      title="Edit Controller"
      :visible="!!controllerToEdit"
      :initialValues="controllerToEdit"
      :devices="configuration.data.devices"
      @submit="handleEditController"
      @cancel="controllerToEdit = null"
    />

    <card-modal
      :visible="!!controllerToDelete"
      @ok="handleDeleteController(controllerToDelete, controllerIndexToDelete)"
      @close="controllerToDelete = null"
      @cancel="controllerToDelete = null"
      okText="Yes"
      cancelText="No"
      title="Remove Controller"
    >
      <div v-show="removeController.error" style="color:red; word-wrap:break-word;">{{ removeController.error }}</div>
      <p>Do you really wish to remove this controller from the configuration?</p>
    </card-modal>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import { CardModal } from 'vue-bulma-modal'

  import ControllerForm from './forms/ControllerForm'
  import DeviceForm from './forms/DeviceForm'

  export default {
    components: {
      CardModal,
      ControllerForm,
      DeviceForm
    },

    data () {
      return {
        addDeviceOpen: false,
        deviceToEdit: null,
        deviceIndexToEdit: null,
        deviceToDelete: null,
        deviceIndexToDelete: null,

        addControllerOpen: false,
        controllerToEdit: null,
        controllerIndexToEdit: null,
        controllerToDelete: null,
        controllerIndexToDelete: null
      }
    },

    computed: mapGetters({
      addController: 'addController',
      configuration: 'configuration',
      removeController: 'removeController',
      removeDevice: 'removeDevice'
    }),

    mounted () {
      this.loadConfiguration()
    },

    methods: {
      ...mapActions([
        'doLoad',
        'doPut',
        'doDelete',
        'doPush',
        'doSplice',
        'setProperty'
      ]),

      loadConfiguration () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'configuration',
          forceLoad: true,
          params: [this.$route.params.id]
        })
      },

      handleAddDevice (device, clear) {
        this.doPut({
          http: this.$http,
          whatToPut: 'addDevice',
          params: [this.$route.params.id],
          body: device,
          callback: (item) => {
            this.addDeviceOpen = false
            this.doPush({ whereToPush: 'configuration', subPath: 'devices', item })
            clear()
          }
        })
      },

      handleEditDevice (device, clear) {
        this.doPut({
          http: this.$http,
          whatToPut: 'editDevice',
          params: [this.$route.params.id, device._id],
          body: device,
          callback: (editedDevice) => {
            this.setProperty({
              whereToSet: 'configuration',
              callback: (configuration) => {
                console.log(editedDevice.defaultValue)
                configuration.data.devices[this.deviceIndexToEdit].name = editedDevice.name
                configuration.data.devices[this.deviceIndexToEdit].type = editedDevice.type
                configuration.data.devices[this.deviceIndexToEdit].mode = editedDevice.mode
                configuration.data.devices[this.deviceIndexToEdit].address = editedDevice.address
                configuration.data.devices[this.deviceIndexToEdit].defaultValue = editedDevice.defaultValue
              }
            })
            this.deviceToEdit = null
            clear()
          }
        })
      },

      handleDeleteDevice (device, index) {
        if (device) {
          this.doDelete({
            http: this.$http,
            whatToPost: 'removeDevice',
            params: [this.$route.params.id, device._id],
            callback: (r) => {
              console.log(r)
              this.doSplice({ whereToSplice: 'configuration', subPath: 'devices', start: index, deleteCount: 1 })
              this.deviceToDelete = null
            }
          })
        }
      },

      handleAddController (controller, clear) {
        this.doPut({
          http: this.$http,
          whatToPut: 'addController',
          params: [this.$route.params.id],
          body: controller,
          callback: (item) => {
            this.addControllerOpen = false
            this.doPush({ whereToPush: 'configuration', subPath: 'controllers', item })
            clear()
          }
        })
      },

      handleEditController (controller, clear) {
        this.doPut({
          http: this.$http,
          whatToPut: 'editController',
          params: [this.$route.params.id, controller._id],
          body: controller,
          callback: (item) => {
            this.setProperty({
              whereToSet: 'configuration',
              callback: (configuration) => {
                configuration.data.controllers[this.controllerIndexToEdit].name = item.name
                configuration.data.controllers[this.controllerIndexToEdit].type = item.type
                configuration.data.controllers[this.controllerIndexToEdit].inputs = item.inputs
                configuration.data.controllers[this.controllerIndexToEdit].outputs = item.outputs
                configuration.data.controllers[this.controllerIndexToEdit].schedule = item.schedule
              }
            })
            this.controllerToEdit = null
            clear()
          }
        })
      },

      handleDeleteController (controller, index) {
        if (controller) {
          this.doDelete({
            http: this.$http,
            whatToPost: 'removeController',
            params: [this.$route.params.id, controller._id],
            callback: () => {
              this.doSplice({ whereToSplice: 'configuration', subPath: 'controllers', start: index, deleteCount: 1 })
              this.controllerToDelete = null
            }
          })
        }
      }
    }
  }
</script>
