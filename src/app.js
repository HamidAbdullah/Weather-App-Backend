const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);  // Ensure this points to the 'views' directory
hbs.registerPartials(partialsPath);  // Register partials if you have any (like header, footer, etc.)

// Setup static directory to serve (for assets like images, CSS, JS)
app.use(express.static(publicDirectoryPath));

// Route for the home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hamid Abdullah'
    });
});

// Route for the 'About' page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hamid Abdullah'
    });
});

// Route for the 'Help' page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hamid Abdullah'
    });
});

// Weather route that handles user input for the address query
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            title: 'Error',
            message: 'You must provide an address!'  // Show error if no address provided
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.render('error', {
                title: 'Error',
                message: error  // Show geocode error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.render('error', {
                    title: 'Error',
                    message: error  // Show forecast error
                });
            }

            res.render('weather', {
                title: 'Weather',
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

// Route for products (demonstrates handling search queries)
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

// Route to handle unmatched help articles (404 for help pages)
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamid Abdullah',
        errorMessage: 'Help article not found.'
    });
});

// Catch-all route for other unmatched pages (404 for all other pages)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hamid Abdullah',
        errorMessage: 'Page not found.'
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
