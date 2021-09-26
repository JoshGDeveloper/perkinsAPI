const router = require('express').Router();

const{
    crearPedido,
    obtenerPedido,
    modificarPedido,
    eliminarPedido,
    consultarCampos,
    limitar
} = require('../controllers/pedidos');

router.get('/',obtenerPedido);
router.get('/campos',consultarCampos);
router.get('/limite/:limite',limitar);
router.get('/:id',obtenerPedido);
router.post('/',crearPedido);
router.put('/:id', modificarPedido);
router.delete('/:id', eliminarPedido);

module.exports = router;