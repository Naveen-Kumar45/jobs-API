const dns = require('node:dns') // dns is used to set the DNS servers for the application. In this case, it sets Google's public DNS servers

dns.setServers(['8.8.8.8', '8.8.4.4']) // This line sets the DNS servers to Google's public DNS servers. This can help with resolving domain names more reliably, especially in environments where the default DNS servers may be slow or unreliable.

require('dotenv').config() // This 

const express = require("express")
const app = new express()

//extra security packages
const helmet = require("helmet") // this package helps to secure the app by setting various HTTP headers
const cors = require("cors") // this package helps to enable CORS (Cross-Origin Resource Sharing) for the app
const { xss } = require("express-xss-sanitizer") // this package helps to sanitize user input and prevent XSS (Cross-Site Scripting) attacks
const rateLimit = require("express-rate-limit") //  

// Swagger
const swaggerUI = require('swagger-ui-express') // this package helps to serve the Swagger UI for API documentation
const YAML = require('yamljs') // this package helps to load YAML files
const swaggerDocument = YAML.load('./swagger.yaml') // this line loads the Swagger documentation from the swagger.yaml file


//custom middlewares
const authentication = require("./middlewares/authenticate.js")
const connectDB = require("./db/connect.js")

//error handler middleware
const notFound = require("./middlewares/not-found.js")
const errorHandler = require("./middlewares/error-handler.js")

//routers
const jobsRoute = require("./routes/jobs.js")
const authRoute = require("./routes/auth.js")

app.set('trust proxy',1);
app.use(rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max : 100, //limit each IP to 100 requests per windowMs
}))
app.use(express.json());
//app.use(express.static("./public"));
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/",(req,res) => {
    res.status(200).send(`
  <div style="
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
    <h1>Jobs API</h1>
    <a href="/api-docs">Documentation</a>
  </div>`)
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)) // this line serves the Swagger UI at the /api-docs endpoint

app.use("/api/v1/jobs",authentication,jobsRoute)
app.use("/api/v1/auth",authRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB")
        app.listen(PORT,()=>{
            console.log(`Server running on the port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()
