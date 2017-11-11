<template>
  <div>
    <div class="table-buttons">
        <router-link to="projects/add" tag="button" class="button is-success has-text-centered">
          <span class="icon is-small">
            <i class="fa fa-plus center-icon"></i>
          </span>
          <span>
            Add Project
          </span>
        </router-link>
    </div>
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
      <tbody v-if="loading.projects.data">
        <router-link v-for="project in loading.projects.data" :key="project.id" :to="'projects/view/' + project.id" tag="tr"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td>{{project.title}}</td>
          <td>{{project.id}}</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Tooltip
  },

  computed: mapGetters({
    loading: 'loading'
  }),

  mounted () {
    this.loadProjects(false)
  },

  methods: {
    ...mapActions([
      'doLoad'
    ]),
    loadProjects (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'projects', forceLoad })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
