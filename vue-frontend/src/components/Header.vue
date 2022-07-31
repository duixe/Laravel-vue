<template>
  <header class="header" id="header">
    <img class="header__logo" src="../assets/img/io.png" alt="io-logo" />
    <nav class="nav">
      <ul class="nav__links">
        <li disabled><router-link to="/" v-if="isUserAuthenticated">Dashboard 📋</router-link></li>
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
    <!-- </div> -->
  </header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_USER_AUTHENTICATED_GETTER, LOGOUT_ACTION } from '../store/storeconstants'

export default {
  computed: {
    ...mapGetters('auth', {
      isUserAuthenticated: IS_USER_AUTHENTICATED_GETTER
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    onLogout() {
       this.logout();
       this.$router.replace('/login')
    }
  }
}
</script>
