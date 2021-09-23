const router = require('express').Router();

const{
    crearPedido,
    obtenerPedido,
    modificarPedido,
    eliminarPedido
} = require('../controllers/pedidos');

router.get('/',obtenerPedido);
router.post('/',crearPedido);
router.put('/:id', modificarPedido);
router.delete('/:id', eliminarPedido);

module.exports = router;