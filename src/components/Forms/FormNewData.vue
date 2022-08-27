<template>
  <form class="flex flex-col justify-center p-8 rounded bg-white w-screen md:w-96 h-screen md:h-max">
    <div class="sm:col-span-2 sm:items-start py-2">
      <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Date </label>
      <input type="date" v-model="date"
        class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">
      <label for="about" class="block text-sm font-medium text-gray-700 mb-2"> Bon de commande </label>
      <input type="number" v-model="orders"
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
      <label class="block text-sm font-medium text-gray-700 mb-2"> Commentaires </label>    
      <textarea v-model="comment" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
    </div>

    <div class="sm:col-span-2 sm:items-start py-2">  
      <button class="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        v-on:click="submitForm($event)" type="submit">Save</button>
    </div>
  </form>
</template>

<script>
	import axios from 'axios';
  import qs from 'qs'
	import store from '../../store/store'

	export default {
		name: "FormNewData",
		data() {
      return {
        date: new Date,
        orders: 0,
        km: 0,
        money: 0,
        comment: "",
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
      postLine: function(id) {
        axios
          .post(process.env.VUE_APP_DATABASE_URL +  "/api/lines", {
            "data": {
              "date": this.date,
              "orders": this.orders,
              "kilometres": this.km,
              "money": this.money,
              "comments": this.comment,
              "table_id": id
            },
          })
          .then(function() {
            //this.$root.$refs.AppPopup.togglePopup()
          })  
      },      
      submitForm: function(e) {
        e.preventDefault();

        let dateObject = new Date(this.date)
        let query = qs.stringify({
          filters: {
            monthNumber: {
              $eq: (dateObject.getMonth() + 1),
            },
            yearNumber: {
              $eq: dateObject.getFullYear()
            }
          },
          populate: '*',
        });

				axios
					.get(process.env.VUE_APP_DATABASE_URL +  `/api/tables?${query}`, {
						headers: { 
							'Authorization': 'Bearer ' + this.jwt
						}
					})
					.then(response => {
            if(response.data.data.length == 0) {
              axios
                .post(process.env.VUE_APP_DATABASE_URL +  "/api/tables", {
                  "data": {
                    "monthNumber": (dateObject.getMonth() + 1),
                    "yearNumber": dateObject.getFullYear(),
                    "user_id": this.user.id
                  },
                })
                .then(response => {
                  this.postLine(response.data.data.id)
                })
            } else {
              this.postLine(response.data.data[0].id)
            }
					})
      }
    }
	}
</script>