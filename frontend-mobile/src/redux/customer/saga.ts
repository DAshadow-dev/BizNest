import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import CustomerActions from './actions';
import Factories from './factories';


    function* fetchListCustomer() {
        yield takeEvery(CustomerActions.FETCH_LIST_CUSTOMER, function* (action: any): any {
            const {onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.list_customer(),
            );
            if (response?.status === 200) {
                yield put({
                type: CustomerActions.FETCH_LIST_CUSTOMER_SUCCESS,
                payload: {
                    data: response.data.Data
                },
                });
            }else{
                onFailed && onFailed(response.data.MsgNo);
            }
            } catch (error) {
            onError && onError(error);
            }    
        });
    }

    function* createCustomer() {
        yield takeEvery(CustomerActions.CREATE_CUSTOMER, function* (action: any): any {
          const {data, onSuccess, onFailed, onError} = action.payload;
          try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
              Factories.create_customer(data),
            );
            if (response?.status === 201) {
              onSuccess && onSuccess(response.data.Data);
              yield put({
                type: CustomerActions.CREATE_CUSTOMER_SUCCESS,
                payload: {
                  data: response.data.Data
                },
              });
            }else{
              onFailed && onFailed(response.data.MsgNo);
            }
          } catch (error) {
            onError && onError(error);
          }    
        });
      }


      function* deletCustomer() {
        yield takeEvery(CustomerActions.DELET_CUSTOMER, function* (action: any): any {
          const {data, onSuccess, onFailed, onError} = action.payload;
          const id= data.id
          try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
              Factories.delete_customer(id),
            );
            if (response?.status === 200) {
              onSuccess && onSuccess(response.data.Data);
              yield put({
                type: CustomerActions.DELET_CUSTOMER_SUCCESS,
                payload: {
                  data: id
                },
              });
            }else{
              onFailed && onFailed(response.data.MsgNo);
            }
          } catch (error) {
            onError && onError(error);
          }    
        });
      }

export default function* customerSaga() {
  yield all([
    fork(fetchListCustomer),
    fork(createCustomer),
    fork(deletCustomer),
  ]);
}
