var express = require('express'),
//express
    app = require('express')(),
//serveur http
    http = require('http').Server(app),
//socketio
    io = require('socket.io')(http),

    jeuxmulti = require('../app.js'),
//
    interupteurInterval = false,
    //stocker les sockets
    connections = [];



exports.Connection = function  (socket) {


  var express = require('express'),
//express
    app = require('express')(),
//serveur http
    http = require('http').Server(app),
//socketio
    io = require('socket.io')(http),

    jeuxmulti = require('../app.js'),
//
    interupteurInterval = false;
    


        
  console.log('je passe ici:::::::::::::::::::')
//prevenir le client de la connection avec le server
  socket.emit('connected')
//chargement du jeux
  socket.on('lancerlejeux', function(data) {

    var largeurtotal = data.largeur,
        hauteurtotal = data.longueur,
        toptotal = data.top,
        lefttotal = data.left,
        id = data.id;

    var clear = function(arg) {
          clearInterval(arg)
    };
    var interval = function() {
          interupteurInterval = true;
          setInterval(function() {
          
          socket.broadcast.emit('miseaJourAffichage', jeuxmulti.totaldata)
        }, 20);
    };
    var interval2 = function() {
          setInterval(function() {
          jeuxmulti.totaldata
          io.emit('miseaJourAffichage', totaldata)
        }, 20);
    };
    
    jeuxmulti.Jeux(largeurtotal, hauteurtotal, toptotal, lefttotal, id);
    socket.emit('Affichage', jeuxmulti.totaldata);
    jeuxmulti.Jeux2(largeurtotal, hauteurtotal, toptotal, lefttotal);
    

    console.log('a user connected');
    //socket.on('chat message', function(msg){
    //io.emit('chat-message', msg);
    //console.log('message: ' + msg);
    if (interupteurInterval == false) {
      interval()
    }  
  });
//renvoyer au client la position du personnage
  socket.on('demanderpositionpersonnage', function(data, err) {
    if (err) {console.log(err)} else {console.log('VA ETRE ENVOYE => ' + data)}
    socket.emit('deplacement', {
      'y': jeuxmulti.tableaudesPersonnage[0].y,
      'x': jeuxmulti.tableaudesPersonnage[0].x
    });
  });
//enregistrer la nouvelle position du personnage
  socket.on('bougerpersonnage', function(data, err) {
    if (err) {
      console.log(err)
    }
    console.log(data)
      jeuxmulti.tableaudesPersonnage[0].y = data.y,
      jeuxmulti.tableaudesPersonnage[0].x = data.x
  });

  socket.on('bougerprojectile', function(data) {
    console.log('ok')
    jeuxmulti.creerProjectile(data);
  });

  if (jeuxmulti.interval2 && jeuxmulti.interval) {
    jeuxmulti.clear(jeuxmulti.interval2)
    jeuxmulti.clear(jeuxmulti.interval)
  }
};

