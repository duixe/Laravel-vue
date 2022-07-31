<template>
  <Header />
  <router-view />
</template>

<script>
import Header from './components/Header.vue';
import { IS_LOGGED_IN_ACTION } from './store/storeconstants';
export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch(`auth/${IS_LOGGED_IN_ACTION}`);
  }
}
</script>

<style lang="sass">
@import "./assets/scss/main.scss"
</style>

