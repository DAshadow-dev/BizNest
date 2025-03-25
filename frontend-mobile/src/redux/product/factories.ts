import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';
import { store } from '@redux/store';

// factories/factories.js
const Factories = {
  getAllProducts: () => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    
    // Nếu không có storeId, vẫn gửi request nhưng không có query param
    // Backend sẽ trả về lỗi phù hợp thay vì client-side error
    const url = storeId 
      ? `${ApiConstants.GET_ALL_PRODUCTS}?storeId=${storeId}` 
      : ApiConstants.GET_ALL_PRODUCTS;
      
    return api.get(url);
  },
  
  // Tạo sản phẩm mới với multipart/form-data
  createProduct: (product: any) => {
    
    if (product instanceof FormData) {
      // Kiểm tra FormData có đủ thông tin cần thiết không
      if (typeof product.forEach === 'function') {
        product.forEach((value: any, key: string) => {
        });
      }
    }
    
    return api.post(ApiConstants.CREATE_PRODUCT, product);
  },
  
  // Cập nhật sản phẩm với FormData
  updateProduct: (id: number | string, product: any) => {
    
    if (product instanceof FormData) {
      // Kiểm tra FormData có đủ thông tin cần thiết không
      if (typeof product.forEach === 'function') {
        product.forEach((value: any, key: string) => {
        });
      }
    }
    
    // Lấy storeId từ Redux store để đảm bảo request có thông tin cửa hàng
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Thêm storeId vào FormData nếu chưa có
    if (product instanceof FormData && storeId && !product.get('storeId')) {
      product.append('storeId', storeId.toString());
    }
    
    return api.put(`${ApiConstants.UPDATE_PRODUCT}/${id}`, product);
  },
  
  // Xóa sản phẩm 
  deleteProduct: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    const url = storeId 
      ? `${ApiConstants.DELETE_PRODUCT}/${id}?storeId=${storeId}` 
      : `${ApiConstants.DELETE_PRODUCT}/${id}`;
      
    return api.delete(url);
  },
  
  // Lấy chi tiết sản phẩm
  getProductDetail: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    const url = storeId 
      ? `${ApiConstants.GET_PRODUCT_DETAIL}/${id}?storeId=${storeId}` 
      : `${ApiConstants.GET_PRODUCT_DETAIL}/${id}`;
      
    return api.get(url);
  },
};

export default Factories;
