const express = require('express');
const router = express.Router();

router.get('/articles', (Req, res) => {
    res.send("Rota de Artigos");
});

router.get('/admin/articles/new');


module.exports = router;