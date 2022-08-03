<template>
  <div class="homes">
    <!-- <div class="homes__profile">
      <img :src="avatar_uri + user.name" class="homes__profile-img">
      <div class="homes__profile-h3">
        <h3>Welcome, {{ this.user.name }}</h3> <br>
        <h3>Email: <i>{{ this.user.email }}</i></h3>
      </div>
    </div> -->
    <div class="heading-secondary" v-if="tasks.length === 0">
      <h3>Kindly, Create New Tasks to Populate your Dashboard</h3>
    </div>
    <FilterNav @filterChange="current = $event" :current="current" v-show="tasks.length"/>
    <div class="homes__task">
       <div v-if="tasks.length">
        <div v-for="task in filteredTasks" :key="task.id">
          <SingleTask :task="task" @removeTask="handleRemovedTask" @complete="handleCompletedTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SingleTask from '../components/SingleTask.vue';
import FilterNav from '../components/FilterNav.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { GET_TASK_ACTION, GET_USER_DATA_GETTER, GET_USER_TASK_COMPLETED_GETTER, GET_USER_TASK_GETTER, GET_USER_TASK_ONGOING_GETTER, GET_USER_TOKEN_GETTER } from '../store/storeconstants';
import TaskVue from '../components/SingleTask.vue';
export default {
    components: {
      SingleTask,
      FilterNav
    },
    data() {
      return {
        // tasks: [],
        current: 'all',
        avatar_uri: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name='
      }
    },
    computed: {
      ...mapGetters('auth', {
        user: GET_USER_DATA_GETTER
      }),
      ...mapGetters('task', {
        tasks: GET_USER_TASK_GETTER,
        completed_task: GET_USER_TASK_COMPLETED_GETTER,
        ongoing: GET_USER_TASK_ONGOING_GETTER
      }),
      filteredTasks() {
        if (this.current === 'completed') {
          return this.completed_task;
        }

        if (this.current === 'ongoing') {
          return this.ongoing;
        }

        return this.tasks;
      }
    },
    mounted() {
      // axios
      //     .get('/tasks')
      //     .then((res) => {
      //       this.tasks = res.data.data;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      
        this.getUserTasks()
    },
    methods: {
      ...mapActions('task', {
        getUserTasks: GET_TASK_ACTION
      }),
      handleRemovedTask(id) {
        this.tasks = this.tasks.filter((task) => {
          return task.id !== id;
        })
      },
      handleCompletedTask(id) {
        let cp = this.tasks.find((task) => {
          return task.id === id;
        })
        cp.complete = !cp.complete;
      }
    }
}
</script>

<style>

</style>