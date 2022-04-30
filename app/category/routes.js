const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategory,
  editCategory,
  deleteTheCategory
} = require('./handler');

router.get('/', getCategory);
router.post('/', createCategory);
router.put('/:id', editCategory);
router.delete('/:id', deleteTheCategory);

module.exports = router;