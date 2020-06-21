// import sqlite dependencie
const sqlite3 = require("sqlite3").verbose(); // verbose will show messages on terminal

// create database object - make database operations
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db; // export this object (db)

// use database object in our operations
db.serialize(() => { // serializa will execute a code block, that's why we use arrow function
  
  // create table
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  // insert data
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
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Nº 260",
    "Santa Catarina",
    "Rio do Sul",
    "Papéis e Papelão"
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Cadastrado com sucesso");
    console.log(this); // cannot be used with arrow function
  }

  // db.run(query, values, afterInsertData); // function callback called after the first 2 parameters - by reference

  // fetch table data
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Aqui estão os seus registros");
  //   console.log(rows);
  // });

  // delete data
  // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Registro deletado com sucesso");
  // });
});