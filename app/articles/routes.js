const express = require('express');
const router = express.Router();
const {
  createArticle,
  getAllArticle,
  getDetailArticle,
  editArticle,
  deleteTheArticle
} = require('./handler');

router.get('/', getAllArticle);
router.get('/:id', getDetailArticle);
router.post('/', createArticle);
router.put('/:id', editArticle);
router.delete('/:id', deleteTheArticle);

module.exports = router;