//  Используемые модули
const express        = require('express');              // Загрузка серверного ядра
const bodyParser     = require('body-parser');         
const path           = require('path')
var nedb             = require('nedb');
var expressNedbRest  = require('express-nedb-rest');

//  Настройки сервера
const app            = express();                       // Создание переменной сервера
const port           = 4444;                            // Порт сервера  

// Настройка БД
var users = new nedb({ filename: "bd/users.db",  autoload: true });
var books = new nedb({ filename: "bd/books.db",  autoload: true });
// Конфиг
app.use(function(req,res, next){
    res.setHeader('Access-Control-Allow-Origin' ,'*');
    res.setHeader('Access-Control-Allow-Methods','GET');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next()
})  // Настройка доступа запросу get

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'static')))

require('./routes/main.js')(app,users,books);



app.listen(port, () => {
  console.log('server,ok');
})

// Запросы на сервер

