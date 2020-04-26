const validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : ""
    data.firstname = !isEmpty(data.firstname) ? data.firstname : ""
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""


    if(validator.isEmpty(data.username)){
        errors.username = "Username Field is required"
    }
    if(validator.isEmpty(data.firstname)){
        errors.firstname = "Firstname Field is required"
    }
    if(validator.isEmpty(data.lastname)){
        errors.lastname = "Lastname Field is required"
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email Field is required"
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is not valid"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password Field is required"
    }
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password Field is required"
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password Length must be at least 6 characters"
    }
    if(!validator.equals(data.password,data.password2)){
        errors.password2 = "Password don't match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

}
