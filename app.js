const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
    res.send("Bienvenue sur mon système d'authentification ! :)");
});

app.get('/inscription', function (req, res) {
    res.render('inscription');
})


app.post('/inscription', function (req, res) {

    fs.writeFile(req.body.user_pseudo + ".json", JSON.stringify(req.body, false, 4), (err) => {
    })

    res.render('inscription_succes')
})



app.get('/login', function (req, res) {
    res.render('login');
})





app.post('/login', function (req, res) {



    fs.readFile(req.body.user_pseudo + ".json", (err, data) => {    
      if (err) {
        return res.render('login_failed')
      }
 
      const user = JSON.parse(data)
      
      if (req.body.pass != user.pass) {        
        if (err) {
           res.render('login_failed')
        }
     } else {
          res.render('login_success');
      }
      
    })
  })

app.listen(3000);
console.log('Application en marche !');