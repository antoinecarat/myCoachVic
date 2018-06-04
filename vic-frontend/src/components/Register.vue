<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Nice to meet you!
        </h1>
        <h2 class="subtitle">
          Tell me a few about you and I'll manage to help you as much as I can!
        </h2>
      </div>
    </div>
    <div class="is-grouped">
      <button class="button" @click="register()">Register</button>
      <button class="button is-text" @click="$router.go(-1)">Cancel</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    register: function () {
      // Add new user in db
      this.$store.commit('connect', {name: 'acarat'})
      this.$router.push('/overview')
    }
  }
}
</script>

<style>

</style>
