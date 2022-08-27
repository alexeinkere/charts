<template>
	<div class="mb-32 p-8"
		v-if="user">
		<div class="flex flex-wrap m-4 justify-end md:justify-between">
			<div class="flex">
				<select v-model="key_1" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0 capitalize">
					<option 
						v-for="(label, index) in labels" 
						:disabled="index == key_2" 
						:key="index" 
						:value="index">
						{{ label }}
					</option>
				</select>

				<select v-model="key_2" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0 capitalize">
					<option 
						v-for="(label, index) in labels"
						:disabled="index == key_1 || label == 'date'" 
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
			<div class="flex">
				<div class="text-indigo-600 hover:text-white hover:bg-indigo-600 border-2	border-indigo-600 p-2 rounded-full flex justify-center items-center w-10 h-10 cursor-pointer ml-4"
					v-on:click="changeType('bar')">
					<i class="fa-solid fa-chart-column"></i>
				</div>
				<div class="text-indigo-600 hover:text-white hover:bg-indigo-600 border-2	border-indigo-600 p-2 rounded-full flex justify-center items-center w-10 h-10 cursor-pointer ml-4"
					v-on:click="changeType('line')">
					<i class="fa-solid fa-chart-line"></i>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap w-full">
			<div 
				class="w-full md:w-1/2 relative"
				v-for="(chart, index) in charts" 
				:key="index">

				<BarChart
					v-if="type == 'bar'"
					class="w-full p-8" 
					:response="data" 
					:label="labels[chart.value_2]" 
					:param_1="chart.value_1" 
					:param_2="labels.indexOf(labels[chart.value_2])" 
					:color="'255, 132, 99, 0.5'" />

				<LineChart 
					v-if="type == 'line'"
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
	import BarChart from '../components/Charts/Bar';
	import LineChart from '../components/Charts/Line';
	import store from '../store/store'
  import qs from 'qs'

	export default {
		name: "AppCharts",
		components: {
				BarChart,
				LineChart
		},
		data() {
			return {
				key_1: "0",
				key_2: "1",
				type: "line",
				data: [],
				labels: []
			}
		},
		created() {
			if(store.state.charts == null) {
				store.commit('updateChart', [])
			}
		},
		mounted() {
			if(this.jwt != null) {
				let array = []
        let linesQuery = qs.stringify({
          populate: '*',
        })

				axios
					.get(process.env.VUE_APP_DATABASE_URL +  `/api/lines?${linesQuery}`, {
						headers: { 
							'Authorization': 'Bearer ' + this.jwt
						}
					})
					.then(response => {
            this.labels = Object.keys(response.data.data[0].attributes).filter(function(value) {
              if(value == "orders" || value == "kilometers" || value == "money" || value == "date" )
                return value
            })
            this.labels = new Array(this.labels[2], this.labels[0], this.labels[1], this.labels[3])
						response.data.data.map(a => a.attributes).forEach(function(i) {
							array.push({
								date: new Date(i.date).toLocaleDateString("en-US"),
								orders: i.orders,
								money: i.money,
								kilometers: i.kilometers,
							})
						})
						this.data = array
					})
			}
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
			},
			changeType: function(type) {
				this.type = type
			}
		}
	}
</script>