const user = require("./user")

module.exports = function(app,users) {
    app.post('/user/marks',(req,res) => {
        users.find({_id: req.body.user_key}, (err,doc) => {

            let marks = doc[0].marks

            // Заполнение пустый слотов книгой
            for(let key in marks){
                if(marks[key].length === 0){
                    marks[key] = req.body.book_id;
                    break;
                }
            }
            // Обновление закладок пользователя
            users.update({_id: req.body.user_key},{$set: {marks: marks}},{},function(err,doc){
                users.loadDatabase()
            })
        })
        // users.update({_id: req.body.user_key},{$set: {marks: {book_1: 'asd'}},{},function(err,doc){
        //     users.loadDatabase()
        //     console.log(doc)
        // })
        return res.send('ok')
    })
}