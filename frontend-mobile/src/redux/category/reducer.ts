import CategoryActions from './actions';

interface Category {
  _id: number;
  name: string;
  description?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
};

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CategoryActions.FETCH_CATEGORIES:
    case CategoryActions.CREATE_CATEGORY:
      return { ...state, loading: true, error: null };

    case CategoryActions.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload, error: null };
      
    case CategoryActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        error: null
      };

    case CategoryActions.FETCH_CATEGORIES_FAILURE:
    case CategoryActions.CREATE_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default categoryReducer; 