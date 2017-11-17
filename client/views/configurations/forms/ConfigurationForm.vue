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
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

const createDefault = () => ({
  _id: null,
  name: null
})

export default {
  name: 'ConfigurationForm',

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
      default: 'New Configuration'
    },
    initialValues: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      value: this.initialValues || createDefault(),
      errors: createDefault()
    }
  },

  watch: {
    initialValues (newValue, oldValue) {
      if (newValue !== oldValue) {
        const configuration = JSON.parse(JSON.stringify(newValue))

        this.value = {
          ...createDefault(),
          ...configuration
        }
      }
    }
  },

  methods: {
    validate (configuration) {
      let valid = true

      if (!configuration.name) {
        this.errors.name = 'Required'
        valid = false
      }

      return valid
    },

    handleSubmit () {
      const configuration = JSON.parse(JSON.stringify(this.value))

      if (this.validate(configuration)) {
        this.$emit('submit', configuration, () => {
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
