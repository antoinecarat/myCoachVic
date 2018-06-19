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
    <div class="column">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="jdoe" :class="{'is-danger': pseudoAlreadyExists, 'is-loading': checkingPseudo}" v-model="name"/>
        </div>
        <p class="help is-danger" v-if="pseudoAlreadyExists">This username is already used: <a @click="$router.push('/connect')">Connect</a></p>
      </div>
      <div class="field">
        <label class="label">Age</label>
        <div class="control">
          <input class="input" type="number" min=18 max=90 v-model="age"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Size (cm)</label>
        <div class="control">
          <input class="input" type="number" min=100 max=220 v-model="size"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Weight (kg)</label>
        <div class="control">
          <input class="input" type="number" min=40 max=150 v-model="weight"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="••••••••••" :class="{'is-danger': !pwdMatch, 'is-success': pwdMatch}" v-model="pwd"/>
        </div>
        <p class="help is-danger" v-if="!pwdMatch">Passwords don't match.</p>
      </div>
      <div class="field">
        <label class="label">Confirm password</label>
        <div class="control">
          <input class="input" type="password" placeholder="••••••••••" :class="{'is-danger': !pwdMatch, 'is-success': pwdMatch}" v-model="pwd2"/>
        </div>
        <p class="help is-danger" v-if="!pwdMatch">Passwords don't match.</p>
      </div>
      <div class="block">
        <label class="label">Sports</label>
        <b-checkbox v-model="selectedSports" v-for="sport in this.$store.state.sports" :key="sport.name" :native-value="sport.name">
          {{sport.name}}
        </b-checkbox>
      </div>
      <div class="is-grouped">
        <button class="button" @click="register()">Register</button>
        <button class="button is-text" @click="$router.push('/')">Cancel</button>
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
      age: 22,
      size: 170,
      weight: 65,
      pwd: '',
      pwd2: '',
      selectedSports: [],
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
          axios.post('http://localhost:5000/addUser', {name: this.name, age: this.age, size: this.size, weight: this.weight})
            .then(res => {
              console.log(res.data)
              let sports = this.selectedSports.map(sport => {
                return axios.post('http://localhost:5000/addUserSport', {user: this.name, sport: sport})
              })
              Promise.all(sports)
                .then(values => {
                  let sports = values.map(item => {
                    let {sport, ...rest} = item
                    return sport
                  })
                  this.$store.commit('connect', res.data)
                  this.$store.commit('setUserSports', sports)
                  this.$router.push('/overview')
                })
            })
        })
    }
  },
  computed: {
    pwdMatch: function () {
      return this.pwd2 !== '' && this.pwd === this.pwd2
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
  }
}
</script>

<style>

</style>
