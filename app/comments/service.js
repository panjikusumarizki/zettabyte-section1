const Comment = require('./model');
const Article = require('../articles/model');

const addComment = async (payload) => {
  try {
    const { articleId, description, createdBy } = payload;
    
    let article = await Article.findOne({ _id: articleId });
    
    const comment = await Comment.create({ articleId, description, createdBy });
    
    article.commentId.push({ _id: comment._id });
    await article.save();

    return comment;
  } catch (error) {
    return error
  }
}

const getComments = async (id) => {
  try {
    const comment = await Comment.find();

    return comment;
  } catch (error) {
    return error
  }
}

const getComment = async (id) => {
  try {
    const comment = await Comment.findOne({ _id: id });

    return comment;
  } catch (error) {
    return error
  }
}

const updateComment = async (id, payload) => {
  try {
    const comment = await Comment.findOneAndUpdate({ 
      _id: id 
    }, { 
      ...payload 
    }, { new: true, runValidators: true });

    return comment
  } catch (error) {
    return error
  }
}

const deleteComment = async (id) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: id });

    return comment;
  } catch (error) {
    return error
  }
}

module.exports = {
  addComment,
  getComments,
  getComment,
  updateComment,
  deleteComment
};