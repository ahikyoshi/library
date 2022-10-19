module.exports = function(app,users){
    app.post('/auth/login', (req,res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        }
        console.log(user)
        users.find({"data.login" : user.login}, (err,doc) => {   
            if(doc.length === 0){
                return res.status(404).send('Почта или пароль недействительны')
            }else{
                if(doc[0].data.password === user.password){
                    return res.send(doc[0]._id)
                }else{
                    return res.status(404).send('Почта или пароль недействительны')
                }
            }
        })
    })
}