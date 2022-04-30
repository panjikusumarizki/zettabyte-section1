const {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
} = require('./service');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(403).json({
        status: 'error',
        message: 'Name of the category must be define'
      });
    } else {
      await addCategory({ name });

      res.status(201).json({
        status: 'success',
        message: 'Succeed add new category'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await getAllCategory();

    let payload = []
        
    for (let i = 0; i < category.length; i++) {
      payload.push({
        id: category[i]._id,
        name: category[i].name
      });
    }

    res.status(200).json({
      status: 'success',
      data: payload
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body;

    const category = await updateCategory(id, name);

    if (category === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: 'Succeed edit the category',
        data: {
            id: category.id,
            name: category.name
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

const deleteTheCategory = async (req, res) => {
  try {
    const { id } = req.params

    const category = await deleteCategory(id);
    
    if (category === null) {
      res.status(404).json({
        status: 'error',
        message: 'Data not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Succeed delete the category'
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
  createCategory,
  getCategory,
  editCategory,
  deleteTheCategory
};