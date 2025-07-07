//setup.. this is similar to how we do html tags

const express = require ("express")
//activate or tell this app variable to be an express server
const app = express()
const router = express.Router()

//start the web server.. app..listen(portnumber, function)
app.listen(3000, function(){
    console.log("listening on port 3000")
})

//making an api using routes
//routes are used to handle browser requests
//they look like URLs, except when a browser requests a route, it is automatically handled by using a funciton.

//GET or a regular request when someone goes to http://localhost:3000/hello
//when using a function in a route we almost always have a parameter and handle a response and request
app.get("/hello", function(req, res){
    res.send("<h1>Hello Express</h1>")
})

app.get("/goodbye", function(req, res){
    res.send("<h1>Goodbye, Express!</h1>")
})