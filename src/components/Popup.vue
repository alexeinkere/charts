<template>
  <div>
    <div v-on:click="closePopup()" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 cursor-pointer z-10" v-bind:class="{ hidden: !showPopup }"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-max h-max z-20" v-bind:class="{ hidden: !showPopup }">
      <form class="flex flex-col p-8 rounded bg-white">
        <div class="sm:col-span-2 sm:items-start py-2">
          <label for="about" class="block text-sm font-medium text-gray-700"> Date </label>
          <input type="date" v-model="date"
            class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="sm:col-span-2 sm:items-start py-2">
          <label for="about" class="block text-sm font-medium text-gray-700"> Bon de commande </label>
          <input type="number" v-model="commande"
           class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="sm:col-span-2 sm:items-start py-2">
          <label for="about" class="block text-sm font-medium text-gray-700"> Kilomètres parcourus </label>
          <input type="number" v-model="km"
           class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="sm:col-span-2 sm:items-start py-2">
          <label for="about" class="block text-sm font-medium text-gray-700"> € générés par jour </label>
          <input type="number" v-model="money"
           class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
        </div> 

        <div class="sm:col-span-2 sm:items-start py-2">  
          <label for="about" class="block text-sm font-medium text-gray-700"> Commentaires </label>    
          <textarea v-model="comment" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
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
      openPopup: function() {
        this.showPopup = !this.showPopup
      },
      closePopup: function() {
        this.showPopup = !this.showPopup
      }
    }
	}
</script>