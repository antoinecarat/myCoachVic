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
  console.log("GET user:%s", request.params.pseudo);
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('users')
        .findOne({'name': request.params.pseudo})
        .then(data => {
          if (data) {
            let {_id, ...user} = data
            response.send(user)
          } else {
            response.status(404).send("User Not Found: " + request.params.pseudo)
          }
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/listUsers', (request, response, next) => {
  console.log("LIST users");
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('users')
        .find()
        .toArray()
        .then(data => {
          if (!data) {
            response.send([])
          } else {
            let users = data.map(item => {
              let {_id, ...user} = item
              return user
            })
            response.send(users)
          }
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/addUser', (request, response, next) => {
  waitReception(request)
    .then(bodyStr => {
      console.log('POST user:%s', bodyStr);
      MongoClient.connect(config.MONGOURL)
        .then(client => {
          let newuser = JSON.parse(bodyStr)
          client.db(config.MONGODB).collection('users').insert(newuser);
          client.db(config.MONGODB).collection('users')
            .findOne({'name': newuser.name})
            .then(data => {
              if (data) {
                let {_id, ...user} = data
                response.send(user)
              } else {
                response.status(404).send("Error while adding user: " + newuser.name)
              }
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
app.get('/listEntries/:pseudo', (request, response, next) => {
  console.log("LIST entries:%s", request.params.pseudo);
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('entries')
        .find({'user': request.params.pseudo})
        .toArray()
        .then(data => {
                if (!data) {
                  response.send([])
                } else {
                  let entries = data.map(item => {
                    let {_id, ...entry} = item
                    return entry
                  })
                  response.send(entries)
                }
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/addEntry', (request, response, next) => {
  waitReception(request)
    .then(bodyStr => {
      console.log('POST entry:%s', bodyStr);
      MongoClient.connect(config.MONGOURL)
        .then(client => {
          let newentry = JSON.parse(bodyStr)
          client.db(config.MONGODB).collection('entries').insert(newentry);
          client.db(config.MONGODB).collection('entries')
            .findOne({'name': newentry.name, 'user': newentry.user})
            .then(data => {
              if (data) {
                console.log(data);
                let {_id, ...entry} = data
                response.send(entry)
              } else {
                response.status(404).send("Error while adding entry: " + newentry.name)
              }
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

// SPORTS
app.get('/listSports', (request, response, next) => {
  console.log("LIST sports");
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('sports')
        .find()
        .toArray()
        .then(data => {
                if (!data) {
                  response.send([])
                } else {
                  let sports = data.map(item => {
                    let {_id, ...sport} = item
                    return sport
                  })
                  response.send(sports)
                }
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/listSports/:pseudo', (request, response, next) => {
  console.log("LIST sports: %s", request.params.pseudo);
  MongoClient.connect(config.MONGOURL)
    .then(client => {
      client.db(config.MONGODB).collection('usersports')
        .find({'user': request.params.pseudo})
        .toArray()
        .then(data => {
          if (!data) {
            response.send([])
          } else {
            let sports = data.map(item => {
              let sportObject = {}
              let {_id, user, sport} = item
              return client.db(config.MONGODB).collection('sports').findOne({'name': sport})
            })
            Promise.all(sports)
              .then(values => {
                let usersports = values.map(item => {
                  let {_id, ...usersport} = item
                  return usersport
                })
                response.send(usersports)
              })
          }
        })
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/addSport', (request, response, next) => {
  waitReception(request)
    .then(bodyStr => {
      console.log('POST sport:%s', bodyStr);
      MongoClient.connect(config.MONGOURL)
        .then(client => {
          let newsport = JSON.parse(bodyStr)
          client.db(config.MONGODB).collection('sports').insert(newsport);
          client.db(config.MONGODB).collection('sports')
            .findOne({'name': newsport.name})
            .then(data => {
              if (data) {
                console.log(data);
                let {_id, ...sport} = data
                response.send(sport)
              } else {
                response.status(404).send("Error while adding sport: " + newsport.name)
              }
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

app.post('/addUserSport', (request, response, next) => {
  waitReception(request)
    .then(bodyStr => {
      console.log('POST userSport:%s', bodyStr);
      MongoClient.connect(config.MONGOURL)
        .then(client => {
          let newusersport = JSON.parse(bodyStr)
          client.db(config.MONGODB).collection('usersports').insert({user: newusersport.user, sport: newusersport.sport});
          client.db(config.MONGODB).collection('usersports')
            .findOne({'user': newusersport.user, 'sport': newusersport.sport})
            .then(data => {
              if (data) {
                console.log(data);
                let {_id, ...mapping} = data
                response.send(mapping)
              } else {
                response.status(404).send("Error while adding sport: " + newusersport.sport + " to user " + newusersport.user)
              }
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

// htaccess-like rewritting
app.get('*', (request, response, next) => {
  response.sendFile(__dirname + '/dist/index.html');
});
