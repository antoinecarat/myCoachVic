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
            <select v-model="selectedSport" @change="bindSport()">
              <option>None</option>
              <option v-for="sport in availableSports">{{sport.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="jdoe" :class="{'is-danger': sportAlreadyExists}" v-model="name" readonly v-if="existingSportSelected"/>
          <input class="input" type="text" placeholder="jdoe" :class="{'is-danger': sportAlreadyExists}" v-model="name" v-else/>
        </div>
        <p class="help is-danger" v-if="sportAlreadyExists">This sport does exists: <a @click="">Add</a></p>
      </div>
      <div class="field">
        <label class="label">Metrics</label>

      </div>
      <div class="is-grouped">
        <button class="button" @click="addSport()">Add</button>
        <button class="button is-text" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewSport',
  data: function () {
    return {
      name: '',
      selectedSport: 'None',
      existingSportSelected: false,
      wholeSports: []
    }
  },
  methods: {
    bindSport: function () {
      if (this.selectedSport !== 'None') {
        this.existingSportSelected = true
        this.name = this.selectedSport
      } else {
        this.existingSportSelected = false
        this.name = ''
      }
    },
    addSport: function () {
      // Add to store if already exists, add to db+store if not
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
    }
  },
  computed: {
    sportAlreadyExists: function () {
      return this.availableSports.filter(value => {
        return value.name === this.name;
      }, this).length > 0
    },
    availableSports: function() {
      return this.wholeSports.filter(value => {
        return !this.$store.state.sports.includes(value)
      }, this)
    }
  },
  mounted: function () {
    /* axios.get('http://localhost:5000/listSports/')
      .then(res => {
        this.availableSports = res.data
      })
      .catch(err => {
        console.log(err);
      }) */
    this.wholeSports = [{name: 'Rugby'}, {name: 'Cycling'}, {name: 'Bouldering'}, {name: 'Handball'}]
  }
}
</script>

<style>

</style>
