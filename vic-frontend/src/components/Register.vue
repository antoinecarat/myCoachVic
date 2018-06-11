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
    <div class="form">
      <input type="text" class="input" :class="{'is-danger': pseudoAlreadyExists, 'is-loading': checkingPseudo}" v-model="name"/>
      <p class="help is-danger" v-if="pseudoAlreadyExists">This username is already used: <a @click="$router.push('/connect')">Connect</a></p>
      <div class="is-grouped">
        <button class="button" @click="register()">Register</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </div>
  </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data: () => {
    return {
      name: '',
      pseudoAlreadyExists: false,
      checkingPseudo: false
    }
  },
  methods: {
    register: function () {
      this.checkingPseudo = true
      axios.get('http://localhost:5000/getUser/' + this.name)
        .then(res => {
          this.checkingPseudo = false
          this.pseudoAlreadyExists = true
        })
        .catch(err => {
          console.log(err)
          this.checkingPseudo = false
          axios.post('http://localhost:5000/addUser', {name: this.name})
            .then(res => {
              console.log(res.data)
              this.$store.commit('connect', res.data)
              this.$router.push('/overview')
            })
        })
    }
  }
}
</script>

<style>

</style>
