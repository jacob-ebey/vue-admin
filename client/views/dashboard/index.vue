<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Projects</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="loading.projects.isLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!loading.projects.isLoading" label="Reload projects" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadProjects">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="projects">
              <router-link v-for="project in projects" :key="project.id" :to="'projects/view/' + project.id" tag="tr"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{project.title}}</td>
                <td>{{project.id}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!loading.projects.isLoading" label="Add new project" placement="bottom-right">
            <router-link to="projects/add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!loading.projects.isLoading" label="See all projects" placement="bottom-right">
            <router-link to="projects" tag="button" class="button has-text-centered">
              <i class="fa fa-ellipsis-h center-icon"></i>
            </router-link>
          </tooltip>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Gateways</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>
                  <button v-if="loading.gateways.isLoading" class="button is-white is-loading"></button>
                  <tooltip v-if="!loading.gateways.isLoading" label="Reload gateways" placement="top-right">
                    <button class="button is-small has-text-centered" v-on:click="loadGateways">
                      <i class="fa fa-refresh center-icon"></i>
                    </button>
                  </tooltip>
                </th>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody v-if="gateways">
              <router-link v-for="gateway in gateways" :key="gateway.id" :to="'gateways/view/' + gateway.id" tag="tr"> 
                <td><i class="fa fa-check has-text-success"></i></td>
                <td>{{gateway.title}}</td>
                <td>{{gateway.id}}</td>
              </router-link>
            </tbody>
          </table>
          <tooltip v-if="!loading.gateways.isLoading" label="Add new gateway" placement="bottom-right">
            <router-link to="gateways/add" tag="button" class="button is-success has-text-centered">
              <i class="fa fa-plus center-icon"></i>
            </router-link>
          </tooltip>
          <tooltip v-if="!loading.gateways.isLoading" label="See all gateways" placement="bottom-right">
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
      loading: 'loading'
    }),
    projects () {
      return this.loading.projects.data ? this.loading.projects.data.slice(0, 5) : undefined
    },
    gateways () {
      return this.loading.gateways.data ? this.loading.gateways.data.slice(0, 5) : undefined
    }
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
