import ApiConstants from 'src/adapter/ApiConstants'
import api from '@libs/api';


// factories/factories.js
const Factories = {
  // Lấy danh sách sản phẩm
  getAllProducts: () => api.get(ApiConstants.GET_ALL_PRODUCTS),

  // Tạo sản phẩm mới
  createProduct: (product) =>
    api.post(ApiConstants.CREATE_PRODUCT, { data: product }),

  // Cập nhật sản phẩm
  updateProduct: (id, product) =>
    api.put(`${ApiConstants.UPDATE_PRODUCT}/${id}`, { data: product }),

  // Xóa sản phẩm
  deleteProduct: (id) => api.delete(`${ApiConstants.DELETE_PRODUCT}/${id}`),
};

export default Factories;

