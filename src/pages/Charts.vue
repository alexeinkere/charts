<template>
	<div class="mb-32 p-8"
		v-if="user">
		<div class="flex flex-wrap m-4 justify-end md:justify-start">
			<select v-model="key_1" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0">
				<option 
					v-for="(label, index) in labels" 
					:disabled="index == key_2" 
					:key="index" 
					:value="index">
					{{ label }}
				</option>
			</select>

			<select v-model="key_2" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0">
				<option 
					v-for="(label, index) in labels"
					:disabled="index == 0 || index == key_1" 
					:key="index" 
					:value="index">
					{{ label }}
				</option>
			</select>

			<button 
				class="flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-600"
				v-on:click="addChart()" 
				:disabled="charts.length > 3">
				Créer une graphe
			</button>
		</div>

		<div class="flex flex-wrap w-full">
			<div 
				class="w-full md:w-1/2 relative"
				v-for="(chart, index) in charts" 
				:key="index">
				<BarChart
					class="w-full p-8" 
					:response="data" 
					:label="labels[chart.value_2]" 
					:param_1="chart.value_1" 
					:param_2="labels.indexOf(labels[chart.value_2])" 
					:color="'255, 132, 99, 0.5'" />
				<div 
					class="absolute top-10 right-4 text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full flex justify-center items-center w-10 h-10 cursor-pointer"
					v-on:click="deleteChart(index)">
					<i class="text-lg fa-solid fa-trash-can"></i>
				</div>
			</div>
		</div>		
	</div>
	<div class="mb-32 p-8"
		v-else>
		Home
	</div>	
</template>



<script>
	import axios from 'axios';
	import BarChart from '../components/BarChart';
	import store from '../store/store'

	export default {
		name: "AppCharts",
		components: {
				BarChart
		},
		data() {
			return {
				key_1: "0",
				key_2: "1",
				data: [],
				labels: [],
			}
		},
		created() {
			if(store.state.charts == null) {
				store.commit('updateChart', [])
			}
		},
		mounted() {
			axios
        .get(process.env.VUE_APP_DATABASE_URL +  "/api/users/me", {
          headers: { 
            'Authorization': 'Bearer ' + this.jwt
          }
        })
        .then(response => {
					this.labels = Object.keys(response.data.tables[0].donnees[0])
					this.data = response.data.tables[0].donnees
        })
		},
		computed: {
      user() {
        return store.state.user
      },	
			jwt() {
				return store.state.jwt
      },
			charts()  {
				return store.state.charts
			},
		},
		methods: {
			addChart: function() {
				this.charts.push({
					value_1: Number(this.key_1),
					value_2: Number(this.key_2)
				})
				store.commit('updateChart', this.charts)
			},
			deleteChart: function(i) {
				this.charts.splice(i, 1)
				store.commit('updateChart', this.charts)
			}
		}
	}
</script>