const staffActions = {
    FETCH_STAFFS: 'FETCH_STAFFS',
    FETCH_STAFFS_SUCCESS: 'FETCH_STAFFS_SUCCESS',
    FETCH_STAFFS_FAILURE: 'FETCH_STAFFS_FAILURE',
  
    CREATE_STAFF: 'CREATE_STAFF',
    CREATE_STAFF_SUCCESS: 'CREATE_STAFF_SUCCESS',
    CREATE_STAFF_FAILURE: 'CREATE_STAFF_FAILURE',
  
    UPDATE_STAFF: 'UPDATE_STAFF',
    UPDATE_STAFF_SUCCESS: 'UPDATE_STAFF_SUCCESS',
    UPDATE_STAFF_FAILURE: 'UPDATE_STAFF_FAILURE',
  
    DELETE_STAFF: 'DELETE_STAFF',
    DELETE_STAFF_SUCCESS: 'DELETE_STAFF_SUCCESS',
    DELETE_STAFF_FAILURE: 'DELETE_STAFF_FAILURE',
  
    FETCH_STAFF_DETAIL: 'FETCH_STAFF_DETAIL',
    FETCH_STAFF_DETAIL_SUCCESS: 'FETCH_STAFF_DETAIL_SUCCESS',
    FETCH_STAFF_DETAIL_FAILURE: 'FETCH_STAFF_DETAIL_FAILURE',

    SEARCH_STAFFS: 'SEARCH_STAFFS',
    SEARCH_STAFFS_SUCCESS: 'SEARCH_STAFFS_SUCCESS',
    SEARCH_STAFFS_FAILURE: 'SEARCH_STAFFS_FAILURE',
  };
  
  // Action để fetch sản phẩm
  export const fetchStaff = (onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.FETCH_STAFFS,
    payload: { onSuccess, onFailed, onError },
  });
  
  // Action thành công khi lấy sản phẩm
  export const fetchSTAFFsSuccess = (staffs: any) => ({
    type: staffActions.FETCH_STAFFS_SUCCESS,
    payload: staffs,
  });
  
  // Action thất bại khi lấy sản phẩm
  export const fetchStaffsFailure = (error: any) => ({
    type: staffActions.FETCH_STAFFS_FAILURE,
    payload: error,
  });
  
  // Action để tạo sản phẩm
  export const createStaff = (staff: any, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.CREATE_STAFF,
    payload: { staff, onSuccess, onFailed, onError },
  });
  
  // Action thành công khi tạo sản phẩm
  export const createstaffSuccess = (staff: any) => ({
    type: staffActions.CREATE_STAFF_SUCCESS,
    payload: staff,
  });
  
  // Action thất bại khi tạo sản phẩm
  export const createStaffFailure = (error: any) => ({
    type: staffActions.CREATE_STAFF_FAILURE,
    payload: error,
  });
  
  // Action để cập nhật sản phẩm
  export const updateStaff = (id: any, staff: any, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.UPDATE_STAFF,
    payload: { id, staff, onSuccess, onFailed, onError },
  });
  
  // Action thành công khi cập nhật sản phẩm
  export const updateStaffSuccess = (staff: any) => ({
    type: staffActions.UPDATE_STAFF_SUCCESS,
    payload: staff,
  });
  
  // Action thất bại khi cập nhật sản phẩm
  export const updateStaffFailure = (error: any) => ({
    type: staffActions.UPDATE_STAFF_FAILURE,
    payload: error,
  });
  
  // Action để xóa sản phẩm
  export const deleteStaff = (id: any, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.DELETE_STAFF,
    payload: { id, onSuccess, onFailed, onError },
  });
  
  // Action thành công khi xóa sản phẩm
  export const deleteStaffSuccess = (id: any) => ({
    type: staffActions.DELETE_STAFF_SUCCESS,
    payload: id,
  });
  
  // Action thất bại khi xóa sản phẩm
  export const deleteStaffFailure = (error: any) => ({
    type: staffActions.DELETE_STAFF_FAILURE,
    payload: error,
  });
  
  
  // ✅ Action để fetch chi tiết sản phẩm
  export const fetchStaffDetail = (id: any, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.FETCH_STAFF_DETAIL,
    payload: { id, onSuccess, onFailed, onError },
  });
  
  // ✅ Action thành công khi lấy chi tiết sản phẩm
  export const fetchStaffDetailSuccess = (staff: any) => ({
    type: staffActions.FETCH_STAFF_DETAIL_SUCCESS,
    payload: staff,
  });
  
  // ✅ Action thất bại khi lấy chi tiết sản phẩm
  export const fetchStaffDetailFailure = (error: any) => ({
    type: staffActions.FETCH_STAFF_DETAIL_FAILURE,
    payload: error,
  });

  // ✅ Action để tìm kiếm nhân viên
  export const searchStaffs = (query: string, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: staffActions.SEARCH_STAFFS,
    payload: { query, onSuccess, onFailed, onError },
  });

  // ✅ Action thành công khi tìm kiếm nhân viên
  export const searchStaffsSuccess = (staffs: any) => ({
    type: staffActions.SEARCH_STAFFS_SUCCESS,
    payload: staffs,
  });

  // ✅ Action thất bại khi tìm kiếm nhân viên
  export const searchStaffsFailure = (error: any) => ({
    type: staffActions.SEARCH_STAFFS_FAILURE,
    payload: error,
  });

  export default staffActions;
  