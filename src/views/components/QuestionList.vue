<template>
  <section class="section section-lg">
    <div class="container" v-if="questions.length">
      <div class="container" v-for="question in questions">
        <question-list-item :question="question"></question-list-item>
      </div>
    </div>
    <div class="container text-center" v-else>
      There are no questions matching that query
    </div>
  </section>
</template>
<script>
  import QuestionListItem from '../../components/FAQ/QuestionListItem'

  export default {
    components: {
      QuestionListItem
    },
    mounted: function () {
      this.fetchData()
    },
    data: function () {
      return {
        questions: []
      }
    },
    methods: {
      fetchData: function () {
        let v = this;
        this.axios.get('/api/questions').then(function (response) {
          v.questions = response.data;
        });
      }
    }
  };
</script>
<style>
</style>
