import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';

// factories/factories.js
const Factories = {
  // getAllSTAFFS: () => api.get(ApiConstants.GET_ALL_STAFFS),

  getAllSTAFFS: () => {
    console.log('🔍 FETCH ALL STAFFS - API Call:', ApiConstants.GET_ALL_STAFFS);
    return api.get(ApiConstants.GET_ALL_STAFFS)
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

    // Thêm storeId mặc định
    const defaultStoreId = '67b58b4cdf51987bf69c9914';
    console.log('📝 CREATE STAFF - StoreId:', staff.storeId || defaultStoreId);
    formData.append('storeId', staff.storeId || defaultStoreId);

    // // Thêm storeId nếu có
    // if (staff.storeId) {
    //   formData.append('storeId', staff.storeId);
    // }

    // Thêm ảnh nếu có
    if (staff.image) {
      // Tạo file từ URI
      const uriParts = staff.image.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const imageFile = {
        uri: staff.image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      };

      formData.append('image', imageFile as any);
    }

    return api.post(ApiConstants.CREATE_STAFF, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Cập nhật staff với multipart/form-data
  updateStaff: (id: any, staff: any) => {
    console.log('🔄 UPDATE STAFF - ID:', id);
    console.log('🔄 UPDATE STAFF - Input data:', JSON.stringify(staff, null, 2));

    // Tạo FormData để gửi dữ liệu bao gồm file ảnh
    const formData = new FormData();

    // Chuyển đổi từ firstName + lastName thành username
    const username = `${staff.firstName} ${staff.lastName}`;
    console.log('🔄 UPDATE STAFF - Username:', username);
    formData.append('username', username);

    // Thêm các trường khác
    formData.append('email', staff.email);
    formData.append('phone', staff.phone);
    formData.append('status', staff.status || 'active');

    // Thêm storeId mặc định
    const defaultStoreId = '67b58b4cdf51987bf69c9914';
    console.log('🔄 UPDATE STAFF - StoreId:', staff.storeId || defaultStoreId);
    formData.append('storeId', staff.storeId || defaultStoreId);

    // Xử lý ảnh
    if (staff.image) {
      // Nếu là ảnh mới (URI local), tạo file từ URI
      if (!staff.image.startsWith('http')) {
        console.log('🔄 UPDATE STAFF - Uploading new image');
        const uriParts = staff.image.split('.');
        const fileType = uriParts[uriParts.length - 1];

        const imageFile = {
          uri: staff.image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        };

        formData.append('image', imageFile as any);
      } else {
        // Nếu là URL từ server, gửi URL đó
        console.log('🔄 UPDATE STAFF - Keeping existing image URL');
        formData.append('image', staff.image);
      }
    } else {
      console.log('🔄 UPDATE STAFF - No image provided');
    }

    return api.put(`${ApiConstants.UPDATE_STAFF}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Xóa staff
  deleteStaff: (id: any) => api.delete(`${ApiConstants.DELETE_STAFF}/${id}`),

  // Lấy chi tiết staff
  getStaffDetail: (id: any) => api.get(`${ApiConstants.GET_STAFF_DETAIL}/${id}`),

  // Tìm kiếm staff
  searchStaff: (query: string) => {
    console.log('🔍 SEARCH STAFF - API Call:', `${ApiConstants.SEARCH_STAFF}?query=${encodeURIComponent(query)}`);
    return api.get(`${ApiConstants.SEARCH_STAFF}?query=${encodeURIComponent(query)}`)
      .then(response => {
        console.log('✅ SEARCH STAFF - Response:', response.status, response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ SEARCH STAFF - Error:', error.response?.status, error.response?.data || error.message);
        throw error;
      });
  },
};

export default Factories;
