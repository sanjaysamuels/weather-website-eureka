const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// all the paths needed for files 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))

// the partials folder has elements that is common in all the web pages 
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sanjay Samuel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sanjay Samuel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text.',
        name: 'Sanjay Samuel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Adress not found!"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        ErrorMessage: 'Help does not exist',
        name: 'Sanjay Samuel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        ErrorMessage: 'Page not found',
        name: 'Sanjay Samuel'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' +port)
})