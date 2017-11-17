<template>
  <card-modal
      :visible="visible"
      :title="title"
      @ok="handleSubmit"
      @close="handleCancel"
      @cancel="handleCancel"
      okText="Save"
    >
    <p v-if="error" class="is-danger">{{ error }}</p>

    <div class="field">
      <label class="label">Name</label>
      <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
      <div class="control">
        <input v-model="value.name" class="input">
      </div>
    </div>

    <br />

    <div class="field">
      <label class="label">Type</label>
      <p v-if="errors.type" class="help is-danger">{{ errors.type }}</p>
      <div class="control">
        <div class="select">
          <select v-model="value.type">
            <option value="timer">Timer</option>
          </select>
        </div>
      </div>
    </div>

    <br />

    <div class="field is-inline">
      <div>
        <label class="label">Inputs</label>
        <button class="button is-small has-text-centered" @click="value.inputs.push(null)">
          <i class="fa fa-plus center-icon"></i>
        </button>
        <div v-for="(input, index) in value.inputs" :key="index" class="field indent">
          <label class="label">Device</label>
          <div class="control">
            <div class="select">
              <select v-model="value.inputs[index]">
                <option v-for="device in devices" :key="device._id" :value="device._id">{{device.name}}</option>
              </select>
            </div>
            <button
              class="button is-danger is-small has-text-centered is-center"
              @click="value.inputs.splice(index, 1)"
            >
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="field is-inline">
      <div>
        <label class="label">Outputs</label>
        <button class="button is-small has-text-centered" @click="value.outputs.push(null)">
          <i class="fa fa-plus center-icon"></i>
        </button>
        <div v-for="(output, index) in value.outputs" :key="index" class="field indent">
          <label class="label">Device {{index + 1}}</label>
          <div class="control">
            <div class="select">
              <select v-model="value.outputs[index]">
                <option v-for="device in devices" :key="device._id" :value="device._id">{{device.name}}</option>
              </select>
            </div>
            <button
              class="button is-danger is-small has-text-centered is-center"
              @click="value.output.splice(index, 1)"
            >
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <br />

    <template v-if="value.type === 'timer'">
      <div class="field is-inline">
        <label class="label">Schedule</label>
        <button class="button is-small has-text-centered" @click="addSchedule()">
          <i class="fa fa-plus center-icon"></i>
        </button>
      </div>
      <div v-for="(s, index) in value.schedule" class="indent" :key="index">
        <div class="is-inline">
          <div class="is-full">
            <div class="field">
              <label class="label">Time</label>
              <div class="control">
                <input class="input" v-model="value.schedule[index].dateTime" />
              </div>
            </div>

            <br />

            <div class="field is-inline">
              <label class="label">State Map</label>
              <button class="button is-small has-text-centered" @click="addActuator(index)">
                <i class="fa fa-plus center-icon"></i>
              </button>
            </div>
            <div class="field indent" v-for="(acuator, actuatorIndex) in value.schedule[index].actuators" :key="actuatorIndex">
              <div class="control">
                <label class="label">Output</label>
                <div class="select">
                  <select v-model="value.schedule[index].actuators[actuatorIndex]">
                    <option
                      v-for="(output, outputIndex) in value.outputs"
                      :key="outputIndex"
                      :value="outputIndex">
                      Device {{outputIndex + 1}}
                    </option>
                  </select>
                </div>
                <br />
                <label class="label">Value</label>
                <div class="control">
                  <input class="input" type="number" v-model="value.schedule[index].actuatorStates[actuatorIndex]" />
                </div>
                <button
                  class="button is-small has-text-centered is-center"
                  @click="value.schedule[index].actuators.splice(actuatorIndex, 1)"
                >
                  <i class="fa fa-trash-o center-icon"></i>
                </button>
              </div>
            </div>
          </div>
          <button
            class="button is-danger is-small has-text-centered is-center"
            @click="value.schedule.splice(index, 1)"
          >
            <i class="fa fa-trash-o center-icon"></i>
          </button>
        </div>
      </div>
    </template>

    <br />
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

const createDefault = () => ({
  name: null,
  type: null,
  inputs: [],
  outputs: [],
  schedule: []
})

export default {
  name: 'ControllerForm',

  components: {
    CardModal
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'New Controller'
    },
    error: {
      type: String,
      default: null
    },
    initialValues: {
      type: Object,
      default: () => ({})
    },
    devices: {
      type: Array,
      default: () => ([])
    }
  },

  data () {
    return {
      value: createDefault(),
      errors: createDefault()
    }
  },

  watch: {
    initialValues (newValue, oldValue) {
      if (newValue !== oldValue) {
        const device = JSON.parse(JSON.stringify(newValue))

        this.value = {
          ...createDefault(),
          ...device
        }
      }
    }
  },

  methods: {
    validate (device) {
      let valid = true

      if (!device.name) {
        this.errors.name = 'Required'
        valid = false
      }
      if (!device.type) {
        this.errors.type = 'Required'
        valid = false
      }

      return valid
    },

    handleSubmit () {
      const device = JSON.parse(JSON.stringify(this.value))

      if (this.validate(device)) {
        this.$emit('submit', device, () => {
          this.value = createDefault()
          this.errors = createDefault()
        })
      }
    },

    handleCancel () {
      this.value = createDefault()
      this.errors = createDefault()

      this.$emit('cancel')
    },

    addSchedule () {
      this.value.schedule.push({
        actuators: [],
        actuatorStates: []
      })
    },

    addActuator (index) {
      this.value.schedule[index].actuators.push(null)
      this.value.schedule[index].actuatorStates.push(0)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  
  .is-inline {
    display: flex;
    & > * {
      margin-right: 5px;
    }
  }

  .is-full {
    flex-grow: 1;
  }

  .is-center {
    align-self: center;
  }

  .indent {
    padding-left: 20px;
    border-left: 1px solid $primary;
    margin: 5px 0;
  }
</style>
