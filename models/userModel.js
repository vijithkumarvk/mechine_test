var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

var User = module.exports = mongoose.model('user', userSchema);
module.exports.getUser = async function(mail){
    return new Promise((resolve, reject) => {
        if(mail){
            User.findOne({email: mail}).exec(function(error, result){
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        }else{
            reject('No user found.!');
        }
    })
}
