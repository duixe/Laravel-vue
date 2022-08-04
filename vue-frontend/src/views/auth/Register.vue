<template>
  <div class="auth">
    <div class="auth__forms">
      <div class="auth__forms-error">{{ serverError }}</div>
       <div class="form signup">
          <span class="title">Registration</span>

          <form @submit.prevent="onRegister()">
              <div class="input-field">
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    v-model="name"
                    required
                  >
                  <i class="uil uil-user"></i>
              </div>
              <div class="input-field">
                  <input 
                    type="text" 
                    placeholder="Enter your email"
                    v-model.trim="email"
                    required
                  >
                  <i class="uil uil-envelope icon"></i>
              </div>
              <div class="error" v-if="errors.email"> {{ errors.email }}</div>
              <div class="input-field">
                  <input 
                    type="password" 
                    class="password" 
                    placeholder="Create a password" 
                    v-model.trim="password"
                    required
                  >
                  <i class="uil uil-lock icon"></i>
              </div>
              <div class="error" v-if="errors.password"> {{ errors.password }}</div>
              <div class="input-field">
                  <input 
                    type="password" 
                    class="password" 
                    placeholder="Confirm a password" 
                    v-model.trim="password_confirmation"
                    required
                  >
                  <i class="uil uil-lock icon"></i>
              </div>
              <div class="error" v-if="errors.password_confirmation"> 
                {{ errors.password_confirmation }}
              </div>
              <div class="input-field button">
                  <!-- <input type="button" value="Signup"> -->
                  <button type="submit">Signup</button>
              </div>
          </form>

          <div class="auth__text">
              <span class="text">Already a member?
                  <a href="/login" class="text login-link">Login Now</a>
              </span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterValidations from '../../services/RegisterValidations'
import {mapActions} from 'vuex';
import {REGISTER_ACTION} from '../../store/storeconstants';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
            serverError: '',
            testing: ''
        }
    },
    methods: {
      ...mapActions('auth', {
        register: REGISTER_ACTION
      }),
      async onRegister() {
        // validate inputs
          const validations = new RegisterValidations(
              this.name,
              this.email, 
              this.password,
              this.password_confirmation
          );

          this.errors = validations.checkValidations(); 
          if (
            'email' in this.errors || 
            'password' in this.errors || 
            'password_confirmation' in this.errors
          ) {
            return false;
          }

          this.serverError = '';
          //register user
          try {
            await this.register({
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
          } catch (err) {
              this.serverError = err
          }

          if (this.serverError === '') {
            this.$router.push({ path: 'login', query: { register: 'success' }});
          }


      },
    }
}
</script>
