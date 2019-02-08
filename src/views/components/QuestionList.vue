<template>
    <section class="section section-lg">
        <div class="container" v-for="question in questions">
            <question-list-item question="question"></question-list-item>
        </div>
    </section>
</template>
<script>
  import QuestionListItem from './QuestionListItem'

  export default {
    components: {
      QuestionListItem
    },
    mounted: function () {
      this.fetchData()
    },
    data: {
      questions: []
    },
    methods: {
      fetchData: function () {
        let v = this;
        this.axios.get('/api/questions').then(function (response) {
          console.log(response);
          v.data.questions = response;
        });
        console.log("im loaded now")
      }
    }
  };
</script>
<style>
</style>
