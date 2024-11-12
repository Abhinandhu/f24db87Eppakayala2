require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artifactsRouter = require('./routes/artifacts');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var costumeRouter = require('./routes/costumes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CON);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artifacts', artifactsRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);
app.use('/costumes', costumeRouter);

const Costume = require("./models/costume");
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let reseed = true;
if (reseed){
  recreateDB();
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
})

async function recreateDB() {
  // Delete all existing records
  await Costume.deleteMany();

  // Create new instances
  let instance1 = new Costume({ costume_type: "ghost", size: "large", cost: 15.4 });
  instance1.save().then(doc => {
    console.log("First object saved");
  }).catch(err => {
    console.error(err);
  });
}

async function recreateDB(){
  try {
      // Delete all existing documents in the collection
      await Costume.deleteMany();
      
      // Create and save three instances to the database
      let instances = [
        { costume_type: "ghost", size: "large", cost: 15.4 },
        { costume_type: "ghost2", size: "xlarge", cost: 24 },
        { costume_type: "ghost3", size: "xxlarge", cost: 44 }
      ];

      for (let instanceData of instances) {
          let instance = new Costume(instanceData);
          await instance.save();
          console.log("Instance saved:", instance);
      }

      console.log("Database seeded successfully");
  } catch (err) {
      console.error("Error seeding database:", err);
  }
}


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
