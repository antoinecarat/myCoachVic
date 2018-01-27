//const home = {
//	props: ['message'],
//	template: '',
//	methods: {
//
//	}
//}

var app = new Vue({
  el: '#app',
	//components: {
  //  'my-component': home
  //},
  data: {
    currentTab:'home',
		currentUser: null,
		typedName: "",
		mockUser: {
			name: "acarat",
			age: 22,
			size: 170,
			weight: 64,
			sports: ["bouldering", "bike", "rugby"],
			admin: true
		},
		mockBalanceData: {
			labels: ["bouldering", "bike", "rugby"],
			series: [
		  	[30, 20, 50]
		  ]
		},
		mockChartOptions: {
			donut: true,
  		donutWidth: 20,
  		startAngle: 270,
  		total: 200
		},
		currentSport: null,
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
		newUser: {
			name: null,
			age: null,
			size: null,
			weight: null,
			sports: [],
			admin: false
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
		logIn: function() {
			//TODO Get user on db with typedName (if exists)
			this.currentUser=this.mockUser;
			Vue.nextTick(function() {
				new Chartist.Bar('#nbSessionBalance', this.getSessionBalance(this.currentUser));
				new Chartist.Bar('#timeSpentBalance', this.getTimeBalance(this.currentUser));
				new Chartist.Bar('#tirednessLevelBalance', this.getTirednessBalance(this.currentUser));
			}.bind(this));
		},
		register: function() {
			//TODO Create user on db with typedName (if not exists)
		},
		logOut: function() {
			this.currentUser=null;
		},
		getNumberofSessions: function(user, sport) {
			//TODO: Retrieve it from db regarding sport (if null -> all)
			return 10;
		},
		getTimeSpent: function(user, sport) {
			//TODO: Retrieve it from db regarding sport (if null -> all)
			return 4.5;
		},
		getTirednessLevel: function(user, sport) {
			//TODO: Retrieve it from db regarding sport.
			return 5;
		},
		getSessionBalance: function(user) {
			return this.mockBalanceData;
		},
		getTimeBalance: function(user) {
			return this.mockBalanceData;
		},
		getTirednessBalance: function(user) {
			return this.mockBalanceData;
		},
		setCurrentSport: function(sport) {
			this.currentSport=sport;
			/*Vue.nextTick(function() {
				new Chartist.Bar('#nbSessionBalance', this.getSessionBalance(this.currentUser));
				new Chartist.Bar('#timeSpentBalance', this.getTimeBalance(this.currentUser));
				new Chartist.Bar('#tirednessLevelBalance', this.getTirednessBalance(this.currentUser));
			}.bind(this));*/
		},
    submitNewEntry: function () {
    	console.log(JSON.stringify(this.newEntry));

    	this.clearNewEntry();
    },
    clearNewEntry: function () {
    	for (var p in this.newEntry){
    		this.newEntry[p]=null;
    	}
    },
    addMetric: function () {
        if (this.newSport.current.name != null && this.newSport.current.type != null && this.newSport.current.name != "" && this.newSport.current.type != ""){
         	this.newSport.metrics.push({
            	name: this.newSport.current.name,
            	type: this.newSport.current.type
            });
            this.clearMetric();
        } else {
        	window.alert("New metric's name AND type should be filled.")
        }
    },
    clearMetric: function () {
    	this.newSport.current.name=null;
    	this.newSport.current.type=null;
    },
    submitNewSport: function () {
		if (this.newSport.name != null && this.newSport.name != ""){
	    	this.clearMetric();
	    	console.log(JSON.stringify(this.newSport));
	    	//TODO: Send newSport to DB without current.
	    	this.clearNewSport();
    	} else {
        	window.alert("New sport should have a name.")
        }
    },
    clearNewSport: function () {
    	this.newSport.name=null;
    	this.clearMetric();
    	this.newSport.metrics=[];
    }
  }
})
