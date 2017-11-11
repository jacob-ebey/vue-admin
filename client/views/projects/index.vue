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
        </tr>
      </thead>
      <tbody v-if="loading.projects.data">
        <router-link tag="tr" v-for="project in loading.projects.data" :key="project._id" :to="'projects/view/' + project._id"> 
          <td><i class="fa fa-check has-text-success"></i></td>
          <td>{{project.name}}</td>
          <td>{{project._id}}</td>
        </router-link>
      </tbody>
    </table>
    <card-modal :visible="showAddProject" @close="closeAddProject" @ok="addProject" @cancel="closeAddProject" title="New Project">
      <div v-show="addError" style="color:red; word-wrap:break-word;">{{ addError }}</div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Project 01">
        </div>
      </div>
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
    loading: 'loading'
  }),

  data () {
    return {
      showAddProject: false,
      addError: null,
      name: ''
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
      'doPush'
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
    addProject () {
      const project = {
        name: this.name
      }

      const token = this.$auth.token()

      this.$http.post('/api/projects', project, { emulateJSON: true, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' } }).then((res) => {
        if (res.status === 200) {
          this.showAddProject = false
          this.name = ''
          this.doPush({ whatToLoad: 'projects', item: res.data })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
