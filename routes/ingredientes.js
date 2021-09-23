const router = require('express').Router();

const{
    crearIngrediente,
    obtenerIngrediente,
    modificarIngrediente,
    eliminarIngrediente
} = require('../controllers/ingredientes');

router.get('/',obtenerIngrediente);
router.post('/',crearIngrediente);
router.put('/:id', modificarIngrediente);
router.delete('/:id', eliminarIngrediente);

module.exports = router;