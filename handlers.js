const ORM = require('./ORM');
const middlewares = require('./middlewares');
module.exports = {
    getProducts: async (query) => {     // returns all products satisfying the request query params
        return new Promise(async (resolve, reject) => {
            try {
                const page = query.page;
                delete (query.page);    // query object will be used entirely as the where clause, page is not an attribute of product hence omitting it from where clause
                const models = await ORM.getModels();
                let opt = {
                    include: [{
                        model: models.product,  // inner joining product
                        as: 'product',
                        required: true,
                        where: query    // query params conditions
                    },
                    {
                        model: models.provider, // inner joining provider
                        as: 'provider',
                        required: true
                    }],
                    where: {
                        is_available: true  // no need to display unavailable products
                    },
                    order: [
                        [models.product, 'id', 'ASC'],  // same product appears sequentially
                        ['price', 'ASC']
                    ],
                    attributes: { exclude: ['product_id', 'provider_id'] }, // no need for them as they already appear in their respective objects
                    ...(await middlewares.pagination(page))     // spread operator for pagination attrs
                }
                const res = await models.product_provider.findAll(opt);
                const result = JSON.parse(JSON.stringify(res, null, 2));
                resolve(result);
            }
            catch (err) { reject(err); }
        })
    },

    productsToggleFeatured: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const models = await ORM.getModels();
                let product = await models.product.findOne({
                    where: {
                        id: id
                    }
                });
                if (product) {  // if a product exists with the given id, toggle is_featured attr
                    product = JSON.parse(JSON.stringify(product, null, 2));
                    product = models.product.update({
                        is_featured: !product.is_featured,  // toggle
                    }, {
                        where: { id: id }
                    })
                    product = JSON.parse(JSON.stringify(product, null, 2));
                    resolve({ success: true })
                }
                else resolve({
                    success: false,
                    reason: `No product exists with the id ${id}`
                })
            }
            catch (err) { reject(err); }
        })
    },

    getCategories: async (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                const page = query.page;
                delete (query.page);
                const models = await ORM.getModels();
                let opt = {
                    where: query,   // query params will be used in where clause
                    ...(await middlewares.pagination(page))     // spread operator for pagination attrs
                }
                const res = await models.category.findAll(opt);
                const result = JSON.parse(JSON.stringify(res, null, 2));
                resolve(result);
            }
            catch (err) { reject(err); }
        })
    },

    getProviders: async (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                const page = query.page;
                delete (query.page);
                const models = await ORM.getModels();
                let opt = {
                    where: query,   // query params will be used in where clause
                    ...(await middlewares.pagination(page))     // spread operator for pagination attrs
                }
                const res = await models.provider.findAll(opt);
                const result = JSON.parse(JSON.stringify(res, null, 2));
                resolve(result);
            }
            catch (err) { reject(err); }
        })
    }
}