const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.nom = !isEmpty(data.nom) ? data.nom : '';
    data.prenom = !isEmpty(data.prenom) ? data.prenom : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.specialite = !isEmpty(data.specialite) ? data.specialite : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.nom, { min: 2, max: 30 })) {
        errors.nom = 'Nom must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.nom)) {
        errors.nom = 'Nom field is required';
    }

    if(!Validator.isLength(data.prenom, { min: 2, max: 30 })) {
        errors.prenom = 'Prenom must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.prenom)) {
        errors.prenom = 'Prenom field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.specialite, { min: 2, max: 30 })) {
        errors.specialite = 'Spécialité must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.specialite)) {
        errors.specialite = 'Spécialité field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}