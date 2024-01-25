import { Router } from 'express';
import { ProductManager } from '../manager/ProductManager.js';

const router = Router();
const productManager = new ProductManager('products.json');

router.get('/', async (req, res) => {
    let products = await productManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;