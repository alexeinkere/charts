<template>
  <form class="flex flex-col justify-center p-8 rounded bg-white w-screen md:w-96 h-screen md:h-max">
    <div class="sm:col-span-2 sm:items-start py-2">
      <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Date </label>
      <input type="date" v-model="date"
        class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
      <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Bon de commande </label>
      <input type="number" v-model="commande"
        class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
      <label class="block text-sm font-medium text-gray-700 mb-2"> Kilomètres parcourus </label>
      <input type="number" v-model="km"
        class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
      <label class="block text-sm font-medium text-gray-700 mb-2"> € générés par jour </label>
      <input type="number" v-model="money"
        class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
    </div> 
    
    <div class="sm:col-span-2 sm:items-start py-2">  
      <button class="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        v-on:click="submitForm($event)" type="submit">Save</button>
    </div>
  </form>
</template>

<script>
	export default {
		name: "FormData",
		data() {
      return {
        date: new Date,
        commande: 0,
        km: 0,
        money: 0,
        comment: ""
      }
		},
    created() {
      this.$root.$refs.FormData = this
    },
    methods: {
      submitForm: function(e) {
        e.preventDefault(); 
      }
    }
	}
</script>