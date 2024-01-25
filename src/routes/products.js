import { Router } from 'express';
import { ProductManager } from '../manager/ProductManager.js';

const productManager = new ProductManager('products.json');

const router = Router();

// Ruta raíz GET /api/products - Listar todos los productos
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json(products);
});

// Ruta GET /api/products/:pid - Traer sólo el producto con el id proporcionado
router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'No se encuentra el producto' });
    }
});

// Ruta raíz POST /api/products - Agregar un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, category, thumbnail, code, stock } = req.body;
    try {
        const newProduct = await productManager.addProduct(title, description, price, category, thumbnail, code, stock);
        res.status(201).json({ message: 'Se agrego exitosamente el producto', newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta PUT /api/products/:pid - Actualizar un producto
router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const { title, description, price, category, thumbnail, code, stock } = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(pid, { title, description, price, category, thumbnail, code, stock });
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'producto actualizado correctamente' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta DELETE /api/products/:pid - Eliminar un producto
router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const result = await productManager.deleteProduct(pid);
    if (result) {
        res.json({ message: 'No se logro eliminar el producto' });
    } else {
        res.status(404).json({ message: 'Producto eliminado' });
    }
});

export default router;