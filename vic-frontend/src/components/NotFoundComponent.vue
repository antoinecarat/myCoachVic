<template>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Did you get lost?
          </h1>
          <h2 class="subtitle">
            I don't know how you came to this place, but you should go back home.
          </h2>
        </div>
      </div>
      <div class="is-grouped">
        <button class="button" @click="$router.push('/overview')">Home</button>
      </div>
  </section>
</template>

<script>

export default {
  name: 'NotFoundComponent'
}
</script>

<style>

</style>
