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
    let aggregate = Article.aggregate();
    if (keyword) {
      aggregate.match({ title: { $regex: `${keyword}`, $options: 'i' }})
      .group({
        _id: '$_id', doc: { $first: '$$ROOT' }
      })
    }

    let options;
    if (sortBy) {
      let type;
      if (sortType === 'desc') {
        type = -1;
      } else if (sortType === 'asc') {
        type = -1;
      }

      options = {
        page: page, 
        limit: size, 
        sort: { _id: 1, createdAt: type },
      }
    } else {
      options = {
        page: page, limit: size
      }
    }

    const result = await Article.aggregatePaginate(aggregate, options)

    return result;
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