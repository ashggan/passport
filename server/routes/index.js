const experess = require('express');
const router = experess.Router();

router.get('/',(req,res)=>{
    res.render('home');
});

module.exports = router;