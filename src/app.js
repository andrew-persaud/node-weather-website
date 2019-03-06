const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Persaud'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name: 'Andrew Persaud'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew Persaud',
        helpText: 'Type in a location for a weather summary.'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address;
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error})
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    res.send({error})
                } else {
                    res.send({
                        forecast: data,
                        location
                    })
                }
            })
        }
    });
 
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        name: 'Leo',
        title: '404'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        name: 'Katana',
        title: '404' 
    });
})


//listen
app.listen(port, () => {
    console.log('Server is up on port 3000.');
})