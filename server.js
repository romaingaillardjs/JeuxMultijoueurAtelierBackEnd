//Démarrage
var express         = require('express'),
//express
    app             = require('express')(),
//serveur http
    http            = require('http').Server(app),
//socketio
    io              = require('socket.io')(http),
//body-parser
    bodyParser      = require('body-parser'),
//session
    session         = require('express-session'),
//cookieParser
    cookieParser    = require('cookie-parser'),
//mongoDB
    db              = require('./router/db.js'),
//outils
    tools           = require('./router/tools'),
//script du jeux 
    jeuxmulti       = require('./app.js'),
//gestion des web socket
    SocketJS        = require('./router/socketJS.js'),
//stocker les sockets
    connections     = [],
//url BDD
    URL             = 'mongodb://heroku_p5fhvcwj@ds023932.mlab.com:23932/heroku_p5fhvcwj';
//Réglages
app.use(cookieParser());
app.use(session({
  secret: '123456789SECRET',
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
//Routes - consultation

//Accueil
app.get('/', function(req, res, next) {
 db.accueil(req, res, next)
});

//ramener la liste des joueurs depuis la BDD
app.post('/DBContacts', function (req, res, next) {
  db.getcontact(req, res, next);
});

//ramener la liste des parties depuis la BDD
app.post('/DBParties', function (req, res, next) {
  db.getparties(req, res, next);
});

// ajouter une partie
app.post('/addPartie', function (req, res, next) {
  db.addPartie(req, res, next);
});

app.get('/sitemap',function(req,res){
  res.sendFile('/sitemap.html');
});
app.get('/partie/:lastname', function (req, res, next) {

  var Lastname = {lastname:req.param('lastname')};
  console.log(Lastname)
  var middleware = require('./router/jeux.js');
  app.use('/Rejoindreroom/:lastname', middleware);

  //res.sendfile('/Rejoindreroom/'+ Lastname.lastname +'');
  
});

//demarage de la connection Socket.io
//io.on('connection', function (socket){
var compteur = 0;
io.on('connection',function (socket) {
console.log('someone connected')
  SocketJS.Connection(socket);
  connections.push(socket);
    for (var i = 0 ; i < connections.length ; i++) {
      console.log(connections[i].nsp.name)
      console.log(connections[i].adapter)
      console.log(connections[i].id);
    };
//connection à la partie
    socket.on('room', function (id) {
      socket.join('room'+id)
      });
      compteur += 1; 
//arret de la connection Socket.io
    socket.on('disconnect', function () {
      var findSocket = function  (element, index, array)  {
          if (array[index].id == socket.id) 
            { 
              console.log('----------> user disconnected : ' + array[index].id)
              return (''+index+'');
            }
      }
      var Index = (connections.findIndex(findSocket));
      connections.splice(Index, 1);
        for (var i = 0 ; i < connections.length ; i++) {
        console.log(connections[i].nsp.name)
        console.log('----------> user connected : '+ connections[i].id )     
        };
    });
});
//Démarrage du serveur
db.connect(URL, function(err, db) {
  if (err) {
    return console.log('erreur');
    } else {
      http.listen(3000, function() {
      var date = new Date();
      console.log(tools.dateHeureLongue(date) + ' - Le serveur est disponible sur le port 8080');
      });
    }  
});


