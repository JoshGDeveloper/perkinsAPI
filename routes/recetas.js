const router = require('express').Router();

const{
    crearReceta,
    obtenerReceta,
    modificarReceta,
    eliminarReceta,
    limitar
} = require('../controllers/recetas');

router.get('/',obtenerReceta);
router.get('/limite/:limite',limitar);
router.get('/:id',obtenerReceta);
router.post('/',crearReceta);
router.put('/:id', modificarReceta);
router.delete('/:id', eliminarReceta);

module.exports = router;