const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//uncomment maintenance section to place site in maintenance

//***START OF MAINTENANCE SECTION */

// const delay = 60;
// const reopenTime = new Date().getMinutes()+delay;
// app.use((req, res, next)=>{
//   console.log(reopenTime);
  
//   res.render('maintenance.hbs', {
//     timeToOpen: (reopenTime - new Date().getMinutes())
//   });
// });

//***END OF MAINTENANCE SECTION */

app.use((req, res, next) => {

  var now = new Date().toString();
  var reqlog = `${now}`+' from:'+req.ip+' resource:'+req.url+ ' method:'+req.method;
  fs.appendFileSync('server.log',reqlog+'\n');
  next();
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
