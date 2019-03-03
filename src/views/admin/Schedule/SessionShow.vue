<template>
  <modal
    :show.sync="modal"
    class="text-left"
    @close="closeModal"
    modalClasses="wide"
  >
    <h6 slot="header" class="modal-title" id="modal-title-default">
      Session
    </h6>

    <div class="row">
      <div v-if="tutor" class="col">
        <div class="text-center avatar-image">
          <img :src="tutor.avatar" class="rounded-circle" alt="" />
        </div>
        <h3 class="text-center">
          {{ tutor.first_name }}
        </h3>
        <h5 class="text-center text-muted">
          {{ tutor.biography }}
        </h5>
        <div class="text-center">
          <badge
            type="success"
            v-for="(course, idx) in session_prop.courses"
            :key="idx"
          >
            {{ course }}
          </badge>
        </div>
      </div>
      <div class="col text-center" v-if="session_prop">
        <h1>{{ hour_prop.start }} - {{ hour_prop.end }}</h1>
        <h4 class="text-muted">
          {{ toFormattedDate(session_prop.start_date.split(".")) }}
        </h4>
        <h4 class="text-muted">
          7.03 Appleton Tower
        </h4>
      </div>
    </div>

    <template slot="footer" class="text-center">
      <base-button type="primary" @click="closeModal">
        Ask in advance
      </base-button>
      <base-button type="secondary" @click="closeModal">
        Interested/Going
      </base-button>
      <base-button type="link" class="ml-auto" @click="closeModal">
        Close
      </base-button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  components: {
    Modal
  },
  props: {
    session_prop: {
      type: Object,
      default: () => {},
      description: "Session opened"
    },
    tutors: {
      type: Array,
      default: () => [],
      description: "Array of all tutors"
    },
    day_prop: {
      type: Array,
      default: () => [],
      description: "Date of the session slot"
    },
    hour_prop: {
      type: Object,
      default: () => {},
      description: "Hour object of the session slot"
    },
    modal: {
      type: [String, Boolean],
      default: false,
      description: "Whether the modal is opened"
    }
  },
  data() {
    return {
      errors: null,
      session: this.session_prop,
      tutor: null
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    toFormattedDate(date, format) {
      date = new Date(Date.UTC(date[0], date[1] - 1, date[2]));
      let options = {
        weekday: "short",
        month: "short",
        day: "numeric"
      };

      if (format == "rails") options["year"] = "numeric";

      return date.toLocaleDateString("en-UK", options);
    },
  },
  computed: {
    dayOfWeek() {
      if (this.day_prop)
        return new Date(...this.day_prop).toLocaleDateString("en-uk", {
          weekday: "long"
        });
      else return false;
    }
  },
  watch: {
    session_prop() {
      let tutor_id = this.session_prop.tutor_id;
      this.tutor = this.tutors.find(tutor => tutor.id == tutor_id);
    }
  }
};
</script>
