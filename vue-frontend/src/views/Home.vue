<template>
  <div class="homes">
      <h1>Home: to display all tasklist</h1>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN_GETTER } from '../store/storeconstants';
export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('auth', {
        access_token: GET_USER_TOKEN_GETTER
      })
    },
    mounted() {
      // axios.get() --- GET DATA FRO api/tasks
    }
}
</script>

<style>

</style>