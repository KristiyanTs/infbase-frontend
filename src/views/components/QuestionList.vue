<template>
    <section class="section section-lg">
        <div class="container">
            hey
        </div>
    </section>
</template>
<script>
export default {
  mounted: function(){
    this.fetchData()
  },
  methods:{
    fetchData: function() {
      this.axios.get('/api/questions').then(function(response){
        console.log(response)
      });
      console.log("im loaded now")
    }
  }
};
</script>
<style>
</style>
