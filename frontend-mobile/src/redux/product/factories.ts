import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';

// factories/factories.js
const Factories = {
  getAllProducts: () => api.get(ApiConstants.GET_ALL_PRODUCTS),
  // Tạo sản phẩm mới với multipart/form-data
  createProduct: (product: any) => {
    console.log('here is api post');
    console.log('pr', product);

    return api.post(ApiConstants.CREATE_PRODUCT, product);
  },
    
  

  // Các phương thức khác không thay đổi
  updateProduct: (id, product) => {
    console.log('here is api post');
    console.log('pr', product);
    console.log('id>>>>', id);
    return api.put(`${ApiConstants.UPDATE_PRODUCT}/${id}`, product);
  },
  

  deleteProduct: (id) => api.delete(`${ApiConstants.DELETE_PRODUCT}/${id}`),
  

  getProductDetail: (id) => api.get(`${ApiConstants.GET_PRODUCT_DETAIL}/${id}`),

};

export default Factories;
