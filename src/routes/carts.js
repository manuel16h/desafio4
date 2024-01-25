import { Router } from 'express';
import { CartManager } from '../manager/cartManager.js';

const cartManager = new CartManager('carts.json');

const router = Router();

// Ruta raíz POST /api/carts - Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

// Ruta raíz GET /api/carts - Listar todos los productos
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const carts = await cartManager.getCarts(limit);
    res.json(carts);
});

// Ruta GET /api/carts/:cid - Listar los productos que pertenezcan al carrito con el cid proporcionado
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(+cid);
        if (!cart) {
            res.status(404).json({ message: 'Carrito no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Productos en el carrito', products: cart.products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta POST /api/carts/:cid/products/:pid - Agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);

        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
        res.status(200).json({ message: 'Producto agregado exitosamente', carrito: updatedCart });
    } catch (error) {
        if (error.message === 'no se logro agregar el producto') {
            res.status(404).json({ message: 'Carrito no encontrado' });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
});

export default router;