<template>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Overview
          </h1>
          <h2 class="subtitle">
            <b v-if="this.$store.state.user">{{this.$store.state.user.name}}</b>, here is a summary of all your registered performances.
          </h2>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child notification is-light">
            <p class="title"> 0 </p>
            <div class="content">
              Sessions
            </div>
          </div>
          <div class="tile is-child notification is-light">
            <p class="title"> 0 </p>
            <div class="content">
              Hours spent working out
            </div>
          </div>
          <div class="tile is-child notification is-light">
            <p class="title"> 0 </p>
            <div class="content">
              Average duration of your session (hours)
            </div>
          </div>
        </div>
      </div>
      <div class="tile -is is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child notification is-light">
            <p class="title"> Last session </p>
            <div class="content">
              30/08 ; 1h57 ; cycling ; 70km
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child notification is-light">
            <p class="title"> Number of session evolution </p>
            <div class="content">
              <img src="https://bulma.io/images/placeholders/640x480.png">
            </div>
          </div>
          <div class="tile is-child notification is-light">
            <p class="title"> Duration of session evolution </p>
            <div class="content">
                <img src="https://bulma.io/images/placeholders/640x480.png">
            </div>
          </div>
          <div class="tile is-child notification is-light">
            <p class="title"> Tiredness evolution </p>
            <div class="content">
                <img src="https://bulma.io/images/placeholders/640x480.png">
            </div>
          </div>
        </div>
      </div>

      <footer class="footer"> <a @click="newEntry()">Add a new entry</a> - <a @click="newSport()">Add a new sport</a> - <a @click="logout()">Log out</a> </footer>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Overview',
  methods: {
    logout: function () {
      this.$store.commit('disconnect')
      this.$router.push('/')
    },
    newEntry: function () {
      this.$router.push('/newentry')
    },
    newSport: function () {
      this.$router.push('/newsport')
    }
  },
  mounted: function () {
    axios.get('http://localhost:5000/listSports')
      .then(res => {
        this.$store.commit('setSports', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:5000/listEntries/' + this.$store.state.user.name)
      .then(res => {
        this.$store.commit('setUserEntries', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:5000/listSports/' + this.$store.state.user.name)
      .then(res => {
        this.$store.commit('setUserSports', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
