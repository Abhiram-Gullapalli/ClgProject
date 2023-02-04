const User = require('../models/User')
const handleError = (err) => {
    console.log(err.message,err.code)
    // when ever we have a post request wih blank details or one of them is empty we errors for both of the fieds


    let error = {email: '',password:''}
    // we create a temporary error array to store the error correction messages within them
    // for duplicate content

    if(err.code === 11000){// the code 11000 is what we encounter when we experience if a email is already registered
        error.email = "This email is already registered"
        return error
    }


    //validating errors

    // we get the user validation failed when there is either wrong input, insuffecient input etc.
    // hence we store we check if the error message contains the following and then return the appropriate message
    if(err.message.includes('user validation failed')){
        // the error thrown in general is in the form of an object , which in turn contains the error string (that is if the email is invalid pr the password is too small etc)
        // we run a simple for each loop to iterate through the properties section of the error object
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
            // the properties path automatically goes through the email and password errors if any
            //and updates the necessary error message within the error array
        })
    }

    return error
    // and we finally return the updated error array
}
module.exports.signup_get = (req,resp) => {
    resp.render('signup')
}
module.exports.login_get = (req,resp) => {
    resp.render('login')
}
module.exports.signup_post = async (req,resp) => {
    const {email,password} = req.body
    try {
        const user = await User.create({email,password})
        resp.status(201).json(user)
    }
    catch(error){
        const err = handleError(error)
        resp.status(400).json(err)
        //instead of printing out the info we give out in the form of json
    }
}
module.exports.login_post = async (req,resp) => {
    const {name,password} = req.body

    console.log(name,password)
    resp.send('user signup')
}