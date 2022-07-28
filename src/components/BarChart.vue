<template>
  <Bar :chart-data="chartData" :chart-options="chartOptions" :css-classes="cssClasses"/>
</template>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'BarChart',
    components: { Bar },
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
    updated() {
      console.log("updated");
    },
    computed: {
      key_1: function() {
        return this.param_1
      },
        key_2: function() {
        return this.param_2
      },
      chartData() { 
        return {
          labels: this.response.map(a => a[Object.keys(a)[this.key_1]]),
          datasets: [{ 
            label: this.label,
            data: this.response.map(a => a[Object.keys(a)[this.key_2]]),
            backgroundColor: [
                'rgba(' + this.color + ')'
            ]
          }]
        } 
      },
      chartOptions() {
        return {
          responsive: true
        }
      }
    }
  }
</script>