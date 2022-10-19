module.exports = function (app, users) {

    app.post('/auth/registration', (req, res) => {
        let user = {
            data: {
                login: req.body.login,
                password: req.body.password,
                key: req.body.user_key,
                root: 'default'
            },
            profile: {
                name: req.body.name,
                icon: req.body.icon,
            }
        }
        users.find({ "data.login": user.data.login }, (err, doc) => {
            if (err) {
                return res.send(err)
            }
            if (doc.length === 0) {

                // Добавления пользователя в БД
                users.insert(user, (err, doc) => {
                    if (err) {
                        return res.status(500).send(err)
                    } else {
                        users.find({"data.login" : user.data.login}, (err,doc) => {
                            return res.status(202).send(doc)
                        })
                    }
                })
            } else {
                return res.status(400).send('Логин используется')
            }
        })

    })
}