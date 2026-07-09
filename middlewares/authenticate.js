require("dotenv")
const user = require("../models/user-schema")
const createError = require("http-errors")
const jwt = require("jsonwebtoken")

const authentication = async (req,res,next) => {
    //console.log(req.headers)
    const Authorization = req.headers.authorization

    if (!Authorization || !Authorization.startsWith("Bearer ")){ // this checks if the Authorization header is present and starts with "Bearer "
        throw createError.Unauthorized("No Token Provided")
    }

    const token = Authorization.split(" ")[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) // this verifies the token using the secret key and returns the payload if the token is valid
        //console.log(payload)
        //const details = await user.findById(payload.userId)
        const {userId, name} = payload // this extracts the userId and name from the payload
        req.user = {userId, name} // this adds the userId and name to the req.user object so that it can be accessed in the next middleware or route handler
        next()    
    }
    catch(err){
        throw createError.Unauthorized("Authentication Failed")
    }
}

module.exports = authentication