const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema  = new Schema({
    method:{
        type :String,
        enum :['local','google','facebook'],
        required:true
    },
    local:{
        name:{
            type: String,
        },
        email:{
            type: String,
            lowercase:true
        },
        password:{
            type: String,
        },
        date:{
            type: Date,
            default : Date.now
        }
    },
    google:{
        id:{
            type :String
        },
        email:{
            type: String,
            lowercase:true
        },
    },
    facebook:{
        id:{
            type :String
        },
        email:{
            type: String,
            lowercase:true
        },
    },
    
});

userSchema.pre('save', async function(next){
    try{
        //check if method is local
        if(this.method != 'local')  next();
        // generate the salt
        const salt  = await bcrypt.genSalt(10);

        // generate hashed password (salt+hash)
        const hashedPassword = await bcrypt.hash(this.local.password,salt);

        // asign the hased password to hased to be saved in database
        this.local.password =hashedPassword;
        
        next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.validatingPassword = async function(password) {
    try {
        return await bcrypt.compare(password,this.local.password);
        
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model( 'userSchema',userSchema);
module.exports = User;