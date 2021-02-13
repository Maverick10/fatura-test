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
    const result = await handlers.getProducts(req.query);
    res.json(result);
})

app.put('/products/:id/toggle_featured', async (req, res) => {
    const result = await handlers.productsToggleFeatured(req.params.id);
    res.send(req.params.id);
})