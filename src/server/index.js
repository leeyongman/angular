const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose    = require('mongoose');
const path = require('path');
const hero = require('./model');
const root = './';
const port = process.env.PORT || '3000';

const routes = require('./routes')(app, hero);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(root, 'dist/my-app')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('dist/my-app/index.html', {root});
});

// CONNECT TO MONGODB SERVER
/*var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){ 
    console.log("Connected to mongod server");
});*/

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
}


mongoose.connect('mongodb://localhost:27017/myapp', options)
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));


app.listen(port, () => console.log(`API running on localhost:${port}`));


