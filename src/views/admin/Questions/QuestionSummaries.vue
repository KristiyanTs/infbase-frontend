<template>
  <section>
    <h2>Courses</h2>
    <table class="table">
      <thead>
      <th scope="col" class="w-50">Name</th>
      <th scope="col">Questions Asked</th>
      <th scope="col">Votes</th>
      </thead>
      <tbody v-for="course in course_stats">
      <tr>
        <td><router-link :to="{ name: 'faq_index', params: { course: course }}" >{{course.name}}</router-link></td>
        <td>{{course.count}}</td>
        <td>{{course.vote_count}}</td>
      </tr>
      </tbody>
    </table>
    <h2>Tags</h2>
    <table class="table">
      <thead>
      <th scope="col" class="w-50">Name</th>
      <th scope="col">Questions Asked</th>
      <th scope="col">Votes</th>
      </thead>
      <tbody v-for="tag in tag_stats">
      <tr>
        <td><router-link :to="{ name: 'faq_index', params: { tag: tag }}" >{{tag.name}}</router-link></td>
        <td>{{tag.count}}</td>
        <td>{{tag.vote_count}}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
  import QuestionList from "../../components/QuestionList";

  export default {
    components: {
      QuestionList
    },
    data() {
      return {
        course_stats: [],
        tag_stats: [],
      }
    },
    mounted: function () {
      let self = this;
      this.axios.get("/api/courses/stats").then(function (response) {
        self.course_stats = response.data;
      });
      this.axios.get("/api/topics/stats").then(function (response) {
        self.tag_stats = response.data;
      });
    }
  };
</script>
