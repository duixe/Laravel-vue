<template>
  <div class="homes">
      <dir v-if="tasks.length">
        <div v-for="task in tasks" :key="task.id">
          <SingleTask :task="task" @removeTask="handleRemovedTask" />
        </div>
      </dir>
  </div>
</template>

<script>

import SingleTask from '../components/SingleTask.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN_GETTER } from '../store/storeconstants';
import TaskVue from '../components/SingleTask.vue';
export default {
    components: {
      SingleTask
    },
    data() {
      return {
        tasks: []
      }
    },
    computed: {
      ...mapGetters('auth', {
        access_token: GET_USER_TOKEN_GETTER
      })
    },
    mounted() {
      axios
          .get('/tasks')
          .then((res) => {
            this.tasks = res.data.data;
          })
          .catch(err => {
            console.log(err);
          })
    },
    methods: {
      handleRemovedTask(id) {
        this.tasks = this.tasks.filter((task) => {
          return task.id !== id;
        })
      }
    }
}
</script>

<style>

</style>