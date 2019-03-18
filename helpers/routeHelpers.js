const joi = require('joi');

module.exports = {
    validateBody :(schema)=>{
        return (req,res,next)=>{
            const result = joi.validate(req.body,schema);
            if(result.error){
                // console.log(req.body);
                return res.status(400).json(result.error)
            }
            if(!req.value) req.value ={};            
            req.value['body'] = result.value;
            next();
        }
    },
    schema :{
        authSchema: joi.object().keys({
            email: joi.string().email().required(),
            name: joi.string().required(),
            password : joi.string().required()
        }),
        loginSchema : joi.object().keys({
            email: joi.string().email().required(),
            password : joi.string().required()
        })
    }
}