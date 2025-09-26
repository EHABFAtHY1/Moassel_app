// 📁 routes/bookmark.routes.js
const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmark.controller');


router.post('/',
    BookmarkController.addBookmark);
router.get('/', BookmarkController.getBookmarks);
router.delete('/:id', BookmarkController.removeBookmark);

module.exports = router;