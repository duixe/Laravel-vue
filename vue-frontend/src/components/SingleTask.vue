<template>
  <div class="task" :class="{completed: task.complete}">
      <div class="actions">
          <h3 @click.prevent="showDesc = !showDesc">{{ task.title }}</h3>
          <div class="icons">
              <router-link :to="{name: 'EditTask', params: { id: task.id }}">
                <span class="material-icons">edit</span>
              </router-link>
              <span @click.prevent="deleteTask()" class="material-icons">delete</span>
              <span @click.prevent="statusComplete()" class="material-icons">done</span>
          </div>
      </div>
      <div class="description" v-if="showDesc">
          <p>{{ task.description }}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { DELETE_TASK_ACTION, UPDATE_COMPLETE_STATUS } from '../store/storeconstants';
export default {
    props: ["task"],
    data() {
        return {
            showDesc: false
        }
    },
    methods: {
        ...mapActions('task', {
            delete: DELETE_TASK_ACTION,
            taskCompleted: UPDATE_COMPLETE_STATUS
        }),
        async deleteTask() {
            const param = {
                id: this.task.id
            };

            try {
                await this.delete(param);
            } catch (err) {
                console.log(err)
            }
        },

        async statusComplete() {
            let body = {
                completed: !this.task.completed,
                id: this.task.id
            }

            try {
                await this.taskCompleted(body);
                // this.$emit('complete', this.task.id);
            } catch (err) {
                console.log(err)
            }

            console.log('got here');
        }
    }
}
</script>

<style>

</style>