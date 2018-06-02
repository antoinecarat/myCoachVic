<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$router.go(-1)"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
      </header>
      <section class="modal-card-body">
        <p>Register</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="$router.push('/overview')">Register</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style>

</style>
