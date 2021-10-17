const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost:27017/contactDance', {usenewurlparser : true});
const port = 8000;


//defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String,
    address: String,
    file: String
  });
var Contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
    res.status(200).render('fill.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.get('/upcoming', (req, res)=>{
    res.status(200).render('upcoming.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
})



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});