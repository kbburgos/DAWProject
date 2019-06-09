const myConnection = require('express-myconnection');
const mysql = require('mysql');
const { urlDB } = require("./constantes");

module.exports = {'conexion' : myConnection(mysql, {
   host: urlDB,
   user: 'medicina',
   password: 'medicina',
   database: 'bookmedik',
   port: 3306
}, 'single'),
  'database' : {
     host: urlDB,
     user: 'medicina',
     password: 'medicina',
     database: 'bookmedik',
     port: 3306
  }
};
