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
          <span>{{removeDevice.data}}</span>
          <span>{{removeDevice.error}}</span>
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
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Controllers</h4>
          <div class="table-buttons">
            <button class="button is-success is-small has-text-centered" @click="openAddController">
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
                  <button class="button is-danger is-small has-text-centered" @click="openDeleteController(controller, index)">
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
      <div v-show="removeDevice.error" style="color:red; word-wrap:break-word;">{{ removeDevice.error }}</div>
      <p>Do you really wish to remove this device from the configuration?</p>
    </card-modal>

    <card-modal
      :visible="showDeleteController && !!controllerToDelete && controllerIndexToDelete !== null"
      @ok="deleteController(controllerToDelete, controllerIndexToDelete)"
      @close="closeDeleteController"
      @cancel="closeDeleteController"
      okText="Yes"
      cancelText="No"
      title="Remove Controller"
    >
      <div v-show="removeController.error" style="color:red; word-wrap:break-word;">{{ removeController.error }}</div>
      <p>Do you really wish to remove this controller from the configuration?</p>
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
        <label class="label">Name</label>
        <div class="control">
          <input v-model="device.name" class="input" type="text" placeholder="name">
        </div>
      </div>

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
          <input v-model="device.address" class="input" type="text" placeholder="address">
        </div>
      </div>

      <div class="field">
        <label class="label">Default Value</label>
        <div class="control">
          <input v-model="device.defaultValue" class="input" type="number" placeholder="0">
        </div>
      </div>
    </card-modal>

    <card-modal
      :visible="showAddController"
      @ok="doAddController"
      @close="closeAddController"
      @cancel="closeAddController"
      okText="Add"
      title="Add Controller"
    >
      <div v-show="addController.error" style="color:red; word-wrap:break-word;">{{ addController.error }}</div>
      
      <div class="field">
        <label class="label">Name</label>
        <input v-model="controller.name" class="input" type="text" placeholder="name">
      </div>

      <div class="field">
        <label class="label">Type</label>
        <div class="control">
          <div class="select">
            <select v-model="controller.type">
              <option value="timer">Timer</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">
          <span>Inputs</span>
          <button class="button is-success is-small has-text-centered" @click="addInput">
            <i class="fa fa-plus center-icon"></i>
          </button>
        </label>
        <div class="control indent" v-for="(input, index) in controller.inputs" :key="input">
          <span>{{index + 1}}.)</span>
          <div class="select">
            <select v-model="controller.inputs[index]">
              <option v-for="device in configuration.data.devices" :key="device._id" :value="device._id">{{device.name}}</option>
            </select>
          </div>
          <button class="button is-danger is-small has-text-centered" @click="removeInput(index)">
            <i class="fa fa-trash-o center-icon"></i>
          </button>
        </div>
      </div>

      <div class="field">
        <label class="label">
          <span>Outputs</span>
          <button class="button is-success is-small has-text-centered" @click="addOutput">
            <i class="fa fa-plus center-icon"></i>
          </button>
        </label>
        <div class="control indent" v-for="(output, index) in controller.outputs" :key="output">
          <span>{{index + 1}}.)</span>
          <div class="select">
            <select v-model="controller.outputs[index]">
              <option v-for="device in configuration.data.devices" :key="device._id" :value="device._id">{{device.name}}</option>
            </select>
          </div>
          <button class="button is-danger is-small has-text-centered" @click="removeOutput(index)">
            <i class="fa fa-trash-o center-icon"></i>
          </button>
        </div>
      </div>

      <div class="field" v-if="controller.type === 'timer'">
        <label class="label">
          <span>Schedule</span>
          <button class="button is-success is-small has-text-centered" @click="addSchedule">
            <i class="fa fa-plus center-icon"></i>
          </button>
        </label>
        <div class="indent" v-for="(schedule, scheduleIndex) in controller.schedule" :key="scheduleIndex">
          <div class="field">
            <label class="label">Time</label>
            <div class="control">
              <input v-model="controller.schedule[scheduleIndex].dateTime" class="input" type="text" placeholder="time">
            </div>
          </div>
          <div class="field">
            <label class="label">
              <span>Actuators</span>
              <button class="button is-success is-small has-text-centered" @click="addActuator(scheduleIndex)">
                <i class="fa fa-plus center-icon"></i>
              </button>
            </label>
            <div
              class="control indent"
              v-for="(actuator, actuatorIndex) in controller.schedule[scheduleIndex].actuators"
              :key="actuatorIndex"
            >
              <div class="field">
                <label class="label">Output from above</label>
                <div class="select">
                  <select v-model="controller.schedule[scheduleIndex].actuators[actuatorIndex]">
                    <option v-for="(output, n) in controller.outputs" :key="n" :value="n">Output {{n + 1}}</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label">Value</label>
                <input v-model="controller.schedule[scheduleIndex].actuatorStates[actuatorIndex]" class="input" type="number" placeholder="0">
              </div>
              <button class="button is-danger is-small has-text-centered remove-schedule-button" @click="removeActuator(scheduleIndex, actuatorIndex)">
                <i class="fa fa-trash-o center-icon"></i>
              </button>
            </div>
          </div>
          <button class="button is-danger is-small has-text-centered remove-schedule-button" @click="removeSchedule(scheduleIndex)">
            <i class="fa fa-trash-o center-icon"></i>
          </button>
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

  const createDefaultController = () => ({
    inputs: [ null ],
    outputs: [ null ],
    schedule: []
  })

  const createDefaultSchedule = () => ({
    actuators: [],
    actuatorStates: []
  })
  
  export default {
    components: {
      CardModal,
      Chartist,
      Tooltip
    },
  
    computed: mapGetters({
      configuration: 'configuration',
      addDevice: 'addDevice',
      removeDevice: 'removeDevice',
      addController: 'addController',
      removeController: 'removeController'
    }),

    data () {
      return {
        showAddDevice: false,
        device: {},

        showDeleteDevice: false,
        deviceToDelete: null,
        deivceIndexToDelete: null,

        showAddController: false,
        controller: createDefaultController(),

        showDeleteController: false,
        controllerToDelete: null,
        controllerIndexToDelete: null
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

      openAddController () {
        this.showAddController = true
      },

      closeAddController () {
        this.showAddController = false
        this.controller = createDefaultController()
      },

      openDeleteController (controller, index) {
        this.showDeleteController = true
        this.controllerToDelete = controller
        this.controllerIndexToDelete = index
      },

      closeDeleteController () {
        this.showDeleteController = false
        this.controllerToDelete = null
        this.controllerIndexToDelete = null
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
      },

      doAddController () {
        const body = {
          ...this.controller,
          inputs: this.controller.inputs.filter(item => item),
          outputs: this.controller.outputs.filter(item => item)
        }

        console.log(JSON.stringify(body, null, 2))

        this.doPut({
          http: this.$http,
          whatToPut: 'addController',
          params: [this.$route.params.id],
          body,
          callback: (item) => {
            this.doPush({ whereToPush: 'configuration', subPath: 'controllers', item })
            this.closeAddController()
          }
        })
      },

      deleteController (controller, index) {
        if (controller) {
          this.doDelete({
            http: this.$http,
            whatToPost: 'removeController',
            params: [this.$route.params.id, controller._id],
            callback: () => {
              this.doSplice({ whereToSplice: 'configuration', subPath: 'controllers', start: index, deleteCount: 1 })
              this.closeDeleteController()
            }
          })
        }
      },

      addInput () {
        if (this.controller.inputs[this.controller.inputs.length - 1]) {
          this.controller.inputs.push(null)
        }
      },

      removeInput (index) {
        if (this.controller.inputs.length === 1) {
          this.controller.inputs = [null]
        } else {
          this.controller.inputs.splice(index, 1)
        }
      },

      addOutput () {
        if (this.controller.outputs[this.controller.outputs.length - 1]) {
          this.controller.outputs.push(null)
        }
      },

      removeOutput (index) {
        if (this.controller.outputs.length === 1) {
          this.controller.outputs = [null]
        } else {
          this.controller.outputs.splice(index, 1)
        }
      },

      addSchedule () {
        this.controller.schedule.push(createDefaultSchedule())
      },

      removeSchedule (index) {
        this.controller.schedule.splice(index, 1)
      },

      addActuator (index) {
        this.controller.schedule[index].actuators.push(null)
        this.controller.schedule[index].actuatorStates.push(null)
      },

      removeActuator (scheduleIndex, actuatorIndex) {
        this.controller.schedule[scheduleIndex].actuators.splice(actuatorIndex, 1)
        this.controller.schedule[scheduleIndex].actuatorStates.splice(actuatorIndex, 1)
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
  .indent {
    padding-left: 20px;
    margin-bottom: 10px;
    border-left: 1px solid $primary;
  }
  .remove-schedule-button {
    margin-top: 10px;
  }
</style>
