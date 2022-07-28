<template>
	<div class="flex flex-wrap w-full">
		<BarChart class="w-full md:w-1/2 p-8" :response="excel_data" :label="excel_label_km" :param_1="0" :param_2="2" :color="'255, 99, 132, 0.5'" />
		<BarChart class="w-full md:w-1/2 p-8" :response="excel_data" :label="excel_label_euro" :param_1="0" :param_2="3" :color="'99, 132, 255, 0.5'" />
	</div>
</template>


<script>
	import axios from 'axios';
	import BarChart from './BarChart';

	export default {
		name: "AppCharts",
		components: {
				BarChart
		},
		data() {
			return {
				excel_data: [],
				excel_label_km: "",
				excel_label_euro: ""
			}
		},
		mounted() {
				axios
				.get("https://opensheet.elk.sh/1a2yS9TPY41GozC2RsiwIWvg-d3K4MksKZToq5opj-D8/Sheet1")
				.then(response => {
						this.excel_data = response.data
						this.excel_label_km = Object.keys(this.excel_data[0])[2]
						this.excel_label_euro = Object.keys(this.excel_data[0])[3]
				});
		}
	}
</script>