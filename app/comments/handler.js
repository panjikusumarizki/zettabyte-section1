const {
  addComment,
  getComments,
  getComment,
  updateComment,
  deleteComment
} = require('./service');

const createComment = async (req, res) => {
  try {
    const payload = req.body;

    await addComment(payload);

    res.status(201).json({
      status: 'success',
      message: 'Succeed add new comment'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const getAllComments = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comment = await getComments(articleId);

    res.status(200).json({
      status: 'success',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const getTheComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await getComment(id);
    
    res.status(200).json({
      status: 'success',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const comment = await updateComment(id, payload);

    if (comment === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: 'Succeed edit the comment',
        data: {
            id: comment._id,
            description: comment.description,
            author: comment.createdBy
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const deleteTheComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await deleteComment(id);
    console.log(comment);

    if (comment === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Succeed delete the comment'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

module.exports = {
  createComment,
  getAllComments,
  getTheComment,
  editComment,
  deleteTheComment
};