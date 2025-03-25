import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import TransactionActions from './actions';
import Factories from './factories';


    function* fetchListTransaction() {
        yield takeEvery(TransactionActions.FETCH_LIST_TRANSACTION, function* (action: any): any {
            const {onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.list_transaction(),
            );
            if (response?.status === 200) {
                yield put({
                type: TransactionActions.FETCH_LIST_TRANSACTION_SUCCESS,
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

    function* createTransaction() {
        yield takeEvery(TransactionActions.CREATE_TRANSACTION, function* (action: any): any {
          const {data, onSuccess, onFailed, onError} = action.payload;
          try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
              Factories.create_transaction(data),
            );
            if (response?.status === 201) {
              onSuccess && onSuccess();
              yield put({
                type: TransactionActions.CREATE_TRANSACTION_SUCCESS,
                payload: {
                  data: response.data.Data
                },
              });
            }else{
              onFailed && onFailed();
            }
          } catch (error) {
            onError && onError(error);
          }    
        });
      }


      function* deletCustomer() {
        yield takeEvery(TransactionActions.DELETE_TRANSACTION, function* (action: any): any {
          const {data, onSuccess, onFailed, onError} = action.payload;
          const id= data.id
          try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
              Factories.delete_transaction(id),
            );
            if (response?.status === 200) {
              onSuccess && onSuccess(response.data.Data);
              yield put({
                type: TransactionActions.DELETE_TRANSACTION,
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
    fork(fetchListTransaction),
    fork(createTransaction),
    fork(deletCustomer),

  ]);
}
