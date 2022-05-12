const Article = require('./model');

const addArticle = async (payload) => {
  try {
    const { 
      title, short_description, description, createdBy, categoryId 
    } = payload;

    const article = await Article.create({ title, short_description, description, createdBy, categoryId });

    return article;
  } catch (error) {
    return error;
  }
};

const getArticles = async (sortBy, sortType, keyword, page, size) => {
  try {
    let newSortType
    if (sortType === 'asc') {
      newSortType = 1
    } else if (sortType === 'desc') {
      newSortType = -1
    }
    
    let $match = {};

    if (keyword) {
      $match.$or = [{title: {$regex: keyword, $options: 'i'}}];
    }

    const parameter = [{
      $match
    }, {
      $project: {
        _id: 1,
        title: 1,
        short_description: 1,
        description: 1,
        createdBy: 1,
        createdAt: 1,
        updated: 1,
        category: 1,
        comments: 1
      }
    }]

    const parameterCount = [{
      $match
    }, {
      $group: {
        _id: null,
        count: {
          $sum: 1
        }
      }
    }]

    let param = parameter
    const parameterSort = {};
    parameterSort[sortBy] = newSortType
    parameterSort._id = newSortType
    const parameterPage = size * (page - 1)
    const newSize = size * page

    const article = await Article.aggregate(param).sort(parameterSort).limit(newSize).skip(parameterPage)
    const count = await Article.aggregate(parameterCount)
    
    return { article, count };
  } catch (error) {
    return error;
  }
};

const getArticle = async (id) => {
  try {
    const article = await Article.findOne({ _id: id })
    .populate('comments', 'description createdBy createdAt updatedAt')
    .populate('category', 'name');

    return article;
  } catch (error) {
    return error;
  }
};

const updateArticle = async (id, payload) => {
  try {
    const article = await Article.findOneAndUpdate({
      _id: id
    }, {
      ...payload
    }, { new: true, runValidators: true });

    return article;
  } catch (error) {
    return error;
  }
};

const deleteArticle = async (id) => {
  try {
    const article = await Article.findOneAndDelete({ _id: id })

    return article;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
};