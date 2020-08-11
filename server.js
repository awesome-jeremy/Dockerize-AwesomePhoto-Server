const express = require('express');
const knex = require('knex');

const app = express();

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
})

app.use(express.json());

app.get('/photos/:id', (req, res) => {
    const { id } = req.params;

    db.select('*').from('photo').where({ id })
        .then(photos => {
            if (photos[0] && photos[0].url) {
                res.send(
                    `<div>
                        <img src=${photos[0].url}/>
                    </div>`)
            } else {
                res.send("<h1>Not Found</h1>")
            }
        }).catch(err => res.send(err))

})


app.listen(3001, () => console.log('Port listening on port 3001!'));
