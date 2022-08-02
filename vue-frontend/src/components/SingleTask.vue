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
export default {
    props: ["task"],
    data() {
        return {
            showDesc: false
        }
    },
    methods: {
        async deleteTask() {
            const param = {
                id: this.task.id
            };

            try {
                const res = await axios.delete(`/tasks/${this.task.id}`);
                this.$emit('removeTask', this.task.id);
            } catch (err) {
                console.log(err)
            }
        },

        async statusComplete() {
            let body = {
                completed: !this.task.completed
            };

            try {
                await axios.patch(`/tasks/${this.task.id}`, body);
                this.$emit('complete', this.task.id);
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>