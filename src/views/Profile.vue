<template>
  <div class="container col-lg-6 col-xs-10 col-md-8 py-5">
    <card shadow class="card-profile mt-5">
      <h3>Profile</h3>
      <base-input label="First name" v-model="first_name"></base-input>
      <base-input label="Last name" v-model="last_name"></base-input>
      <label for="biography">Biography</label>
      <textarea
        id="biography"
        class="form-control"
        cols="30"
        rows="10"
        label="Biography"
        v-model="biography"
      ></textarea>
      <base-button
        :disabled="noChanges"
        type="primary"
        class="float-right mt-3"
        @click="submit"
      >
        Update
      </base-button>
    </card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      first_name: null,
      last_name: null,
      biography: null
    };
  },
  beforeMount() {
    this.axios
      .get("/api/profile", {
        headers: { Authorization: window.$cookies.get("jwt") }
      })
      .then(response => {
        this.user = response.data;
        this.first_name = this.user.first_name;
        this.last_name = this.user.last_name;
        this.biography = this.user.biography;
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    submit() {
      this.axios
        .put("/api/signup", {
          headers: { Authorization: window.$cookies.get("jwt") },
          user: {
            first_name: this.first_name,
            last_name: this.last_name,
            biography: this.biography
          }
        })
        .then(response => {
          this.user = response.data;
          this.$store.commit("ADD_ALERT", [
            "Your account was successfullu updated!",
            "success"
          ]);
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  },
  computed: {
    noChanges() {
      return (
        this.user.first_name == this.first_name &&
        this.user.last_name == this.last_name &&
        this.user.biography == this.biography
      );
    }
  }
};
</script>
