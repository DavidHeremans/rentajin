var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var verstuur = [mailOptions, mailOptions2];


app.use(bodyParser.urlencoded({extended:true}));

var http = require("http");

setInterval(function(){
  http.get("http://rentajin3012.herokuapp.com/");
  console.log('made get request');
}, 1500000);


//SERVING STATIC FILES
app.use(express.static('public'));

//GET REQUESTS
app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/confirmation", function(req,res){
  res.render("confirmation.ejs");
});

app.get("/tafelronde/ronde1", function(req,res){
  res.render("tafelronde.ejs");
});

app.get("/tafelronde1", function(req,res){
  res.render("tafelronde.ejs");
});

app.get("/mailKlant", function(req,res){
  res.render("mailKlant.ejs");
});

//POST REQUESTS

//MAIL CREDENTIALS: rentajin3012@outlook.be - jin3012jin3012, rentajin2@outlook.be - jin3012jin3012

app.post("/sendMail", function(req,res){
    console.log("De server is bereikt via /sendMail");
    var nodemailer = require('nodemailer');
    //Require mail content
    var name = req.body.naam;
    var email = req.body.email;
    var telefoonNummer = req.body.telefoonNummer;
    var omschrijving = req.body.omschrijving;
    var aantalPersonen = req.body.personenNodig;
    
    
    //Setup mail
    var transporter = nodemailer.createTransport({
      service: 'outlook365',
      auth: {
        user: 'rentajin3012@outlook.be',
        pass: 'jin3012jin3012'
      }
    });
    
    var mailOptions = {
      from: name,
      to: 'rentajin3012@outlook.be',
      subject: 'Rent a Jin aanvraag van '+ name,
      text: '//TELEFOON// = ' + telefoonNummer +' //NAAM// = ' + name + " //EMAIL// = " + email + " //AANTALPERS// = " + aantalPersonen + " //OMSCHRIJVING// " + omschrijving
    };
    
    transporter.sendMail(verstuur, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });    
    
    //Setup mail klant
    var transporter = nodemailer.createTransport({
      service: 'outlook365',
      auth: {
        user: 'rentajin3012@outlook.be',
        pass: 'jin3012jin3012'
      }
    });
    
    var mailOptions2 = {
      from: 'Rentajin3012',
      to: email,
      subject: 'BEVESTIGING',
      text: 'Beste '+name+' we hebben uw bericht goed ontvangen en nemen zo snel mogelijk contact met u op! UW gegevens: Naam: ' +name+ ', Telefoon: ' +telefoonNummer+ ', Email: ' +email+', Aantal personen: ' +aantalPersonen+', Omschrijving:' +omschrijving+'.'
    };
    
    transporter.sendMail(mailOptions2, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });        
    
    res.redirect("/confirmation");
});

//SERVER MESSAGE
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Rent A Jin server started!");
});



