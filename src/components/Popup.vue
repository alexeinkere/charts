<template>
  <div>
    <div v-on:click="togglePopup()" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 cursor-pointer z-10" v-bind:class="{ hidden: !showPopup }"></div>

    <div class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-20" v-bind:class="{ hidden: !showPopup }">
      <div v-on:click="togglePopup()" class="absolute top-4 right-4">
        <i  class="text-2xl cursor-pointer fa-solid fa-xmark"></i>
      </div>
      
      <form class="flex flex-col p-8 rounded bg-white w-96">
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
          <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Kilomètres parcourus </label>
          <input type="number" v-model="km"
           class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="sm:col-span-2 sm:items-start py-2">
          <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> € générés par jour </label>
          <input type="number" v-model="money"
           class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div> 

        <div class="sm:col-span-2 sm:items-start py-2">  
          <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Commentaires </label>    
          <textarea v-model="comment" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
        </div>
        
        <div class="sm:col-span-2 sm:items-start py-2">  
          <button v-on:click="submitForm($event)" type="submit" class="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
	export default {
		name: "AppPopup",
		data() {
			return {
        date: new Date,
        commande: 0,
        km: 0,
        money: 0,
        comment: "",
        showPopup: false
			}
		},
    created() {
      this.$root.$refs.AppPopup = this
    },
    methods: {
      togglePopup: function() {
        this.showPopup = !this.showPopup
      },
      submitForm: function(e) {
        e.preventDefault(); 
      }
    }
	}
</script>