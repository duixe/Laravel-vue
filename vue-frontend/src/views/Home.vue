<template>
  <div class="homes">
    <!-- <div class="homes__profile">
      <div class="homes__profile-img"></div>
      <h3>Welcome {{ this.user.name }}</h3>
    </div> -->
    <FilterNav @filterChange="current = $event" :current="current" />
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
import { mapGetters } from 'vuex';
import { GET_USER_DATA_GETTER, GET_USER_TOKEN_GETTER } from '../store/storeconstants';
import TaskVue from '../components/SingleTask.vue';
export default {
    components: {
      SingleTask,
      FilterNav
    },
    data() {
      return {
        tasks: [],
        current: 'all'
      }
    },
    computed: {
      ...mapGetters('auth', {
        user: GET_USER_DATA_GETTER
      }),
      filteredTasks() {
        if (this.current === 'completed') {
          return this.tasks.filter(task => task.completed );
        }

        if (this.current === 'ongoing') {
          return this.tasks.filter(task => !task.completed );
        }

        return this.tasks;
      }
    },
    mounted() {
      axios
          .get('/tasks')
          .then((res) => {
            this.tasks = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
    },
    methods: {
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