<template>
	<div>
		<h4 class="text-primary mb-5 d-inline-block">Schedule</h4>
		<base-dropdown class="float-right d-inline-block">
			<base-button slot="title" type="secondary" class="dropdown-toggle">
				{{ calendar_scope }} days
			</base-button>
			<a class="dropdown-item" v-for="days in [3,5,7]" :key="days"
				 @click="calendar_scope = days">
				{{days}} days
			</a>
		</base-dropdown>
		
		<section v-if="errored">
			<p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
		</section>
		<table class="table text-center" v-else>
			<ScheduleHead :calendar_range="calendar_range" :scope="calendar_scope" @range="changeRange"/>
			<section v-if="loading">
				<p class="p-5">Loading...</p>
			</section>
			<tbody v-else>
				<ScheduleRow v-for="hour in hours" 
										:key="hour.id"
										:sessions="sessions"
										:hour="hour" 
										:range="calendar_range"
										@clicked="openModal"/>
			</tbody>
		</table>
		<ScheduleModal :tutors="tutors" 
									 :session_prop="session" 
									 :day_prop="day"
									 :hour_prop="hour"
									 :modal_prop="modal"
									 @closeModal="closeModal"/>
	</div>
</template>

<script>
	import ScheduleRow from './ScheduleRow';
	import ScheduleHead from '@/views/components/Schedule/ScheduleHead';
	import BaseDropdown from '@/components/BaseDropdown';
	import ScheduleModal from './ScheduleRowSlotModal';

	export default {
		components: {
			ScheduleRow,
			ScheduleHead,
			BaseDropdown,
			ScheduleModal
		},
		props: {
			scope: {
				type: Number,
				default: 3,
				description: "How many days to show at once"
			}
		},
		data () {
			return {
				modal: false,
				loading: true,
				errored: false,
				calendar_range: [],
				calendar_scope: this.scope,
				hours: [],
				sessions: [],
				tutors: [],
				session: null,
				day: null,
				hour: null
			}
		},
		mounted () {
			this.loading = true;

			// get tutors
			this.axios
				.get('/api/admin/users', {
					headers: { Authorization: window.$cookies.get("jwt") },
					params: {roles: ['tutor']}
				})
				.then(response => {
					this.tutors = response.data;
				})
				.catch(error => {
					this.errored = true;
				})

			// get hours
      this.axios
        .get('/api/hours', {
          headers: { Authorization: window.$cookies.get("jwt") }
        })
        .then(response => {
          this.hours = response.data;
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => this.loading = false)
		},
		methods: {
			getSessionsInRange () {
	      this.loading = true;

	      this.axios
	        .get('/api/teaching_sessions', {
	          headers: { Authorization: window.$cookies.get("jwt") },
	          params: { range: this.calendar_range }
	        })
	        .then(response => {
	          this.sessions = response.data;
	        })
	        .catch(error => {
	          this.errored = true;
	        })
	        .finally(() => this.loading = false)
			},
			changeRange (range) {
				this.calendar_range = range;
				this.getSessionsInRange();
			},
			openModal (session, day, hour) {
				[this.session, this.day, this.hour] = [session, day, hour];
				this.modal = true;
			},
			closeModal () {
				console.log('close modal 2');
				this.modal = false;
			}
		}
	}
</script>

<style scoped>
	table >>> th,
	table tr td {
	  padding: 0px;
		display: flex;
		justify-content: center; /* align horizontal */
		align-items: center; /* align vertical */
	}
</style>