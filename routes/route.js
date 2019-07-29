const model = require('../Controller/controller.cuisinier');
    // app.get('/register/:id', notes.findOne);

var express = require('express')
var app = express.Router();
    
//nante    
app.post('/register', model.creerRegister);
    app.get('/register', model.findAll);
    app.post('/login', model.login);
    app.post('/cuisinier/:_id',model.seulMonCuisinier);
    app.get('/cuisinier/:_id',model.getAtelier)
    app.get('/',model.auth);
//publish


    const pers = require('../Controller/controller.atelier');
    app.post('/profil', pers.create);
    app.get('/profil', pers.findAll);


    app.get('/profil/:_id', pers.imgAtelier);
    app.post('/profil/:_id',pers.monAtelier);
    //app.get('/atelier',pers.getAtelier)


    app.get('/profil/:profilId', pers.findOne);
    app.get('/user/:photo_profil', pers.lireImage);

    //chekbox
    app.get('/ateliermasquer/:_id',pers.atelierMasquer);
    app.get('/atelierafficher/:_id',pers.atelierAfficher)

    //update
    app.put('/putAtelier/:_id',pers.update)


    const particulier = require("../Controller/controller.particulier");
    app.post('/particulier/:_id',particulier.createParticulier)

module.exports = app; 