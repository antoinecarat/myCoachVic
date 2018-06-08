const express = require('express')
const app = express();

const config = { PORT: 5000, HOSTNAME: '127.0.0.1' }

app.use('/', express.static(__dirname + '/dist'));

app.listen( config.PORT, config.HOSTNAME, () => {
  console.log( "Listening at http://%s:%s", config.HOSTNAME, config.PORT );
});

//USERS
app.get('/getUser/:pseudo', (request, response, next) => {
  console.log( "Received: %s", request.params.pseudo);
  if (request.params.pseudo === 'acarat') {
    response.send({ name: 'acarat', age: 22 })
  } else {
    response.status(404).send("Not Found")
  }
});

app.get('/listUsers', (request, response, next) => {
  return [
    { name: 'acarat', age: 22 },
    { name: 'mcherrueau', age: 23 }
  ]
});

app.post('/addUser', (request, response, next) => {
  //Check if pseudo is available and add it to db
});

//ENTRIES
app.get('/listEntries', (request, response, next) => {
  return [
    { date: '05/06/2018', sport: 'cycling', duration: 84, tiredness: 6, stats: { distance: 57 } },
    { date: '03/06/2018', sport: 'rugby', duration: 90, tiredness: 8, stats: { tackles: 83, tries: 5 } }
  ]
});

app.post('/addEntry', (request, response, next) => {
  //Add entry to db
});

//htaccess-like rewritting
app.get('*', (request, response, next) => {
  response.sendFile(__dirname + '/dist/index.html');
});
