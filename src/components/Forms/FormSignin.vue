<template>
  <form class="flex flex-col justify-center p-8 rounded bg-white w-screen md:w-96 h-screen md:h-max">
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
         v-on:click="login($event)" type="submit" :disabled="password.length < 3">
          Login
      </button>
    </div>
</form> 
</template>

<script>
  import store from '../../store/store'
  import axios from 'axios'

  export default {
    name: 'FormSignin',
    data() {
      return {
        email: '',
        password: '',
        error: false,
        errorMsg: `An error occurred, please try again`,
      }
    },
    methods: {      
      async login(e) {
        e.preventDefault()
        axios
          .post(process.env.VUE_APP_DATABASE_URL + '/api/auth/local', {
            identifier: this.email,
            password: this.password,
          })
          .then(response => {
            store.commit('saveDataUser', response.data.user)
            store.commit('saveJWT', response.data.jwt)
            location.reload();
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          });
      },
    },
  } 
</script>