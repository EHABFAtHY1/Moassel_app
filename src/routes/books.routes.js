const router = require('express').Router();
const bc = require('../controllers/books.controller');

router.post('/', bc.createBook);
router.get('/', bc.getBooks);
router.get('/:id', bc.getBook);
router.put('/:id', bc.updateBook);
router.delete('/:id', bc.deleteBook);

module.exports = router;
