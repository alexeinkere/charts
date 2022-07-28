<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <header class="bg-indigo-600">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-center md:justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />
          </a>
          <div class="hidden ml-10 space-x-8 lg:block">
            <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">
              {{ link.name }}
            </a>
          </div>
        </div>
        <div class="ml-10 space-x-4">
          <p v-on:click="openForm()" class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Ajouter une donnée</p>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">
          {{ link.name }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "AppHeader",
    computed: {
      navigation: function() {
        return [
          { name: 'Graphiques', href: '/' },
          { name: 'Statistiques', href: '/stats' }
        ]
      }
    },
    methods: {
      openForm: function() {
        this.$root.$refs.AppPopup.togglePopup()
      }
    }
  }
</script>