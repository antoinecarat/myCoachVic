const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const cors = require('cors');
const app = express();

const config = { PORT: 5000, HOSTNAME: '127.0.0.1', MONGOURL: 'mongodb://localhost:27017', MONGODB: 'vic-db' }

const waitReception = (req) => {
  return new Promise((resolve, reject) => {
    let bodyStr = "";
    req.on( "data", ( chunk ) => {
      bodyStr += chunk.toString();
    } );
    req.on( "end", () => {
      resolve(bodyStr)
    });
  })
}

app.use(cors());
app.use('/', express.static(__dirname + '/dist'));
app.listen( config.PORT, config.HOSTNAME, () => {
  console.log( "Listening at http://%s:%s", config.HOSTNAME, config.PORT );
});

// USERS
app.get('/getUser/:pseudo', (request, response, next) => {
  console.log("GET %s", request.params.pseudo);
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('users')
        .findOne({'name': request.params.pseudo})
        .then(data => {
          data ? response.send(data) : response.status(404).send("Not Found: " + request.params.pseudo)
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/listUsers', (request, response, next) => {
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('users')
        .find()
        .toArray()
        .then(data => {
          data ? response.send(data) : response.send({})
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/addUser', (request, response, next) => {
  waitReception(request)
    .then(bodyStr => {
      console.log('POST %s', bodyStr);
      MongoClient.connect(config.MONGOURL)
        .then(client => {
          client.db(config.MONGODB).collection('users').insert({name: bodyStr});
          client.db(config.MONGODB).collection('users')
            .findOne({'name': bodyStr})
            .then(data => {
              data ? response.send(data) : response.status(404).send("Not Found: " + request.params.pseudo)
            })
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// ENTRIES
app.get('/listEntries', (request, response, next) => {
  return [
    { date: '05/06/2018', sport: 'cycling', duration: 84, tiredness: 6, stats: { distance: 57 } },
    { date: '03/06/2018', sport: 'rugby', duration: 90, tiredness: 8, stats: { tackles: 83, tries: 5 } }
  ]
});

app.post('/addEntry', (request, response, next) => {
  // Add entry to db
});

// htaccess-like rewritting
app.get('*', (request, response, next) => {
  response.sendFile(__dirname + '/dist/index.html');
});
