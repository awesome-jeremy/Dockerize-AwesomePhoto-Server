const express = require('express');
const knex = require('knex');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient(process.env.REDIS_URI);

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
})

app.use(express.json());


// fetch photo from database, return a promise
getPhotoFromDatabase = (id) => {
    return db.select('*').from('photo').where({ id })
        .then(photos => photos[0])
        .catch(err => Promise.reject(err))
}


app.get('/photos/:id', (req, res) => {
    const { id } = req.params;

    redisClient.get(id, (err, reply) => {
        if (err || !reply) {
            //cache miss
            console.log('cache miss');

            getPhotoFromDatabase(id)
                .then(photo => {
                    if (photo && photo.url) {
                        redisClient.set(id, JSON.stringify(photo));
                        res.status(200).send(
                            `<div>
                                <img src=${photo.url}/>
                            </div>`)
                    } else { res.status(400).send("<h1>Photo not found</h1>") }
                })
                .catch(err => res.json(err));
        } else {
            //cache hit
            console.log('cache hit');

            const cachedPhoto = JSON.parse(reply);
            res.status(200).send(
                `<div>
                    <img src=${cachedPhoto.url}/>
                </div>`)
        }
    })

})


app.listen(3001, () => console.log('Port listening on port 3001!'));
