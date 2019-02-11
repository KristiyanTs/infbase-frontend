<template>
    <section class="section">
        <div class="container">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <h2>Ask a Question</h2>
                <form>
                    <BaseInput placeholder="Question Title"></BaseInput>
                    <textarea class="form-control" rows="3" placeholder="Question Body"></textarea>
                    <br/>
                    <BaseCheckbox v-model="form_data.anonymous">Ask Anonymously</BaseCheckbox>
                    <br/>
                    <v-select style="width: 100%" label="name" :options="courses" v-model="form_data.course"></v-select>
                    <br/><br/>
                    <v-select style="width: 100%" label="name" :options="tags" v-model="form_data.tags" multiple taggable></v-select>
                    <br/><br/>
                    <base-button block type="primary">Submit</base-button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
  import BaseInput from "../../components/BaseInput";
  import BaseCheckbox from "../../components/BaseCheckbox";

  export default {
    name: "faq_ask",
    components: {
      BaseInput,
      BaseCheckbox
    },
    data(){
      return{
        courses: [],
        tags: [],
        form_data: {
          anonymous: false,
          tags: [],
          course: null,
        }
      }
    },
    mounted: function(){
      this.getOptions();
    },
    methods:{
      getOptions: function(){
        let v = this;
        this.axios.get("/api/courses").then(function (response) {
          v.courses = response.data;
        });
        this.axios.get("/api/topics").then(function (response) {
          v.tags = response.data;
        });
      }
    }
  };
</script>
