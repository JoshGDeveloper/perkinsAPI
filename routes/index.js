const router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to DeiveryApp api');
});

//router.use('/usuarios', require('./usuarios'));
//router.use('/mascotas', require('./mascotas'));
router.use('/recetas',require('./recetas'));

module.exports = router;