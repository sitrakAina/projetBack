const mongoose = require('mongoose');


const commentaireSchema = mongoose.Schema({
  _id:{
    type:Number,
    required:true
},
  Nom: {
    type: String,
    required: true
},
  Prenom: {
    type: String,
    required: true
},
  Telephone: {
    type:Number,
    required:true
},
  Email: {
    type: String,
    required: true
},

}, {
  timestamps: true
});




  module.exports=mongoose.model('Particulier',commentaireSchema)
