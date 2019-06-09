const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const validator = require('express-validator');
const morgan = require('morgan');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const SocketIO = require('socket.io');

const app = express();

require('./src/config/passport');

//import routes
const loginRouter = require('./src/routes/login.js');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

//middleware --> se ejecuta antes de las peticiones de usuarios
//app.use(morgan('dev'));
const {
  conexion
} = require('./src/config/keys');
const {
  database
} = require('./src/config/keys');
//setting for live search
 var db = mysql.createConnection(database);
db.connect( (err) => {
  if(err){
    console.log(err);
  }
  else{
    console.log("Conectado para live search");
  }
});

app.use(conexion);
app.use(session({
  secret: 'NIoEsAdrQZZOSL0y',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.mensajeDelete = req.flash('mensajeDelete');
  app.locals.user = req.user;
  app.locals.socket = SocketIO;
  next();
});


//routes
app.use('/', loginRouter);


//static files
app.use(express.static(path.join(__dirname, '/src/public')));

const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

//websockets
const io = SocketIO.listen(server);
io.on('connection', (socket) => {

  socket.on('tipo_c', (data) => {
    console.log('Nuevo cliente id: ' + socket.id + ' tipo: ' + data.tipo + ' RUC: ' + data.ruc);
  });
  // se verifican los datos de clientes que se desconectan, y en caso de ser de tipo admin se elimina el dato del mapa para no desperdiciar recursos
  socket.on('disconnect', function() {
    console.log("Se desconecto el usuario: " + socket.id);
  });

  socket.on('nueva_carrera', (data) => {
    id = mapaPlacas.get(data.coop).get(data.placa);
    if(id != null){
      socket.broadcast.to(id).emit('notificacion_carrera','1');
    }
  });


  socket.on('live_search', (placa) => {
    db.query("select * from carro where placa like ?", ['%'+placa+'%'] , (err, rows) => {
      if(err){
        console.log(err);
      }
      else{
        socket.emit("new_data",rows);
      }
    });
  });
});
