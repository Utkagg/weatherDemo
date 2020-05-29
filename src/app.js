const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define paths for app config
const pathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialViewsPath = path.join(__dirname, '../templates/partials')
//setup handle bar engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')

//setup static directory to serve
app.use(express.static(pathDirectory))
hbs.registerPartials(partialViewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Utkarsh'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Utkarsh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        msg: 'Please call 0080880808800 ',
        name: 'Utkarsh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    }

    )
}

)
app.get('/help/*', (req, res) => {
    res.render('404',
        {
            title: 'Help page',
            name: 'Utkarsh',
            error: 'Help page not found!!'
        })
})
app.get('*', (req, res) => {
    res.render('404',
        {
            title: 'Error!!',
            name: 'Utkarsh',
            error: 'Requested page not found!!'
        })
})



app.listen(
    3000, () => {
        console.log('server is up!!')
    }
)