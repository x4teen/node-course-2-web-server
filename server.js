const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
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

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page',
    welcomeMessage: 'Welcome to my project page',
    project01 : 'https://explorable.com/paper-airplane-experiment',
    project02 : 'https://sciencebob.com/build-a-hovercraft-you-can-ride/',
    project03 : 'https://sciencebob.com/build-a-soap-powered-model-boat/'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
