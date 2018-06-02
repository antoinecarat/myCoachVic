<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Connect</p>
      </header>
      <section class="modal-card-body">
        <p>Connect</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="connect()">Connect</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </footer>
    </div>
  </div>
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
