<template>
    <div class="auth">
        <div class="auth__forms">
            <div class="auth__forms-error">{{ serverError }}</div>
            <div class="form login">
                <span class="title">Login {{ name }}</span>

                <form @submit.prevent="onLogin()">
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
                            placeholder="Enter your password"
                            v-model.trim="password"
                            required
                        >
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>
                     <div class="error" v-if="errors.password"> {{ errors.password }}</div>
                    <div class="input-field button">
                        <!-- <input type="button" value="Login"> -->
                        <button type="submit">Login</button>
                    </div>
                </form>

                <div class="auth__text">
                    <span class="text">Not a member?
                        <a href="#" class="text signup-link">Signup Now</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoginValidations from '../../services/LoginValidations';
import { LOGIN_ACTION } from '../../store/storeconstants';

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            serverError: ''
        }
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        async onLogin() {
            // validate inputs
            const validations = new LoginValidations(
                this.email, 
                this.password
            );

            this.errors = validations.checkValidations(); 
            if ('email' in this.errors ) {
                return false
            }

            this.serverError = '';
            //login user into the app
            try {
                await this.login({
                    email: this.email, 
                    password: this.password
                }) 
            } catch (err) {
                this.serverError = err
            }

            //if user successfully login rrediect to Home - task dashboard
            if (this.serverError === '') {
                this.$router.push('/');
            }

        }
    }
    // computed: {
    //     ...mapState('auth', {
    //         name: (state) => state.name
    //     })
    // }
}
</script>