<template>
  <div class="container">
    <div class="row">
      <h3>{{question.title}}</h3>
    </div>
    <div class="row">
      <div class="tags" v-for="topic in question.topics">
        <a href="#" class="badge badge-pill badge-primary">{{topic.name}}</a>
      </div>
    </div>
    <div class="row">
      <div class="votes col-md-1">
        <div class="mini-counts"><span>{{question.votes}}</span></div>
        <div>{{question.votes | pluralize('vote') }}</div>

        <button type="button" class="btn btn-outline-default " v-if="!question.voted" v-on:click="upvote"><i class="fa fa-plus">1</i>
        </button>
        <button type="button" class="btn btn-success" v-else v-on:click="remove_vote"><i class="fa fa-check"></i></button>
      </div>
      <div class="col-md-8">
        {{question.body}}
      </div>
    </div>
    <div class="row question-end">
      <div class="col-md-1"></div>
      <div class="col-md-8">
        {{question.created_at | moment("MMM Do YYYY")}}
      </div>
    </div>

    <div v-if="question.answers.length">
      <div v-for="answer in question.answers">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col">
            {{answer.body}}
          </div>
        </div>
        <div class="row answer">
          <div class="col-md-1"></div>
          <div class="col">
            {{answer.created_at | moment("MMM Do YYYY")}}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-1">Your Answer:</div>
        <div class="col">
          <textarea style="min-width: 100%"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col">
          <base-button>Submit</base-button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: "question-detail",
    props: {
      question_id: String
    },
    data() {
      return {
        question: {}
      }
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      upvote: function () {
        this.question.votes += 1;
        this.question.voted = true;
        this.axios.post('/api/questions/' + this.question_id + '/vote_for' )
      },
      remove_vote: function () {
        this.question.votes -= 1;
        this.question.voted = false;
        this.axios.post('/api/questions/' + this.question_id + '/remove_vote')
      },
      fetchData: function () {
        let v = this;
        this.axios.get('/api/questions/' + this.question_id ).then(function (response) {
          v.question = response.data;
        });
      }
    }
  };
</script>
<style>
  .tags {
    line-height: 18px;
    float: left;
  }

  .votes {
    display: block;
    flex-direction: column;
    align-items: center;
    min-width: 5em;
    float: left;
  }

  .question-end {
    padding-bottom: 5px;
    border-bottom: 1px solid;
  }

  .answer {
    border-bottom: 1px solid;
  }
</style>
