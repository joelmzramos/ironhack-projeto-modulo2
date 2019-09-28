const express = require('express');
// const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('./models/Users');

const app = express();

mongoose
  .connect('mongodb://localhost/project-module-2', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'our-passport-local-strategy-app',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 1, // 3 min
  }),
}));

passport.serializeUser((user, cb) => {
  console.log('User +' + user);
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  console.log('Id +' + id);
  Users.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  Users.findOne({ username }, (err, user) => {

    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: 'Incorrect username' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: 'Incorrect password' });
    }

    return next(null, user);
  });
}));



// User.findOne({ email })
// .then((user) => {
//   if (!user) {
//     res.render('public/login', {
//       errorMessage: "The username doesn't exist.",
//     });
//     return;
//   }

//   if (bcrypt.compareSync(password, user.password)) {
//     // Save the login in the session!
//     req.session.currentUser = user;
//     res.redirect('/events');
//   } else {
//     res.render('public/login', { errorMessage: 'Incorrect password' });
//   }
// })
// .catch((error) => {
//   next(error);
// });


app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', `${__dirname}'/views'`);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const publicRoutes = require('./routes/public/public-routes');
const authRoutes = require('./routes/public/auth-routes');
const privateRoutes = require('./routes/private/private-routes');

app.use('/', publicRoutes);
app.use('/', authRoutes);
app.use('/', privateRoutes);

// hbs.registerPartials(`${__dirname}/views/partials`);

app.listen(3000, () => console.log("My Project2 running on port 3000 🎧 🥁 🎸 🔊"));