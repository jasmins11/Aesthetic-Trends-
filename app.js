var express = require("express");
var app = express();

const session = require("express-session");
const formidable = require("formidable");
const fs = require("fs");
const ejs = require("ejs");
const bodyParser=require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
    session({
        secret: "abcdefg",
        resave: true,
        saveUninitialized: false,
    })
);

app.use(express.static("public"));

// Ruta pentru pagina principală
app.get("/", function (req, res) {
    res.render("index");
});

// Rutele pentru paginile HTML
app.get("/grunge", function (req, res) {
    res.render("grunge");
});

app.get("/retro", function (req, res) {
    res.render("retro");
});

app.get("/cyberpunk", function (req, res) {
    res.render("cyberpunk");
});

app.get("/barbie", function (req, res) {
    res.render("barbie");
});

app.get("/formular", function (req, res) {
    res.render("formular");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/logout",function(req,res){
    res.render("logout");
});

app.post("/login", function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const user = checkUser(fields.username, fields.parola);
      if (user) {
        req.session.username = user;
        res.redirect("/");
      } else {
        req.session.username = false;
      }
    });
  });
  

  function checkUser(username, password) {
    if (fs.existsSync("users.json")) {
      const data = fs.readFileSync("users.json");
      const users = JSON.parse(data);
  
      for (i in users) {
        if (
          users[i].username === username[0] &&
          users[i].parola === password[0]
        ) {
          return username[0];
        }
      }
    }
  
    return false;
  }
  
  app.use(function (req, res, next) {
    res.status(404).render("404");
});


app.listen(3000, function () {
    console.log("Serverul rulează pe portul 3000");
});
