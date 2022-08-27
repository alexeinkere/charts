<template>
  <LineChartGenerator :chart-data="chartData" :chart-options="chartOptions" :css-classes="cssClasses" />
</template>

<script>
  import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

  export default {
    name: 'LineChart',
    components: {
      LineChartGenerator
    },
    data() {
      return {
        cssClasses: "canvas"
      }
    },
    props: {
      response: Array,
      label: String,
      color: String,
      param_1: Number,
      param_2: Number
    },
    computed: {
      chartData() { 
        return {
          labels: this.response.map(a => a[Object.keys(a)[this.param_1]]),
          datasets: [{ 
            label: this.label,
            data: this.response.map(a => a[Object.keys(a)[this.param_2]]),
            backgroundColor: [
                'rgba(' + this.color + ')'
            ]
          }]
        } 
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
</script>
