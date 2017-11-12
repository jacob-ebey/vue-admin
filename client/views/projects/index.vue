<template>
  <div>
    <div class="table-buttons">
        <button @click="openAddProject" class="button is-success has-text-centered">
          <span class="icon is-small">
            <i class="fa fa-plus center-icon"></i>
          </span>
          <span>
            Add Project
          </span>
        </button>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="loading.projects.data">
        <tr v-for="(project, index) in loading.projects.data" :key="project._id"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td><router-link :to="'projects/view/' + project._id">{{project.name}}</router-link></td>
          <td>{{project._id}}</td>
          <td>
            <button class="button is-danger has-text-centered" @click="openDeleteProject(project, index)">
              <i class="fa fa-trash-o center-icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <card-modal :visible="showAddProject" @close="closeAddProject" @ok="addProject" @cancel="closeAddProject" title="New Project">
      <div v-show="createProject.error" style="color:red; word-wrap:break-word;">{{ createProject.error }}</div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="name">
        </div>
      </div>
    </card-modal>
    <card-modal :visible="showDeleteProject && !!projectToDelete && indexToDelete !== null" @close="closeDeleteProject" @ok="deleteProject(projectToDelete, indexToDelete)" @cancel="closeDeleteProject" okText="Yes" cancelText="No" title="Delete Project">
      <p>Do you really wish to delete {{projectToDelete && projectToDelete.name}}?</p>
    </card-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CardModal } from 'vue-bulma-modal'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    CardModal,
    Tooltip
  },

  computed: mapGetters({
    loading: 'loading',
    createProject: 'createProject'
  }),

  data () {
    return {
      showAddProject: false,
      name: '',
      showDeleteProject: false,
      projectToDelete: null,
      indexToDelete: null
    }
  },

  mounted () {
    switch (this.$route.query.action) {
      case 'add':
        this.showAddProject = true
        break
    }

    this.loadProjects(false)
  },

  methods: {
    ...mapActions([
      'doLoad',
      'doPost',
      'doDelete',
      'doPush',
      'doSplice'
    ]),
    loadProjects (forceLoad = true) {
      this.doLoad({ http: this.$http, whatToLoad: 'projects', forceLoad })
    },
    openAddProject () {
      this.showAddProject = true
    },
    closeAddProject () {
      this.showAddProject = false
      this.name = ''
    },
    openDeleteProject (project, index) {
      this.projectToDelete = project
      this.showDeleteProject = true
      this.indexToDelete = index
    },
    closeDeleteProject () {
      this.showDeleteProject = false
      this.projectToDelete = null
      this.indexToDelete = null
    },
    addProject () {
      const project = {
        name: this.name
      }

      this.doPost({
        http: this.$http,
        whatToPost: 'createProject',
        body: project,
        callback: (item) => {
          this.doPush({ whereToPush: 'projects', item })
          this.closeAddProject()
        }
      })
    },
    deleteProject (project, index) {
      if (project) {
        this.doDelete({
          http: this.$http,
          whatToPost: 'deleteProject',
          params: [project._id],
          callback: () => {
            this.doSplice({ whereToSplice: 'projects', start: index, deleteCount: 1 })
            this.closeDeleteProject()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
