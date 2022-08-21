import Charts from "./pages/Charts.vue"
import Tables from "./pages/Tables.vue"
import Stats from "./pages/Statistics.vue"

export default [
	{
		path: '/',
		component: Charts
	},
	{
		path: '/tables',
		component: Tables
	},
	{
		path: '/stats',
		component: Stats
	}
]