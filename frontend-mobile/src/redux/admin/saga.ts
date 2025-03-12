import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import Factories from './factories';
import AdminActions from './actions';


    function* fetchListBussinessOnwer() {
        yield takeEvery(AdminActions.FETCH_LIST_BUSSINESS_OWNER, function* (action: any): any {
            const {onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.list_bussiness_onwer(),
            );
            if (response?.status === 200) {
                yield put({
                type: AdminActions.FETCH_LIST_BUSSINESS_OWNER_SUCCESS,
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

    function* toggleAccountStatus() {
        yield takeEvery(AdminActions.TOGGLE_ACCOUNT_STATUS, function* (action: any): any {
            const {id, onSuccess, onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.toggle_account_status(id),
            );
            if (response?.status === 200) {
                yield put({
                type: AdminActions.TOGGLE_ACCOUNT_STATUS_SUCCESS,
                payload: {
                    id: id
                },
                });
                onSuccess && onSuccess({message: "Update information successfully"})
            }else{
                onFailed && onFailed(response.data.MsgNo);
            }
            } catch (error) {
            onError && onError(error);
            }    
        });
    }


    function* approveAccount() {
        yield takeEvery(AdminActions.APPROVE_ACCOUNT, function* (action: any): any {
            const {id, onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.toggle_account_status(id),
            );
            if (response?.status === 200) {
                yield put({
                type: AdminActions.APPROVE_ACCOUNT_SUCCESS,
                payload: {
                    id: id
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

    function* rejectAccount() {
        yield takeEvery(AdminActions.REJECT_ACCOUNT, function* (action: any): any {
            const {id, onFailed, onError} = action.payload;
            try {
            const response: CommonResponse<CodeResponse> = yield call(() =>
                Factories.toggle_account_status(id),
            );
            if (response?.status === 200) {
                yield put({
                type: AdminActions.REJECT_ACCOUNT_SUCCESS,
                payload: {
                    id: id
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

  

export default function* adminSaga() {
  yield all([
    fork(fetchListBussinessOnwer),
    fork(toggleAccountStatus),
    fork(approveAccount),
    fork(rejectAccount),
  ]);
}