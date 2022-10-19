module.exports = function(app,books){

    app.get('/books',(req,res) => {
        books.find({},(err,doc) => {
            return res.send(doc)
        })
    })

    app.post('/books/new_book',(req,res) => {
        books.insert(req.body, (err, doc) => {
            res.status(200).send('Успешно добавлено')
        })
    })

}