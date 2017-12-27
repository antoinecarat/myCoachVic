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
    	'current':{name: null, type:null},
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
    addMetric: function () {
            this.newSport.metrics.push({
            	name: this.newSport.current.name,
            	type: this.newSport.current.type
            });
    },
    clearMetric: function () {
    	this.newSport.current.name=null;
    	this.newSport.current.type=null;
    },
    submitNewSport: function () {
    	console.log(JSON.stringify(this.newSport));
    	//TODO: Send newSport to DB.
    },
    clearNewSport: function () {
    	this.newSport.name=null;
    	this.newSport.current.name=null;
    	this.newSport.current.type=null;
    	this.newSport.metrics=[];
    }
  }
})