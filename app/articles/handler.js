const {
  addArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require('./service');

const createArticle = async (req, res) => {
  try {
    const payload = req.body;

    await addArticle(payload);

    res.status(201).json({
      status: 'success',
      message: 'Succeed add new article'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const getAllArticle = async (req, res) => {
  try {
    const { sortBy, sortType, keyword, page, size } = req.query;
    let defPage = 1;
    let defSize = 5;
    let newPage = page ? parseInt(page) : defPage;
    let newSize = size ? parseInt(size) : defSize;

    const article = await getArticles(sortBy, sortType, keyword, newPage, newSize);

    if (keyword) {
      for (let i in article.docs) {
        res.status(200).json({
          status: 'success',
          data: article.docs[i].doc,
          page: article.page,
          totalData: article.totalDocs,
          totalPage: article.totalPages,
          prevPage: article.prevPage,
          nextPage: article.nextPage
        });
      }
    } else {
      res.status(200).json({
        status: 'success',
        data: article.docs,
        page: article.page,
        totalData: article.totalDocs,
        totalPage: article.totalPages,
        prevPage: article.prevPage,
        nextPage: article.nextPage
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const getDetailArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await getArticle(id);

    res.status(200).json({
      status: 'success',
      data: article
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const editArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const article = await updateArticle(id, payload);

    if (article === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: 'Succeed edit the article',
        data: {
            id: article._id,
            title: article.title,
            short_description: article.short_description,
            description: article.description,
            author: article.createdBy
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

const deleteTheArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await deleteArticle(id);

    if (article === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Succeed delete the article'
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
  createArticle,
  getAllArticle,
  getDetailArticle,
  editArticle,
  deleteTheArticle
};