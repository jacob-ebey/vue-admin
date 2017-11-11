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
    <div class="title is-ancestor">
      <div class="title is-parent">
        <article class="title is-child box">
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
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Chartist from 'vue-bulma-chartist'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Chartist,
    Tooltip
  },

  computed: mapGetters({
    loading: 'loading'
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
    this.loadProjects()
  },

  methods: {
    ...mapActions([
      'doLoad'
    ]),
    loadProjects () {
      this.doLoad({ http: this.$http, whatToLoad: 'project', forceLoad: true, params: [ this.$route.params.id ] })
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
