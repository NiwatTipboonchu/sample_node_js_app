const express = require('express')
var CryptoJS = require("crypto-js");
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

var encrypt = null;

var date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

var up = { 'username': null, 'password': null };
var authResponse = { 'auth': null };
var decryption = { 'decryption': null };

if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;

const dateCurrent = [year, month, day].join('/');

app.post('/decryption', (req, res) => {
    console.log('req.body.text : ' + req.body.text);
    const text = CryptoJS.AES.decrypt(req.body.text, req.body.key).toString(CryptoJS.enc.Utf8);

    console.log('result : ' + text);

    decryption.decryption = text;
    res.json(decryption)
})

app.post('/encrypt', (req, res) => {
    const username = CryptoJS.AES.encrypt(req.body.username, dateCurrent).toString()
    const password = CryptoJS.AES.encrypt(req.body.password, dateCurrent).toString()
    up.username = username;
    up.password = password;
    res.json(up)
})

app.post('/encryptAuth', (req, res) => {
    console.log('req.body.userinfo : ' + req.body.userinfo);
    const auth = CryptoJS.AES.encrypt(req.body.userinfo.toString(), req.body.privateKey).toString()
    authResponse.auth = auth;
    res.json(authResponse)
})

app.get('/encrypt/username/:username', (req, res) => {
    encrypt = CryptoJS.AES.encrypt(req.params.username, dateCurrent).toString()
    res.send(encrypt)
})

app.get('/encrypt/password/:password', (req, res) => {
    encrypt = CryptoJS.AES.encrypt(req.params.password, dateCurrent).toString()
    res.send(encrypt)
})

app.post('/', (req, res) => {
    res.send('niwat')
})



app.listen(3000, () => {
    console.log('Start server at port 3000.')
})