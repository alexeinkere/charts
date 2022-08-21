<template>
	<div class="mb-32 p-8">

    <select v-model="tableIndex" class="border-gray-300 rounded-md shadow-sm focus:outline-none md:mr-4 w-full md:w-max mb-4 md:mb-0">
      <option 
        v-for="(table, index) in tables" 
        :key="index" 
        :value="index">
        {{ table.name }}
      </option>
    </select>

    <div class="mt-8 border rounded-lg overflow-hidden">
      <div class="h-96 overflow-y-scroll">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
              v-for="(label, index) in labels" :key="index">
                {{ label }}
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
            v-for="(row, index) in tableSelected.donnees" :key="index">
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row[Object.keys(row)[0]] }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row[Object.keys(row)[1]] }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row[Object.keys(row)[2]] }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">{{ row[Object.keys(row)[3]] }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                <span class="cursor-pointer hover:text-indigo-600" v-on:click="deleteRow(index)">
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

	export default {
		name: "AppTables",
		data() {
			return {
        labels: [],
        tables: [],
        tableSelected: [],
        tableIndex: 0,
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
          this.tables = response.data.tables
					this.labels = Object.keys(this.tables[0].donnees[0])
          this.tableSelected = this.tables[this.tableIndex]
          console.log(this.tableSelected)
        })      
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
      deleteRow: function(i) {
				this.tableSelected.donnees.splice(i, 1)
        axios
          .put(process.env.VUE_APP_DATABASE_URL +  "/api/tables/" + this.tableSelected.id, {
            "data": {
              "donnees": this.tableSelected.donnees
            },
          })
          .then(response => {
            console.log(response)
          })          
			}
    }  
	}
</script>