<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <router-link tag="h4" to="projects" class="title">Projects</router-link>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="projects.isLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!projects.isLoading" label="Reload projects" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadProjects">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="projects.data">
              <router-link tag="tr" v-for="project in projects.data.slice(0, 5)" :key="project._id" :to="'projects/view/' + project._id"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{project.name}}</td>
                <td>{{project._id}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!projects.isLoading" label="Add new project" placement="bottom-right">
            <router-link to="projects?action=add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!projects.isLoading" label="See all projects" placement="bottom-right">
            <router-link to="projects" tag="button" class="button has-text-centered">
              <i class="fa fa-ellipsis-h center-icon"></i>
            </router-link>
          </tooltip>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <router-link tag="h4" to="gateways" class="title">Gateways</router-link>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="gateways.isLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!gateways.isLoading" label="Reload gateways" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadGateways">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="gateways.data">
              <router-link v-for="gateway in gateways.data.slice(0, 5)" :key="gateway._id" :to="'gateways/view/' + gateway._id" tag="tr"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{gateway.name}}</td>
                <td>{{gateway._id}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!gateways.isLoading" label="Add new gateway" placement="bottom-right">
            <router-link to="gateways?action=add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!gateways.isLoading" label="See all gateways" placement="bottom-right">
            <router-link to="gateways" tag="button" class="button has-text-centered">
              <i class="fa fa-ellipsis-h center-icon"></i>
            </router-link>
          </tooltip>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Tooltip
  },

  computed: {
    ...mapGetters({
      projects: 'projects',
      gateways: 'gateways'
    })
  },

  mounted () {
    this.loadProjects(false)
    this.loadGateways(false)
  },

  methods: {
    ...mapActions([
      'doLoad'
    ]),
    loadProjects (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'projects', forceLoad })
    },
    loadGateways (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'gateways', forceLoad })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
