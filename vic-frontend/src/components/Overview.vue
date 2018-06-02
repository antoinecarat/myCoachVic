<template>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Overview
          </h1>
          <h2 class="subtitle">
            <b>{{this.$store.state.user.name}}</b>, here is a summary of all your registered performances.
          </h2>
        </div>
      </div>

      <!-- Summary -->
      <footer> <a @click="logout()">Log out</a> </footer>
  </section>
</template>

<script>
export default {
  name: 'Overview',
  methods: {
    logout: function () {
      this.$store.commit('disconnect')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
