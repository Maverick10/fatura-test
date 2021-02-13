const app = require('express')();
require('dotenv').config();
const handlers = require('./handlers');
const ORM = require('./ORM');
const serverPort = process.env.SERVER_PORT;

app.listen(serverPort, () => {
    console.log(`server started on port ${serverPort}`);
    ORM.config();
});

app.get('/products', async (req, res) => {
    handlers.getProducts(req.query)
        .then(result => res.json(result))
        .catch(err => res.status(400).send({
            message: 'Error returned from handler. Refer to console output'
        }));
})

app.put('/products/:id/toggle_featured', async (req, res) => {
    handlers.productsToggleFeatured(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(400).send({
            message: 'Error returned from handler. Refer to console output'
        }));
})