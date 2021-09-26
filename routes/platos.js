const router = require('express').Router();
const {
    crearPlato,
    obtenerPlato,
    modificarPlato,
    eliminarPlato,
    buscarPlato
} = require('../controllers/platos');

router.get('/',obtenerPlato);
router.get('/pornombre/:nombre', buscarPlato);
router.get('/:id',obtenerPlato);
router.post('/',crearPlato);
router.put('/:id', modificarPlato);
router.delete('/:id', eliminarPlato);

module.exports = router;