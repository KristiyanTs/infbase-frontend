<template>
	<div>
		<h4 class="text-primary mb-5">Reports</h4>

		<div v-if="errored">
			<p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
		</div>
		<table v-else class="table table-hover">
			<thead>
				<tr class="row">
					<th class="col-2">Status</th>
					<th class="col-5">Date</th>
					<th class="col-5">Students</th>
				</tr>
			</thead>
			<div v-if="loading" class="p-5">
				<p>Loading...</p>
			</div>
			<tbody v-else>
				<ReportRow v-for="report in reports" :key="report.id" :report_prop="report" @clicked="openReport"/>
			</tbody>
		</table>

	</div>
</template>

<script>
	import ReportRow from './ReportListRow';

	export default {
		components: {
			ReportRow
		},
		data () {
			return {
				reports: null,
				loading: false,
				errored: false
			}
		},
		mounted () {
			this.loading = true;

			this.axios
				.get('/api/admin/reports', {
					headers: { Authorization: window.$cookies.get("jwt") }
				})
				.then(response => {
					this.reports = response.data;
				})
				.catch(error => {
					this.errored = true;
				})
				.finally(() => this.loading = false)
		},
		methods: {
			openReport (report) {
				this.$router.push({ path: `/admin-panel/report/${report.id}` })
			}
		}
	}
</script>