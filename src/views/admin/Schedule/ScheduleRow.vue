<template>
	<tr class="row">
		<td class="col-1">{{ hour.start }}</td>
		<td class="col" v-for="day in range" :key="day.join('.')" >
			<SessionSlot :hour="hour" :day="day" :session_prop="findSession(day.join('.'))" :tutors="tutors" />
		</td>
		<td class="col-1"></td>
	</tr>
</template>

<script>
	import SessionSlot from './ScheduleRowSlot';

	export default {
		components: {
			SessionSlot
		},
		props: {
			sessions: {
				type: Array,
				default: () => [],
				description: "Array of the sessions objects."
			},
			range: {
				type: Array,
				default: () => [],
				description: "Day range to show"
			},
			hour: {
				type: Object,
				default: () => {},
				description: "What time to show"
			},
			tutors: {
				type: Array,
				default: () => [],
				description: "Array of the available tutors"
			}
		},
		methods: {
			findSession (day) {
				let hour_id = this.hour.id;

				return this.sessions.find(session => 
					session.hour_id == hour_id && 
					session.start_date == day
				);
			}
		}
	}
</script>

<style scoped>
	table tbody tr:first-child td {
		margin-top: 10px;
	}
</style>
