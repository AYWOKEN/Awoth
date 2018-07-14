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
    let contents = fs.readFileSync('data.json');
    let jsonContent = JSON.parse(contents);
    // console.log('Username: ', jsonContent.user_pseudo);

    console.log(req.body)
    res.render('inscription_succes')


fs.writeFile('data.json', JSON.stringify(req.body, false, 4), (err) => {
    if (err) throw err;
})

fs.appendFile(jsonContent.user_pseudo + ".json", (err) => {
    if (err) throw err;
})

fs.writeFile(jsonContent.user_pseudo + ".json", JSON.stringify(req.body, false, 4), (err) => {
    if (err) throw err;
})




})

app.get('/login', function (req, res) {
    res.render('login');
})



app.listen(3000);
console.log('Application en marche !');
