const Category = require('./model');

const addCategory = async (payload) => {
  try {
    const category = await Category.create(payload)

    return category
  } catch (error) {
    return error
  }
}

const getAllCategory = async () => {
  try {
    const category = await Category.find()

    return category
  } catch (error) {
    return error
  }
}

const updateCategory = async (id, payload) => {
  try {
    const category = await Category.findOneAndUpdate({ 
      _id: id 
    }, {
      ...payload
    }, { new: true, runValidators: true })

    return category
  } catch (error) {
    return error
  }
}

const deleteCategory = async (id) => {
  try {
    const category = await Category.findOneAndDelete({ _id: id });
    
    return category
  } catch (error) {
    return error
  }
}

module.exports = {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
};