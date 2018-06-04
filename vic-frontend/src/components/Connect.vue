<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Nice to see you again!
        </h1>
        <h2 class="subtitle">
          As usual, login and password and there you go.
        </h2>
      </div>
    </div>
    <div class="is-grouped">
      <button class="button" @click="connect()">Connect</button>
      <button class="button is-text" @click="$router.go(-1)">Cancel</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Connect',
  methods: {
    connect: function () {
      this.$store.commit('connect', {name: 'acarat'})
      this.$router.push('/overview')
    }
  }
}
</script>

<style>

</style>
