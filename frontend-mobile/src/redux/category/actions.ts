const CategoryActions = {
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',
  
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
  CREATE_CATEGORY_FAILURE: 'CREATE_CATEGORY_FAILURE',
};

// Action để fetch danh sách categories
export const fetchCategories = (onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: CategoryActions.FETCH_CATEGORIES,
  payload: { onSuccess, onFailed, onError },
});

// Action để tạo category mới
export const createCategory = (category: any, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: CategoryActions.CREATE_CATEGORY,
  payload: { category, onSuccess, onFailed, onError },
});

export default CategoryActions; 