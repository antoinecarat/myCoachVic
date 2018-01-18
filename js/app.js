var app = new Vue({
  el: '#app',
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
		},
		register: function() {
			//TODO Create user on db with typedName (if not exists)
		},
		logOut: function() {
			this.currentUser=null;
		},
		setCurrentSport: function(sport) {
			this.currentSport=sport;
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
