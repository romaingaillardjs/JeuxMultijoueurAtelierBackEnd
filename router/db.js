
var express = require('express');
var app = require('express')();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var state = {
  db: null,
};
var tools = require('./tools');
app.use('/public', express.static(__dirname + '/public'));

exports.connect = function(url, done) {
  if (state.db) {
    return done();
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.accueil = function(req, res, next) {
  state.db.collection('users').find().sort({
    date: -1
  }).limit(10).toArray(function(err, data) {
      for (var i = 0; data[i]; i++) {
        data[i].date = tools.dateHeure(data[i].date);
      }
      res.sendfile('public/index.html');
  });
};

exports.getcontact = function  (req, res, next) {
state.db.collection('users').find().toArray(function(err, data) {
      console.log(data)
      res.json({
        articles: data
      });
    });
};

exports.getparties = function  (req, res, next) {
state.db.collection('parties').find().toArray(function(err, data) {
      console.log(data)
      res.json({
        articles: data
      });
    });
};

exports.addPartie = function  (req, res, next) {
  if (req.body.corps.name) {
    state.db.collection('parties').find({
      "corps.name": req.body.corps.name
    }, function(err, doc) {
      if (err) {
        res.send('nom deja pris');
      } else {
        state.db.collection('parties').insert({
          corps: req.body.corps
        })
      }
    })
  } 
  collection.find().toArray(function(err, data) {
    console.log(data)
    res.json({
      articles: data
    });
  });
}  
exports.makeObjectId = function(idGet) {
  idGet = new objectId(idGet);
  return idGet;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      if (err) {
        done(err);
      }
    });
  };
};