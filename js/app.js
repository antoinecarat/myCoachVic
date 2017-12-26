var app = new Vue({
  el: '#app',
  data: {
    currentTab:'home',
    currentSport: 'all',
    sports: [
    	{name:'climbing'},
    	{name:'bike'},
    	{name:'rugby'},
    	{name:'bouldering'}
    ],
    metrics: {
    	'all': [
    		{name:'nbSession'},
    		{name:'sessionDuration'}
    	],
    	'climbing': [
    		{name:'nbSession'},
    		{name:'sessionDuration'},
    		{name:'maximumRate'}
    	],
    	'bike': [
    		{name:'nbSession'},
    		{name:'sessionDuration'},
    		{name:'kmCount'}
    	],
    	'rugby': [
    		{name:'nbSession'},
    		{name:'sessionDuration'},
    		{name:'tackles'},
    		{name:'tries'}
    	],
    	'bouldering': [
    		{name:'nbSession'},
    		{name:'sessionDuration'}
    	]
    },
    newEntry: {
    	'sport': null
    }
  }
})