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
        errors.Error = "Username Field is required"
    }
    if(validator.isEmpty(data.firstname)){
        errors.Error = "Firstname Field is required"
    }
    if(validator.isEmpty(data.lastname)){
        errors.Error = "Lastname Field is required"
    }
    if(validator.isEmpty(data.email)){
        errors.Error = "Email Field is required"
    }else if(!validator.isEmail(data.email)){
        errors.Error = "Email is not valid"
    }
    if(validator.isEmpty(data.password)){
        errors.Error = "Password Field is required"
    }
    if(validator.isEmpty(data.password2)){
        errors.Error = "Confirm password Field is required"
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.Error = "Password Length must be at least 6 characters"
    }
    if(!validator.equals(data.password,data.password2)){
        errors.Error = "Password don't match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

}
