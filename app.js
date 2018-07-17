const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const {
    promisify
} = require('util')
const argon2 = require('argon2');


const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}))


app.get('/', function(req, res) {
    res.send("Bienvenue sur mon système d'authentification ! :)");
});

app.get('/inscription', function(req, res) {
    res.render('inscription');
})


app.post('/inscription', async (req, res) => {

    console.log(req.body)

    await writeFile(`${req.body.user_pseudo}.json`, JSON.stringify({
        ...req.body,
        pass: await argon2.hash(req.body.pass)
    }, false, 4))



    res.render('inscription_succes')
})


app.get('/login', function(req, res) {
    res.render('login');
})




app.post('/login', async (req, res) => {
    try {
        const data = await readFile(req.body.user_pseudo + ".json")
        const user = JSON.parse(data)
        if (await argon2.verify(user.pass, req.body.pass)) {
            res.render('login_success')
        } else {
            res.render('login_failed')
        }
    } catch (err) {

        res.render('login_failed')
    }
})

app.listen(3000);
console.log('Application en marche !');
