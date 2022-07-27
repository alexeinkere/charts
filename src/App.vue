<template>
  <div id="app">
    <Header></Header>
    <div class="flex w-full">
      <BarChart class="w-full p-8" :response="excel_data" :label="excel_label_km" :param_1="0" :param_2="2" :color="'255, 99, 132, 0.5'" />
      <BarChart class="w-full p-8" :response="excel_data" :label="excel_label_euro" :param_1="0" :param_2="3" :color="'99, 132, 255, 0.5'" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import BarChart from './components/BarChart';

export default {
  name: 'App',
  components: {
    Header,
    BarChart,
    Footer
  },
  data() {
    return {
      excel_data: [],
      excel_label_km: "",
      excel_label_euro: "",
    }
  },
  mounted() {
    let vue = this

    axios
    .get("https://opensheet.elk.sh/1a2yS9TPY41GozC2RsiwIWvg-d3K4MksKZToq5opj-D8/Sheet1")
    .then(function(response) {
      vue.excel_data = response.data
      vue.excel_label_km = Object.keys(vue.excel_data[0])[2]
      vue.excel_label_euro = Object.keys(vue.excel_data[0])[3]
    });
   }
}
</script>