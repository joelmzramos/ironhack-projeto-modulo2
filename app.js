const express = require('express');
// const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}'/views'`);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/public/index');
const authRoutes = require('./routes/public/auth-routes');

app.use('/', routes);
app.use('/', authRoutes);

// hbs.registerPartials(`${__dirname}/views/partials`);

app.listen(3000, () => console.log("My Project2 running on port 3000 🎧 🥁 🎸 🔊"));