//  express module
const express = require("express")
const swaggerUI = require('swagger-ui-express')
const docs = require('./swagger.json')
const bodyParser = require("body-parser")
const app = express();




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// printing the request endpoint
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`)
    next()
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))


// defining the request path
const api = require('./route/routes')
app.use('/jwt/', api)

// binding the port number
app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000/api-docs");
})