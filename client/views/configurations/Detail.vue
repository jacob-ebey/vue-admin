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
      configuration: 'configuration'
    }),

    mounted () {
      this.loadConfiguration()
    },
  
    methods: {
      ...mapActions([
        'doLoad'
      ]),

      loadConfiguration () {
        this.doLoad({
          http: this.$http,
          whatToLoad: 'configuration',
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
