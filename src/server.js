const express = require("express");
const server = express();

// catch database exported
const db = require("./database/db.js");

// setup public folder (that contains css, assets, scripts - front-end)
server.use(express.static("public"));

// enable use of req.body (use with POST)
server.use(express.urlencoded({ extended: true }));

// using template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

// setup paths of the application
// first page
server.get("/", (req, res) => {
  return res.render(__dirname + "/views/index.html", {
    title: "Seu marketplace de coleta de resíduos"
  });
})

server.get("/create-point", (req, res) => {

  // req.query: Query Strings from url -> in an object format
  // console.log(req.query);

  return res.render(__dirname + "/views/create-point.html");
})

server.post("/savepoint", (req, res) => {

  // req.body: form body -> needs to enable like we did above
  // console.log(req.body);

  // insert data on database
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?, ?, ?, ?, ?, ?, ?);
`
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro");
    }
    console.log("Cadastrado com sucesso");
    console.log(this); // cannot be used with arrow function
    
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData); // function callback called after the first 2 parameters (but not immediatly)- by reference
})

server.get("/search", (req, res) => {

  const search = req.query.search;

  if(search == "" ) {
    // case: there is no results
    return res.render("search-results.html",  {total: 0 });
  }

  // fetch data from database
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err);
    }
    // console.log(rows);
    const total = rows.length;

    // show html page with data from our database
    return res.render(__dirname + "/views/search-results.html", { places: rows, total });
  });
})

// start server
server.listen(3000);