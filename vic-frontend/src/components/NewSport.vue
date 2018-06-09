<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Starting a new sport?
        </h1>
        <h2 class="subtitle">
          I can handle it too, with just few information.
        </h2>
      </div>
    </div>
    <div class="is-grouped">
      <button class="button" @click="addSport()">Add</button>
      <button class="button is-text" @click="$router.go(-1)">Cancel</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewSport',
  methods: {
    addEntry: function () {
      // Add entry to db and store
      this.$router.push('/overview')
      this.$snackbar.open({
        message: 'New sport has been added',
        type: 'is-link',
        position: 'is-top',
        actionText: 'New entry',
        onAction: () => {
          this.$router.push('/newentry')
        }
      })
    }
  }
}
</script>

<style>

</style>
