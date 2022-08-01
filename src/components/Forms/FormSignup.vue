<template>
  <form class="flex flex-col justify-center p-8 rounded bg-white w-screen md:w-96 h-screen md:h-max">
    <div class="sm:col-span-2 sm:items-start py-2">
        <label class="block text-sm font-medium text-gray-700 mb-2"> Username </label>
      <input type="text" v-model="username" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
        <label class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
      <input type="email" v-model="email" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
        <label class="block text-sm font-medium text-gray-700 mb-2"> Password </label>
      <input type="password" v-model="password" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
    </div>
    
    <div class="sm:col-span-2 sm:items-start py-2">  
      <button class="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        v-on:click="register($event)" type="submit" :disabled="password.length < 6 || username.length < 3">
        Sign Up 
      </button>
    </div>
  </form>    
</template>

<script>
  import store from '../../store/store'
  import axios from "axios"

  export default {
    name: 'FormSignup',
    data() {
      return {
        email: '',
        password: '',
        username: '',
        error: false,
        errorMsg: `An Error occurred, please try again`
      }
    },
    methods: {
      async register(e) {
        e.preventDefault()
        axios
          .post('http://localhost:1337/api/auth/local/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then(response => {
            store.commit('logged', response.data)
            //this.$root.$refs.AppPopup.togglePopup()
            location.reload();
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          }); 
      }
    }
  }
</script>