const router = require('express').Router();

const{
    crearCliente,
    obtenerCliente,
    modificarCliente,
    eliminarCliente
} = require('../controllers/clientes');

router.get('/',obtenerCliente);
router.get('/:id',obtenerCliente);
router.post('/',crearCliente);
router.put('/:id', modificarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;