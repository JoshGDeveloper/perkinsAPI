const router = require('express').Router();

const{
    crearCliente,
    obtenerCliente,
    modificarCliente,
    eliminarCliente,
    limitar
} = require('../controllers/clientes');

router.get('/',obtenerCliente);
router.get('/limite/:limite',limitar);
router.get('/:id',obtenerCliente);
router.post('/',crearCliente);
router.put('/:id', modificarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;