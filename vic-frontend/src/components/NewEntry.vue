<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          How good were you this time?
        </h1>
        <h2 class="subtitle">
          Let me know your performances and I'll compute them with your previous ones.
        </h2>
      </div>
    </div>
    <div class="is-grouped">
      <button class="button" @click="addEntry()">Add</button>
      <button class="button is-text" @click="$router.go(-1)">Cancel</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewEntry',
  methods: {
    addEntry: function () {
      // Add entry to db and store
      this.$router.push('/overview')
      this.$snackbar.open({
        message: 'Entry has been added',
        type: 'is-link',
        position: 'is-top',
        actionText: 'New one',
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
