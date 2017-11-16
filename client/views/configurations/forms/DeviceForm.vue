<template>
  <card-modal
      :visible="visible"
      :title="title"
      @ok="handleSubmit"
      @close="handleCancel"
      @cancel="handleCancel"
      okText="Save"
    >
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
            <option value="gpio">GPIO</option>
          </select>
        </div>
      </div>
    </div>

    <br />

    <div class="field">
      <label class="label">Mode</label>
      <p v-if="errors.mode" class="help is-danger">{{ errors.mode }}</p>
      <div class="control">
        <div class="select">
          <select v-model="value.mode">
            <option value="discreteOut">Discrete Out</option>
          </select>
        </div>
      </div>
    </div>

    <br />

    <div class="field">
      <label class="label">Address</label>
      <p v-if="errors.address" class="help is-danger">{{ errors.address }}</p>
      <div class="control">
        <input v-model="value.address" class="input" type="text">
      </div>
    </div>

    <br />

    <div class="field">
      <label class="label">Default Value</label>
      <div class="control">
        <input v-model="value.defaultValue" class="input" type="number" placeholder="0">
      </div>
    </div>

    <br />
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

const createDefault = () => ({
  _id: null,
  name: null,
  type: null,
  mode: null,
  address: null,
  defaultValue: null
})

export default {
  name: 'DeviceForm',

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
      default: 'New Device'
    },
    initialValues: {
      type: Object,
      default: () => ({})
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
      if (!device.mode) {
        this.errors.mode = 'Required'
        valid = false
      }
      if (!device.address) {
        this.errors.address = 'Required'
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
    }
  }
}
</script>
