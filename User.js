const mongoose = require('mongoose')
//We use the validator dependency to check if the email is valid one 
const {isEmail} = require('validator')
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required: [true, 'Please enter a valid email'],
        // the above array works like a if else statement it returns true if email is entered properly else gives the message included in the second half of the array
        unique:true,
        lowercase:true,
        validate: [isEmail,'Please enter a valid email']
        //validate is another field for checking if the email is a valid one else it gives out the message
        //isEmail is the field for checking the validity of the email
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
})

// userSchema.post('save', function(doc,next){
//     console.log('new user was vreated and saved',doc)
//     next()
// })


const User = mongoose.model('user',userSchema)

module.exports = User