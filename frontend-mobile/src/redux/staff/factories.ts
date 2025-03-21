import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';
import { store } from '@redux/store';

// factories/factories.js
const Factories = {
  // getAllSTAFFS: () => api.get(ApiConstants.GET_ALL_STAFFS),

  getAllSTAFFS: () => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    console.log('🔍 FETCH ALL STAFFS - User:', User.Auth);
    console.log('🔍 FETCH ALL STAFFS - StoreId from Redux:', storeId, typeof storeId);
    
    // Xây dựng URL với storeId nếu có
    const url = storeId 
      ? `${ApiConstants.GET_ALL_STAFFS}?storeId=${storeId}` 
      : ApiConstants.GET_ALL_STAFFS;
      
    console.log('🔍 FETCH ALL STAFFS - API Call:', url);
    
    return api.get(url)
      .then(response => {
        console.log('✅ FETCH ALL STAFFS - Response:', response.status, response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ FETCH ALL STAFFS - Error:', error.response?.status, error.response?.data || error.message);
        throw error;
      });
  },
  // Tạo staff mới với multipart/form-data
  createStaff: (staff: any) => {
    console.log('Creating staff with data:', staff);
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;

    // Tạo FormData để gửi dữ liệu bao gồm file ảnh
    const formData = new FormData();

    // Chuyển đổi từ firstName + lastName thành username
    formData.append('username', `${staff.firstName} ${staff.lastName}`);

    // Thêm password mặc định hoặc sử dụng từ staff nếu có
    formData.append('password', staff.password || 'Staff@123');

    // Thêm các trường khác
    formData.append('email', staff.email);
    formData.append('phone', staff.phone);
    formData.append('role', 'staff'); // Luôn là 'staff'
    formData.append('status', staff.status || 'active');

    // Thêm storeId từ Redux store nếu có, hoặc từ data nếu được cung cấp
    console.log('📝 CREATE STAFF - StoreId:', storeId || staff.storeId || 'Not provided');
    formData.append('storeId', storeId || staff.storeId || '');

    // Thêm hình ảnh nếu có
    if (staff.image) {
      // Nếu image là đường dẫn file (từ ImagePicker)
      if (typeof staff.image === 'string' && staff.image.startsWith('file:')) {
        const fileName = staff.image.split('/').pop();
        const fileType = staff.image.split('.').pop();
        
        formData.append('image', {
          uri: staff.image,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
        
        console.log('📝 CREATE STAFF - Image attached as file');
      }
      // Nếu image đã là một URL
      else if (typeof staff.image === 'string') {
        formData.append('image', staff.image);
        console.log('📝 CREATE STAFF - Image attached as URL');
      }
    }

    return api.post(ApiConstants.CREATE_STAFF, formData);
  },

  // Cập nhật staff với multipart/form-data
  updateStaff: (id: string, staff: any) => {
    console.log('Updating staff with ID:', id);
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();

    // Tên đầy đủ từ firstName và lastName
    const fullName = `${staff.firstName} ${staff.lastName}`;
    formData.append('username', fullName);

    // Thêm các trường khác
    formData.append('email', staff.email);
    formData.append('phone', staff.phone);
    formData.append('status', staff.status || 'active');
    
    // Thêm storeId từ Redux store nếu có, hoặc từ data nếu được cung cấp
    console.log('📝 UPDATE STAFF - StoreId:', storeId || staff.storeId || 'Not provided');
    formData.append('storeId', storeId || staff.storeId || '');

    // Thêm hình ảnh nếu có
    if (staff.image) {
      // Nếu image là đường dẫn file (từ ImagePicker)
      if (typeof staff.image === 'string' && staff.image.startsWith('file:')) {
        const fileName = staff.image.split('/').pop();
        const fileType = staff.image.split('.').pop();
        
        formData.append('image', {
          uri: staff.image,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
        
        console.log('📝 UPDATE STAFF - Image attached as file');
      }
      // Nếu image đã là một URL
      else if (typeof staff.image === 'string') {
        formData.append('image', staff.image);
        console.log('📝 UPDATE STAFF - Image attached as URL');
      }
    }

    // Thêm query param storeId nếu có
    const url = storeId 
      ? `${ApiConstants.UPDATE_STAFF}/${id}?storeId=${storeId}` 
      : `${ApiConstants.UPDATE_STAFF}/${id}`;

    console.log('📝 UPDATE STAFF - API URL:', url);
    return api.put(url, formData);
  },

  // Xóa staff
  deleteStaff: (id: string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Thêm query param storeId nếu có
    const url = storeId 
      ? `${ApiConstants.DELETE_STAFF}/${id}?storeId=${storeId}` 
      : `${ApiConstants.DELETE_STAFF}/${id}`;
      
    console.log('🗑️ DELETE STAFF - API URL:', url);
    return api.delete(url);
  },

  // Lấy chi tiết staff
  getStaffDetail: (id: string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Thêm query param storeId nếu có
    const url = storeId 
      ? `${ApiConstants.GET_STAFF_DETAIL}/${id}?storeId=${storeId}` 
      : `${ApiConstants.GET_STAFF_DETAIL}/${id}`;
      
    console.log('🔍 GET STAFF DETAIL - API URL:', url);
    return api.get(url);
  },

  // Tìm kiếm staff
  searchStaff: (query: string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;
    
    // Xây dựng URL tìm kiếm với storeId nếu có
    let url = `${ApiConstants.SEARCH_STAFF}?query=${encodeURIComponent(query)}`;
    if (storeId) {
      url += `&storeId=${storeId}`;
    }
    
    console.log('🔍 SEARCH STAFF - API URL:', url);
    return api.get(url);
  },
};

export default Factories;
