var app = new Vue({
  el: '#app',
  data: {
    currentTab:'home',
    currentSport: 'all',
    sports: [
    	{name:'climbing'},
    	{name:'bike'},
    	{name:'rugby'}
    ],
    metrics: {
    	'general': [
    		{
    			name:'sessionDuration',
    			type:'number'
    		},
    		{
    			name:'tirednessLevel',
    			type:'number'
    		}
    	],
    	'climbing': [
    		{
    			name:'maximumRate',
    			type:'text'
    		}
    	],
    	'bike': [
    		{
    			name:'kmCount',
    			type:'number'
    		}
    	],
    	'rugby': [
    		{
    			name:'tackles',
    			type:'number'
    		},
    		{
    			name:'tries',
    			type:'number'
    		}
    	]
    },
    newEntry: {
    	'sport': null
    },
    newSport: {
    	'name': null,
    	'metrics': []
    }
  },
  methods: {
    submitNewEntry: function () {
    	console.log(JSON.stringify(this.newEntry));
    	//TODO: Send newEntry to DB.
    },
    clearNewEntry: function () {
    	for (var p in this.newEntry){
    		this.newEntry[p]=null;
    	}
    },
    submitNewSport: function () {
    	console.log(JSON.stringify(this.newSport));
    	//TODO: Send newSport to DB.
    },
    clearNewSport: function () {
    	for (var p in this.newSport){
    		this.newSport[p]=null;
    	}
    }
  }
})