const ORM = require('./ORM');
const middlewares = require('./middlewares');
module.exports = {
    getProducts: async (query) => {
        try {
            const page = query.page;
            delete (query.page);
            const models = await ORM.getModels();
            let opt = {
                include: [{
                    model: models.product,
                    as: 'product',
                    required: true,
                    where: query
                },
                {
                    model: models.provider,
                    as: 'provider',
                    required: true
                }],
                where: {
                    is_available: true
                },
                order: [
                    [models.product, 'id', 'ASC'],
                    ['price', 'ASC']
                ],
                attributes: { exclude: ['product_id', 'provider_id'] },
                ...(await middlewares.pagination(page))
            }
            const res = await models.product_provider.findAll(opt);
            const result = JSON.parse(JSON.stringify(res, null, 2));
            return result;
        }
        catch (err) { console.error(err); }
    },

    productsToggleFeatured: async (id) => {
        try {
            const models = await ORM.getModels();
            let product = await models.product.findOne({ where: { id: id } });
            if (product) {
                product = JSON.parse(JSON.stringify(product, null, 2));
                product = models.product.update({
                    is_featured: !product.is_featured,
                }, {
                    where: { id: id }
                })
                product = JSON.parse(JSON.stringify(product, null, 2));
                console.log(product);
            }
        }
        catch (err) { console.error(err); }
    }
}