const Joi = require('joi');

const getprofile=Joi.object().keys({
    email:Joi.string().email().required()
});


const updateProfile=Joi.object().keys({
 email:Joi.string().email().required(),
 name:Joi.string().required(),
 phone:Joi.number().min(10).max(10).optional(),
 bio:Joi.string().optional(),
 password:Joi.string().allow(null).optional()
});

module.exports={
    getprofile,
    updateProfile
}




// "Email":"jesinthg@karunya.edu.in",
// "Bio":"Jesinth is not cash on Delivery , it is Call of Duty",
// "Phone":7538806929,
// "Name":"Jesinth Call Of Duty",
// "Password":89917020