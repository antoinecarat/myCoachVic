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
    <div class="column">
      <div class="field">
        <label class="label">Pick up an existing sport</label>
        <div class="control">
          <div class="select">
            <select v-model="selection" @change="bindSport()">
              <option>None</option>
              <option v-for="sport in availableSports" :key="sport.name">{{sport.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="jdoe" v-model="name" readonly v-if="existingSportSelected"/>
          <input class="input" type="text" placeholder="jdoe" :class="{'is-danger': sportAlreadyExists}" v-model="name" v-else/>
        </div>
        <p class="help is-danger" v-if="sportAlreadyExists && !existingSportSelected">This sport does exist: <a @click="">Add</a></p>
      </div>
      <div class="field">
        <label class="label">Metrics</label>
        <ul>
          <li v-for="metric in metrics" :key="metric.name">
            {{metric.name}} ({{metric.unit}})
          </li>
        </ul>
        <button class="button is-text" @click="showModal=!showModal">Add new metric</button>
      </div>
      <div class="is-grouped">
        <button class="button" @click="addSport()">Add</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>

    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background" @click="showModal=!showModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New metric for {{this.name}}</p>
          <button class="delete" aria-label="close" @click="showModal=!showModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="name" v-model="metric"/>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button">Add</button>
          <button class="button is-text">Cancel</button>
        </footer>
      </div>
    </div>

  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewSport',
  data: function () {
    return {
      name: '',
      metric: '',
      unit: '',
      metrics: [],
      selection: 'None',
      existingSportSelected: false,
      showModal: false
    }
  },
  methods: {
    bindSport: function () {
      if (this.selection !== 'None') {
        this.existingSportSelected = true
        this.name = this.selectedSport.name
        this.metrics = this.selectedSport.metrics
      } else {
        this.existingSportSelected = false
        this.name = ''
        this.metrics = []
      }
    },
    addSport: function () {
      let newsport = {name: this.name, metrics: this.metrics}
      if (!this.$store.state.sports.includes(newsport)) {
        axios.post('http://localhost:5000/addSport', newsport)
          .then(res => {
            console.log(res.data)
          })
      }
      axios.post('http://localhost:5000/addUserSport/', {user: this.$store.state.user.name, sport: newsport.name})
        .then(res => {
          console.log(res.data)
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
        })
    }
  },
  computed: {
    selectedSport: function () {
      return this.availableSports.filter(item => {
        return item.name === this.selection
      })[0]
    },
    sportAlreadyExists: function () {
      return this.availableSports.filter(value => {
        return value.name === this.name
      }, this).length > 0
    },
    availableSports: function () {
      return this.$store.state.sports.filter(value => {
        return !this.$store.state.user.sports.map(item => item.name).includes(value.name)
      }, this)
    }
  },
  mounted: function () {
    axios.get('http://localhost:5000/listSports/')
      .then(res => {
        this.wholeSports = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  beforeRouteLeave(to, from, next){
    this.$snackbar.open({
      message: 'New sport\'s information will be lost',
      type: 'is-link',
      position: 'is-top',
      actionText: 'Leave anyway',
      onAction: () => {
        next()
      }
    })
  }
}
</script>

<style>

</style>
