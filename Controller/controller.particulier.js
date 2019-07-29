const Atelier = require('../models/atelier');
const Particulier = require('../models/particulier')

exports.createParticulier = (req,res) => {
    // Particulier.find().then(use=>{
    //     // const { errors, isValid } = validateRegisterInput(req.body);
    //     var id;
    //     if(use.length==0){
    //         id=0
    //     }
    //     else{
    //         id=use[use.length-1]._id+1
    //     }



        Particulier.find().then(us=>{

            if(us.length==0){
                id=0
            }
            else{
                id=us[us.length-1]._id+1
            }
         }
    
         )
    
    
    
    
        Particulier.findOne({
            Email: req.body.Email
        }).then(use=>{
            if(use) {
                return res.status(400).json({
                    Email: 'Email already exists'
                });
            }
            else{



       
        Atelier.findById(req.params._id).then(use=>{
                const particulier = new Particulier({
                    _id:id,
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    Telephone:req.body.Telephone,
                    Email: req.body.Email       
                    
                });
                Atelier.findByIdAndUpdate(use._id, {
                    
                    _id:use.id,
                    id2:use.id2,
                    Titre: use.Titre,
                    Description: use.Description,
                    Date: use.Date,
                    HoraireDebut: use.HoraireDebut,
                    Duree:use.Duree,
                    NombrePlacesDispo: use.NombrePlacesDispo-1,
                    NombrePlacesRes: use.NombrePlacesRes+1,
                    Prix:use.Prix,
                    photo_profil: use.photo_profil
                    // photo_profil: use.nomImage +'.jpg',
                
                }).then(upd=>console.log(upd)
                )
                                particulier
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 
                                });  
                            }       
                            
                        }); 
}