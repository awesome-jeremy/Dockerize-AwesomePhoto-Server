const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/photos/:id', (req, res) => {
    const { id } = req.params;
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(response => response.json())
        .then(data => res.send(
            `<div>
                <img src=${data.url}/>
            </div>`
        ))
        .catch((err) => res.send(err))
})


app.listen(3001, () => console.log('Port listening on port 3001!'));
