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
      <input type="text" v-model="name"/>
      <button class="button" @click="register()">Register</button>
      <button class="button is-text" @click="$router.go(-1)">Cancel</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data: () => {
    return { name: 'pouet' }
  },
  methods: {
    register: function () {
      // Add new user in db
      axios.get("http://localhost:5000/getUser/" + this.name)
      .then( res => {
        this.$store.commit('connect', res.data)
      })
      .catch( err => {
        this.$store.commit('connect', { name: 'jdoe'} )
      })
      this.$router.push('/overview')
    }
  }
}
</script>

<style>

</style>
