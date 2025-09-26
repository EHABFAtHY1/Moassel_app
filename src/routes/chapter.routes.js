const router = require('express').Router();
const cc = require('../controllers/chapter.controller');

router.post('/', cc.createChapter);
router.get('/', cc.getChapters);
router.get('/:id', cc.getChapter); // اختياري
router.put('/:id', cc.updateChapter);
router.delete('/:id', cc.deleteChapter);

module.exports = router;
