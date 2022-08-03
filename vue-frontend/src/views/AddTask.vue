<template>
  <div class="creator">
         <form @submit.prevent="handleSubmit" class="form">
            <div class="creator__heading">
                <h2 class="heading-secondary">
                    Create Task
                </h2>
            </div>

            <div class="form__group">
                <input 
                    v-model="title"
                    type="text" 
                    class="form__input" 
                    placeholder="Title" 
                    id="title"
                    required
                >
                <label for="title" class="form__label">Title</label>
            </div>

            <div class="form__group">
                <textarea
                    v-model="description"  
                    class="form__input" 
                    placeholder="Desctiption" 
                    id="description" 
                    required
                ></textarea>
                <label for="description" class="form__label">Description</label>
            </div>
            
            <div class="form-group button">
                <button class="btn btn-secondary">Add Task &rarr;</button>
            </div>
            
        </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { CREATE_TASK_ACTION } from '../store/storeconstants';
export default {
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        ...mapActions('task', {
            saveTask: CREATE_TASK_ACTION,
        }),
        async handleSubmit() {
            let data = {
                title: this.title,
                description: this.description
            }

            try {
                await this.saveTask(data);
            } catch (err) {
                console.log(err)
            }

            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>