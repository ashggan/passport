const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema  = new Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default : Date.now
    }
});

userSchema.pre('save',async function(next){
    try{
        // generate the salt
        const salt  = await bcrypt.genSalt(10);

        // generate hashed password (salt+hash)
        const hashedPassword = await bcrypt.hash(this.password,salt);

        // asign the hased password to hased to be saved in database
        this.password =hashedPassword;
        
        next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.validatingPassword = async function(password) {
    try {
        return await bcrypt.compare(password,this.password);
        
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model( 'userSchema',userSchema);
module.exports = User;