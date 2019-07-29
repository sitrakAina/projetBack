
const express = require('express');
//const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const Atelier = require('../models/atelier');
const Cuisinier = require('../models/User');

exports.creerRegister = (req, res) => {
    User.find().then(use =>{

    if(use.length==0){
        id=0
    }
    else{
        id=use[use.length-1]._id+1
    }

const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                _id:id,
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                specialite: req.body.specialite,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
})
};



exports.findAll = (req, res) => {
    Register.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des notes."
            });
        });
};

exports.login = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                nom: user.nom,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        id: user.id,
                                        nom: user.nom,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
};

// exports.seulMonCuisinier = (req, res) => {
//     Cuisinier.findById(req.params._id).then(user=>{
        
//         if(!user){
//             res.send("intouvable")
//         }
//         else{
//             Atelier.find().then(use=>{
//                 // const { errors, isValid } = validateRegisterInput2(req.body);
//                 var id;
//                 if(use.length==0){
//                     id=0
//                 }
//                 else{
//                     id=use[use.length-1]._id+1
//                 }
//                 // if(!isValid) {
//                 //     return res.status(400).json(errors);
//                 // }
//                 let imageFile1 = req.files.photo_profil;
//                 let nomImage = id
//                 console.log(req.files);
//                 res.setHeader('Content-Type', 'text/plain');
                
//                   imageFile1.mv(`${__dirname}/public/${nomImage}.jpg`, function(err) {
//                     if (err) {
//                       return res.status(500).send("err");
//                     }
//                                   })
                  
//                         const atelier = new Atelier({
//                             _id:id,
//                             id2:user._id,
//                             Titre: req.body.Titre,
//                             Description: req.body.Description,
//                             Date: req.body.Date,
//                             HoraireDebut: req.body.HoraireDebut,
//                             Duree: req.body.Duree,
//                             NombrePlacesDispo:req.body.NombrePlacesDispo,
//                             NombrePlacesRes:req.body.NombrePlacesRes,
//                             Prix:req.body.Prix,
//                             photo_profil:nomImage+".jpg",
//                             visibilite:true
                            
//                         });   
//                                         atelier
//                                             .save()
//                                             .then(user => {
//                                                 res.json(user)
//                                             }).catch(use=>console.log("user")
//                                             ) 
                                    
//                                 });   
//         }
     
//     })
// }


exports.seulMonCuisinier = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    Cuisinier.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Atelier.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var idautom;
                if(use.length==0){
                    idautom=0
                }
                else{
                    idautom=use[use.length-1]._id+1
                }
                let imageFile = req.files.photo_profil;
                //console.log('inona ny ato o!'+imageFile)
                let nomImage = idautom
                res.setHeader('Content-Type', 'text/plain');
        
                imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  //res.send({file:`public/${nomImage }.jpg`});
                  
                  
                });
            
                  
                        const atelier = new Atelier({
                            _id:idautom,
                            id2:user._id,
                            Titre: req.body.Titre , 
                            Description: req.body.Description,
                            Date: req.body.Date,
                            HoraireDebut: req.body.HoraireDebut,
                            Duree: req.body.Duree,
                            NombrePlacesDispo:req.body.NombrePlacesDispo,
                            NombrePlacesRes:req.body.NombrePlacesRes,
                            Prix:req.body.Prix,
                            photo_profil:'' + nomImage +'.jpg',
                            visibilite:true
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                                console.log(user);
                                                
                                            }).catch(use=>console.log(use)
                                            ) 
                                    
                                });   
        }
     
    })
}




exports.getAtelier = (req, res) => {

       
    Atelier.find().then(user=>{
        const tab=[]
        for(let i=0;i<user.length;i++){
            if(user[i].id2==req.params._id){
              tab.push(user[i])
              console.log(tab);

            }

        }
        if(tab.length>0){
            res.send(tab)
        }
        else{
            res.send([])
         } 

    })

}
   


exports.auth = passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        nom: req.user.nom,
        email: req.user.email
    });
};

