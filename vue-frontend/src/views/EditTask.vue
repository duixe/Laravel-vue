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
import axios from 'axios';
export default {
    props: ['id'],
    data() {
        return {
            title: '',
            description: ''
        }
    },
    mounted() {
        axios
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
        async handleSubmit() {
            let data = {
                title: this.title,
                description: this.description,
            }

            try {
                await axios.patch(`/tasks/${this.id}`, data);
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>