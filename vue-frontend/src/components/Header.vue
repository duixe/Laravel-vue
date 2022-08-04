<template>
  <header class="header" id="header">
    <img class="header__logo" src="../assets/img/io.png" alt="io-logo" />
    <nav class="nav">
      <ul class="nav__links">
        <li disabled><router-link to="/" v-if="isUserAuthenticated">Dashboard 📋</router-link></li>
         <li disabled><router-link to="/add" v-if="isUserAuthenticated">Add Task +</router-link></li>
        <li><router-link to="/register" v-if="!isUserAuthenticated">Sign Up </router-link></li>
        <li><router-link to="/login" v-if="!isUserAuthenticated">Log in</router-link></li>
      </ul>
    </nav>
    <!-- <div class="header__socials"> -->
      <a 
        class="btn btn-dark" 
        v-if="isUserAuthenticated"
        @click.prevent="onLogout()"
      >
        Log out
      </a>
       <!-- <div class="header__profile" style="display: block;"> -->
          <!-- <img :src="avatar_uri + user.name" class="header__profile-img"> -->
          <!-- <div class="header__profile-h3">
            <h3>Welcome, {{ this.user.name }}</h3> <br>
            <h3>Email: <i>{{ this.user.email }}</i></h3>
          </div> -->
      <!-- </div> -->
    <!-- </div> -->
  </header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_USER_AUTHENTICATED_GETTER, LOGOUT_ACTION, GET_USER_DATA_GETTER } from '../store/storeconstants'

export default {
  computed: {
    ...mapGetters('auth', {
      isUserAuthenticated: IS_USER_AUTHENTICATED_GETTER,
      user: GET_USER_DATA_GETTER
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    async onLogout() {

      try {
        await this.logout();
      } catch (error) {
        console.log(error);
      }
       
       this.$router.replace('/login')
    }
  }
}
</script>
