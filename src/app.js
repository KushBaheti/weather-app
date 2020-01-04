const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Kush Baheti"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Kush Baheti"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Shoot an email to kushbaheti@gmail.com in case of inquiries.",
        title: "Help Page",
        name: "Kush Baheti"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address){
        return res.send({
            error: 'please provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) =>{
        if (error){
            return res.send({
                error: error
            })        
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Kush Baheti",
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Kush Baheti",
        errorMessage: "Page not found."
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})