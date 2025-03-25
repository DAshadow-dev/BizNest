import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';
import { store } from '@redux/store';

// factories/factories.js
const Factories = {
  getAllProducts: () => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    console.log('[Factories] Getting products with storeId:', storeId);
    
    // Nếu không có storeId, vẫn gửi request nhưng không có query param
    // Backend sẽ trả về lỗi phù hợp thay vì client-side error
    const url = storeId 
      ? `${ApiConstants.GET_ALL_PRODUCTS}?storeId=${storeId}` 
      : ApiConstants.GET_ALL_PRODUCTS;
      
    console.log('[Factories] API URL:', url);
    return api.get(url);
  },
  
  // Tạo sản phẩm mới với multipart/form-data
  createProduct: (product: any) => {
    console.log('[Factories] Creating product with FormData');
    
    if (product instanceof FormData) {
      // Kiểm tra FormData có đủ thông tin cần thiết không
      console.log('[Factories] FormData entries:');
      if (typeof product.forEach === 'function') {
        product.forEach((value: any, key: string) => {
          console.log(`[Factories] - ${key}: ${value instanceof File || value instanceof Blob ? 'File/Blob' : value}`);
        });
      }
    }
    
    return api.post(ApiConstants.CREATE_PRODUCT, product);
  },
  
  // Cập nhật sản phẩm với FormData
  updateProduct: (id: number | string, product: any) => {
    console.log('[Factories] Updating product:', id);
    
    if (product instanceof FormData) {
      // Kiểm tra FormData có đủ thông tin cần thiết không
      console.log('[Factories] FormData entries:');
      if (typeof product.forEach === 'function') {
        product.forEach((value: any, key: string) => {
          console.log(`[Factories] - ${key}: ${value instanceof File || value instanceof Blob ? 'File/Blob' : value}`);
        });
      }
    }
    
    // Lấy storeId từ Redux store để đảm bảo request có thông tin cửa hàng
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Thêm storeId vào FormData nếu chưa có
    if (product instanceof FormData && storeId && !product.get('storeId')) {
      product.append('storeId', storeId.toString());
      console.log('[Factories] Added storeId to FormData:', storeId);
    }
    
    console.log(`[Factories] PUT request to: ${ApiConstants.UPDATE_PRODUCT}/${id}`);
    return api.put(`${ApiConstants.UPDATE_PRODUCT}/${id}`, product);
  },
  
  // Xóa sản phẩm 
  deleteProduct: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    const url = storeId 
      ? `${ApiConstants.DELETE_PRODUCT}/${id}?storeId=${storeId}` 
      : `${ApiConstants.DELETE_PRODUCT}/${id}`;
      
    console.log('[Factories] Delete product URL:', url);
    return api.delete(url);
  },
  
  // Lấy chi tiết sản phẩm
  getProductDetail: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    const url = storeId 
      ? `${ApiConstants.GET_PRODUCT_DETAIL}/${id}?storeId=${storeId}` 
      : `${ApiConstants.GET_PRODUCT_DETAIL}/${id}`;
      
    console.log('[Factories] Get product detail URL:', url);
    return api.get(url);
  },
};

export default Factories;
