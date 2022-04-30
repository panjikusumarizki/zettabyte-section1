const express = require('express');
const router = express.Router();
const {
  createComment,
  getAllComments,
  getTheComment,
  editComment,
  deleteTheComment
} = require('./handler');

router.get('/', getAllComments);
router.get('/:id', getTheComment);
router.post('/', createComment);
router.put('/:id', editComment);
router.delete('/:id', deleteTheComment);

module.exports = router;