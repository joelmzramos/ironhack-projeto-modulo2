const express = require('express');
// const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

//alterei aqui

// mongoose
//   .connect('mongodb://localhost/auth', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

//até aqui


const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}'/views'`);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const index = require('./routes/public/index');
const authRoutes = require('./routes/public/auth-routes');
const privateRoutes = require('./routes/private/private-routes');

app.use('/', index);
app.use('/', authRoutes);
app.use('/', privateRoutes);

// hbs.registerPartials(`${__dirname}/views/partials`);

app.listen(3000, () => console.log("My Project2 running on port 3000 🎧 🥁 🎸 🔊"));