import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import ChatActions from './actions';
import Factories from './factories';

function* handleChatSaga(action: any, factoryFunction: Function, successAction: string, failureAction: string) {
  const { data, onSuccess, onFailure, onError } = action.payload;

  try {
    const response: CommonResponse<CodeResponse> = yield call(() => factoryFunction(data));
    
    if (response?.status === 200) {
      onSuccess && onSuccess(response.data.Data);
      yield put({ type: successAction, payload: { res: response.data.Data } });
    } else {
      onFailure && onFailure(response.data.MsgNo);
      yield put({ type: failureAction });
    }
  } catch (error) {
    onError && onError(error);
    yield put({ type: failureAction });
  }
}

// Xử lý gửi tin nhắn
export function* sendMessage() {
  yield takeEvery(ChatActions.SEND_MESSAGE, function* (action: any): any {
    yield handleChatSaga(action, Factories.sendMessage, ChatActions.SEND_MESSAGE_SUCCESS, ChatActions.SEND_MESSAGE_FAILURE);
  });
}

// Xử lý nhận tin nhắn
export function* receiveMessage() {
  yield takeEvery(ChatActions.RECEIVE_MESSAGE, function* (action: any): any {
    yield handleChatSaga(action, Factories.receiveMessage, ChatActions.RECEIVE_MESSAGE_SUCCESS, ChatActions.RECEIVE_MESSAGE_FAILURE);
  });
}

// Xử lý lấy lịch sử tin nhắn
export function* fetchChatHistory() {
  yield takeEvery(ChatActions.FETCH_MESSAGES, function* (action: any): any {
    yield handleChatSaga(action, Factories.fetchMessages, ChatActions.FETCH_MESSAGES_SUCCESS, ChatActions.FETCH_MESSAGES_FAILURE);
  });
}

export default function* chatSaga() {
  yield all([
    fork(sendMessage),
    fork(receiveMessage),
    fork(fetchChatHistory),
  ]);
}
