<template>
  <header class="bg-indigo-600">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-center md:justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <a href="/">
            <span class="sr-only">Workflow</span>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />

          </a>
          <div class="hidden ml-10 space-x-8 lg:block">
            <router-link class="text-lg font-medium text-white hover:text-indigo-50"
              v-for="link in navigation" 
              :key="link.name" 
              :to="link.href">
              {{ link.name }}
            </router-link>
          </div>
        </div>
        <div class="ml-10 space-x-4">
          <p class="inline-block bg-indigo-500 py-2 px-4 rounded-md font-medium text-white hover:bg-opacity-75 cursor-pointer"
            v-if="!user" v-on:click="openForm('FormSignin')" >Sign in</p>
          <p class="inline-block bg-white py-2 px-4 rounded-md font-medium text-indigo-600 hover:bg-indigo-50 cursor-pointer"
            v-if="!user" v-on:click="openForm('FormSignup')" >Sign up</p>
          <p class="inline-block bg-indigo-500 py-2 px-4 rounded-md font-medium text-white hover:bg-opacity-75 cursor-pointer"
            v-if="user" v-on:click="openForm('FormData')">Ajouter une donnée</p>            

            

          <div class="relative inline" 
            v-if="user">
              <button class="peer inline-block bg-indigo-500 py-2 px-4 rounded-md hover:rounded-b-none font-medium text-white hover:bg-opacity-75 cursor-pointer">
                {{ user.username }}
              </button>
              <div class="rounded-b-md absolute right-0 hidden peer-hover:flex hover:flex w-full flex-col bg-white drop-shadow-lg">
                <p class="inline-block bg-white py-2 px-4 font-medium text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                  v-if="user" v-on:click="logout()" >Log out</p>
              </div>
          </div>

        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <router-link 
          class="font-medium text-white hover:text-indigo-50"
          v-for="link in navigation" 
          :key="link.name" 
          :to="link.href">
          {{ link.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
  import store from '../store/store'

  export default {
    name: "AppHeader",
    data() {
      return {
        navigation: [
          { name: 'Graphiques', href: '/' },
          { name: 'Tableaux', href: '/tables' },
          { name: 'Statistiques', href: '/stats' }
        ]
      }
    },
    computed: {
      user() {
        return store.state.user
      },
      jwt() {
        return store.state.jwt
      },	
    },
    methods: {
      openForm: function(form) {
        this.$root.$refs.AppPopup.togglePopup(form)
      },
      logout() {
        store.commit('logout')
      }
    }
  }
</script>