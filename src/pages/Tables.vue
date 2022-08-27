<template>
	<div class="mb-32 p-8">
    <select v-model="monthNumber" v-on:change="changeTable()" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0">
      <option 
        v-for="(month) in data.months" 
        :key="month.id" 
        :value="month.id"
        :selected="monthNumber == month.id">
        {{ month.name }}
      </option>
    </select>

    <select v-model="yearNumber" v-on:change="changeTable()" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0">
      <option 
        v-for="(year) in data.years" 
        :key="year" 
        :value="year"
        :selected="yearNumber == year">
        {{ year }}
      </option>
    </select>

    <div class="mt-8 border rounded-lg overflow-hidden">
      <div class="h-96 overflow-y-scroll">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50 capitalize">
            <tr>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
              v-for="(label, index) in data.labels" :key="index">
                {{ label }}
              </th>                                         
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
            v-for="(row, index) in data.tableValues" :key="index" :id="row.id">
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row.attributes.date }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row.attributes.orders }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row.attributes.money }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row.attributes.kilometers }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <span class="cursor-pointer hover:text-indigo-600" v-on:click="deleteRow(index, row.id)">
                  <i class="text-lg fa-solid fa-trash-can"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
	</div>
</template>

<script>
	import axios from 'axios';
	import store from '../store/store'
  import qs from 'qs'

	export default {
		name: "AppTables",
		data() {
			return {
        monthNumber: new Date().getMonth() + 1,
        yearNumber: new Date().getFullYear(),
        data: {
          labels: [],
          months: [
            {
              id: 1,
              name: "January",
            },
            {
              id: 2,
              name: "February",
            },
            {
              id: 3,
              name: "March",
            },
            {
              id: 4,
              name: "April",
            },
            {
              id: 5,
              name: "May",
            },
            {
              id: 6,
              name: "June",
            },
            {
              id: 7,
              name: "July",
            },
            {
              id: 8,
              name: "August",
            },
            {
              id: 9,
              name: "September",
            },
            {
              id: 10,
              name: "October",
            },
            {
              id: 11,
              name: "Novembre",
            },
            {
              id: 12,
              name: "December",
            }
          ],
          years: [],
          tableValues: []
        },
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
    mounted() {
			if(this.jwt != null) {        
        this.getTables()
			}        
		},
    methods: {
      deleteRow: function(rowIndex, lineIndex) {
        this.data.tableValues.splice(rowIndex, 1)
        axios
          .delete(process.env.VUE_APP_DATABASE_URL +  "/api/lines/" + lineIndex, {
						headers: { 
							'Authorization': 'Bearer ' + this.jwt
						}
          })    
			},
      changeTable: function() {
        this.getTables(this.monthNumber, this.yearNumber)
      },
      uniq: function (a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
      },
      getTables: function(month, year) {
        let tablesQuery

        if(month == null && year == null) {
          tablesQuery = qs.stringify({
            filters: {
              user_id: {
                $eq: this.user.id,
              },
            },
            populate: '*',
          })
        } else {
          tablesQuery = qs.stringify({
            filters: {
              user_id: {
                $eq: this.user.id
              },
              monthNumber: {
                $eq: month
              },
              yearNumber: {
                $eq: year
              }
            },
            populate: '*',
          })          
        }


				axios
					.get(process.env.VUE_APP_DATABASE_URL +  `/api/tables?${tablesQuery}`, {
						headers: { 
							'Authorization': 'Bearer ' + this.jwt
						}
					})
					.then(response => {
            if(response.data.data.length > 1) {
              response.data.data.map(element => {
                if(element.attributes.monthNumber == this.monthNumber) {
                  this.getTableLines(element.id)
                }
              });
              this.data.years = this.uniq(response.data.data.map(a => a.attributes.yearNumber))
            } else {
              if(response.data.data.length > 0) {
                this.getTableLines(response.data.data[0].id)
              } else {
                this.data.tableValues = []
              }
            }
					})
      },
      getTableLines: function(id) {        
        let linesQuery = qs.stringify({
          filters: {
            table_id: {
              $eq: id,
            },
          },
          populate: '*',
        })

				axios
					.get(process.env.VUE_APP_DATABASE_URL +  `/api/lines?${linesQuery}`, {
						headers: { 
							'Authorization': 'Bearer ' + this.jwt
						}
					})
					.then(response => {
            this.data.labels = Object.keys(response.data.data[0].attributes).filter(function(value) {
              if(value == "orders" || value == "kilometers" || value == "money" || value == "date" )
                return value;
            })
            this.data.labels = new Array(this.data.labels[2], this.data.labels[0], this.data.labels[1], this.data.labels[3])
            this.data.tableValues = response.data.data
					})        
      }
    }  
	}
</script>