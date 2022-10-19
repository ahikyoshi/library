const get_user      = require('./get_user.js')      ;
const add_user      = require('./add_user.js')      ;
const change_user   = require('./change_user.js')   ;
const user_marks    = require('./user_marks.js')    ;

module.exports = function(app,users){

    // Получение данных пользователя
    app.post('/user', (req,res) => {
        users.find({_id: req.body._id}, (err,doc) => {
            res.send(doc)
        })
    })
    // Авторизация
    get_user(app,users)
    // Регистрация пользователя
    add_user(app,users)
    // Изменения пользователя
    change_user(app,users)
    // Закладки
    user_marks(app,users)
}