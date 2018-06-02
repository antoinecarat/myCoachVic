<template>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Hi, I'm Vic!
          </h1>
          <h2 class="subtitle">
            I'll help you manage all your sport performances.
          </h2>
        </div>
      </div>
      <div class="is-grouped">
        <button class="button" @click="$router.push('/connect')">Connect</button>
        <button class="button" @click="$router.push('/register')">Register</button>
      </div>
  </section>
</template>

<script>

export default {
  name: 'HelloWorld'
}
</script>

<style>

</style>
