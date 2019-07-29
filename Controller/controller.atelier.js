const Atelier = require('../models/atelier');
const fs = require('fs');
const Cuisinier = require('../models/User')

//Create new profil
exports.create = (req, res) => {
    if(!req.body.Titre || !req.body.Description) {
        console.log('console.log 1 '+req.file);   
        console.log('console.log 2 '+req.body.nom);   
        return res.status(400).send({
            message: "profil content can not be empty"
            
        });
    }
    
    Atelier.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }
        
        // //images
        let imageFile = req.files.photo_profil;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = idautom
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          
        });
        
    const profil = new Atelier({   
             
        _id: idautom,
        Titre: req.body.Titre, 
        Description: req.body.Description,
        Date: req.body.Date,
        HoraireDebut: req.body.HoraireDebut , 
        Duree: req.body.Duree,
        NombrePlacesDispo: req.body.NombrePlacesDispo,
        NombrePlacesRes: req.body.NombrePlacesRes,
        Prix: req.body.Prix,
        visibilite:true,
        photo_profil:nomImage +'.jpg'
    });


    // Save p in the database
    profil.save()
    .then((data) => {
        res.send(data)

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Atelier.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};

exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./Controller/public/'+req.params.photo_profil)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}

// Find a single profil with a profilId
exports.findOne = (req, res) => {
    Atelier.findById(req.params._id)
    .then(profilchoix => {
        //console.log(unprofil) 
        if(!profilchoix) {
            return res.status(404).send({
                message: "profil not found with id" + req.params._id
            });            
        }
        else{  
            res.send(profilchoix);             
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "profil not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving profil with id " + req.params._id
        });
    });
};
exports.imgAtelier = (req, res) => {
       
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

    Atelier.find().then(produit=>{
        for(let i=0;i<produit.length;i++){
          router.get("/public/"+produit[i].photo_profil,(req,res)=>{
              var fs = require("fs")
             console.log( "./Controller/public/"+produit[i].photo_profil);
             
             var image= fs.readFileSync("./Controller/public/"+produit[i].photo_profil)
    res.send(image)
          })
        }
    })
          
}


exports.monAtelier = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    Cuisinier.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Profile.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var id;
                if(use.length==0){
                    id=0
                }
                else{
                    id=use[use.length-1]._id+1
                }
                // if(!isValid) {
                //     return res.status(400).json(errors);
                // }
                let imageFile1 = req.files.photo_profil;
                console.log(req.files);
                
                  imageFile1.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
                    if (err) {
                      return res.status(500).send("err");
                    }
                                  })
                  
                        const atelier = new Atelier({
                            _id:id,
                            id2:user._id,
                            Titre: req.body.Titre,
                            Description: req.body.Description,
                            Date: req.body.Date,
                            HoraireDebut: req.body.HoraireDebut,
                            NombrePlacesDispo:req.body.NombrePlacesDispo,
                            NombrePlacesRes:req.body.NombrePlacesRes,
                            Prix:req.body.Prix,
                            photo_profil:nomImage+".jpg",
                            visibilite:true
                           
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                            }).catch(use=>console.log(user)
                                            ) 
                                    
                                });   
        }
     
    })
}

exports.atelierMasquer = (req,res)=>{
// router.get("/ateliermasquer/:_id",(req,res)=>{
  
    Atelier.findOneAndUpdate({_id:req.params._id}, { 
        visibilite:false
    
    },{new:true}).then(upd=>res.send(upd)
    )

}

exports.atelierAfficher = (req,res) => {
// router.get("/atelieraffichier/:_id",(req,res)=>{
    Atelier.findOneAndUpdate({_id:req.params._id}, {
        visibilite:true
    
    },{new:true}).then(upd=>res.send(upd)
    )
}
   

exports.update = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.nom)
    if(!req.body.Titre || !req.body.Description) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params._id)
    let imageFile = req.files.photo_profil;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = req.params._id
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Atelier.findByIdAndUpdate(req.params._id, {
        Titre: req.body.Titre, 
        Description: req.body.Description,
        Date: req.body.Date,
        HoraireDebut: req.body.HoraireDebut , 
        Duree: req.body.Duree,
        NombrePlacesDispo: req.body.NombrePlacesDispo,
        NombrePlacesRes: req.body.NombrePlacesRes,
        Prix: req.body.Prix,
       // photo_profil:nomImage +'.jpg'
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params._id
        });
    });
};