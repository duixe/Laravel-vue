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
                <button class="btn btn-secondary">Update Task &rarr;</button>
            </div>
            
        </form>
  </div>
</template>

<script>
import axiosClient from '../services/AxiosInstance'
import { mapActions } from 'vuex';
import { UPDATE_TASK_ACTION } from '../store/storeconstants';
export default {
    props: ['id'],
    data() {
        return {
            title: '',
            description: ''
        }
    },
    mounted() {
        axiosClient
          .get(`/tasks/${this.id}`)
          .then((res) => {
            this.title = res.data.data.title;
            this.description = res.data.data.description;
          })
          .catch(err => {
            console.log(err);
          });
    },
     methods: {
         ...mapActions('task', {
             update: UPDATE_TASK_ACTION
         }),
        async handleSubmit() {

            let data = {
                title: this.title,
                description: this.description,
                id: this.id
            }

            try {
                await this.update(data);
            } catch (error) {
                 console.log(err);
            }

            this.$router.push('/');
        }

    }
}
</script>

<style>

</style>