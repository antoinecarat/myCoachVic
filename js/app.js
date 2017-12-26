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
    chartKinds: [
    	{name:'nbSession_total'},
    	{name:'nbSession_monthAVG'},
    	{name:'nbSession_weekAVG'},
    	{name:'nbSession_totalAVG'}
    ]
  }
})