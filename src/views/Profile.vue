<template>
  <div class="container col-lg-6 col-xs-10 col-md-8 py-5">
    <card shadow class="card-profile mt-5">
      <h3>Profile</h3>
      <label for="avatar">Avatar</label>
      <img :src="user.avatar" alt="" />
      <my-upload
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        :headers="header"
        url="/api/signup"
        method="put"
        field="user[avatar]"
        lang-type="en"
        img-format="png">
      </my-upload>
      <img :src="imgDataUrl">
      <br /><br />
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
      <base-button type="primary" class="float-right mt-3" @click="submit">
        Update
      </base-button>
    </card>
  </div>
</template>
<script>
import myUpload from "vue-image-crop-upload";
export default {
  components: {
    myUpload
  },
  data() {
    return {
      show: true,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "", // the datebase64 url of created image
      user: null,
      first_name: null,
      last_name: null,
      biography: null,
      header: { Authorization: window.$cookies.get("jwt") }
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
        this.avatar = this.user.avatar;
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
            biography: this.biography,
            avatar: {
              name: "avatar",
              contents: this.imgDataUrl
            }
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
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    },
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
  }
};
</script>
