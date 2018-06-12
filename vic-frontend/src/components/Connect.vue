<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Nice to see you again!
        </h1>
        <h2 class="subtitle">
          As usual, login + password and there you go.
        </h2>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="jdoe" :class="{'is-danger': pseudoDoesntExist, 'is-loading': checkingPseudo}" v-model="name"/>
        </div>
        <p class="help is-danger" v-if="pseudoDoesntExist">This username doesn't exist: <a @click="$router.push('/register')">Register</a></p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="••••••••••" :class="{'is-danger': wrongPwd, 'is-loading': checkingPwd}" v-model="pwd"/>
        </div>
        <p class="help is-danger" v-if="wrongPwd">Wrong password: <a @click="$router.push('/register')">Reset</a></p>
      </div>
      <div class="is-grouped">
        <button class="button" @click="connect()">Connect</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Connect',
  data: () => {
    return {
      name: '',
      pwd: '',
      pseudoDoesntExist: false,
      checkingPseudo: false,
      wrongPwd: false,
      checkingPwd: false
    }
  },
  methods: {
    connect: function () {
      this.checkingPseudo = true
      axios.get('http://localhost:5000/getUser/' + this.name)
        .then(res => {
          this.checkingPseudo = false
          // Check pwd
          this.$store.commit('connect', res.data)
          this.$router.push('/overview')
        })
        .catch(err => {
          console.log(err)
          this.checkingPseudo = false
          this.pseudoDoesntExist = true
        })
    }
  }
}
</script>

<style>

</style>
