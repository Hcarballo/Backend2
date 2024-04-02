import Express from 'express';
import ProductManager from './productManager.js';

const classproducts = new ProductManager();

const app = Express();
const port = '8080';

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await classproducts.getProducts();
        if (!limit) {
            return res.send(products);
        } else {
            let limitProducts = products.slice(0, parseInt(limit));
            return res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
})

app.get('/product/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await classproducts.getProductsById(parseInt(pid));
        if (!product) {
            return res.send(`El Producto con el código ${pid} no existe`)
        } else {
            return res.send(product);
        }

    } catch (error) {
        console.log(error);
    }

})

app.listen(port, error => {
    console.log(`Escuchando Puerto: ${port}`);
})