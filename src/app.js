const path = require('path')
const express = require('express')
const hbs = require ('hbs') 
const {geocode} = require('./utils/gecode')
const {forecast }= require('./utils/forecast')


const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//setup static directory to serve
app.use(express.static(publicDirectoryPath ))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'andrew mead'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:"andrew mead"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'take it easy',
        title:'Help page',
        name:'andrew mead'
        })
})

//the below line helps up tell the server what to do when enver someone visits the given url
// app.get('',(req,res)=>{
//     res.send('<h1>Hello express!</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'andrew',
//         age:27
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</>')
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address must be provided"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
               location: location,
               forecast:forecastData,
               address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"help not found",
        name:"andrew mead",
        message:"help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
         title:"not found page",
        name:"andrew mead",
        message:"page not found"
    })
})

//web servers stays up and running and it's job is to listen, process in incomming request
//the below command is used to start up the server and also configure the port on which it is running.
//Every app that permits the interaction with web or so must always have this starting point. 
// And the configuration differs depending on the language 

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})