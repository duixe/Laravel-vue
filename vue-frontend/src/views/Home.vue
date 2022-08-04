<template>
  <div class="homes" id="home">
    <div class="heading-secondary" v-if="!tasks.length">
      <h3>Kindly, Create New Tasks to Populate your Dashboard</h3>
    </div>
    <FilterNav @filterChange="current = $event" :current="current" v-show="tasks.length"/>
    <div class="homes__task">
       <div v-if="tasks.length">
        <div v-for="task in filteredTasks" :key="task.id">
          <SingleTask :task="task" @removeTask="handleRemoveTask" @complete="handleCompletedTask" />
        </div>
      </div>
    </div>
      <div class="modal" v-if="isDeleteOpen">
          <div>
              <h2 class="header-h">Delete Task</h2>
              <p class="header-p">Are sure you want to delete task</p>
              <a @click="isDeleteOpen = false" class="btn btn-primary" style="margin-right: 1rem">close</a>
              <a @click="handleDelete()" class="btn btn-dark">Delete</a>
          </div>
      </div>
  </div>
</template>

<script>

import SingleTask from '../components/SingleTask.vue';
import FilterNav from '../components/FilterNav.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { DELETE_TASK_ACTION, GET_TASK_ACTION, GET_USER_DATA_GETTER, GET_USER_TASK_COMPLETED_GETTER, GET_USER_TASK_GETTER, GET_USER_TASK_ONGOING_GETTER, GET_USER_TOKEN_GETTER } from '../store/storeconstants';
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
        avatar_uri: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=',
        isDeleteOpen: false,
        taskId: '',
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
      this.getUserTasks()
    },
    methods: {
      ...mapActions('task', {
        getUserTasks: GET_TASK_ACTION,
        delete: DELETE_TASK_ACTION
      }),
      async handleDelete(){
        const param = {
            id: this.taskId
        };

        try {
            await this.delete(param);
        } catch (err) {
            // console.log(err) 
        }

        this.isDeleteOpen = false;
      },
      handleRemoveTask(id) {
        this.taskId = id;
        this.isDeleteOpen = true;
      },
    }
}
</script>

<style>

</style>