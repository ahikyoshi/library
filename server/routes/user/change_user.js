module.exports = function(app,users){

    // Изменение изображения пользователя
    app.post('/user/change/icon',(req,res) => {

        users.update({_id: req.body.user_key},{$set: {icon: req.body.new_img}},{},function(err,rep){
            users.loadDatabase();
            res.send('icon changed')
        })

    })
}