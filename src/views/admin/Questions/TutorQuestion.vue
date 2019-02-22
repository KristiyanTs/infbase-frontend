<template>
  <section>
    <h2>Next Session Questions</h2>
    <question-list></question-list>
    <h2>Unanswered Questions</h2>
    <question-list></question-list>
  </section>
</template>
<script>
  import QuestionList from "../../components/QuestionList";

  export default {
    components: {
      QuestionList
    }
  };
</script>
