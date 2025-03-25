import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import ChatActions from './actions';
import Factories from './factories';

// Saga cho Fetch Messages
function* fetchMessagesSaga(action: any) {
  const { data, onSuccess, onFailure, onError } = action.payload;
  try {
    const response: CommonResponse<CodeResponse> = yield call(() => Factories.fetchMessages(data.senderId, data.receiverId));
    if (response?.status === 200) {
      onSuccess && onSuccess(response.data.Data);
      yield put({ type: ChatActions.FETCH_MESSAGES_SUCCESS, payload: { messages: response.data.Data } });
    } else {
      onFailure && onFailure(response.data.MsgNo);
      yield put({ type: ChatActions.FETCH_MESSAGES_FAILURE });
    }
  } catch (error) {
    onError && onError(error);
    yield put({ type: ChatActions.FETCH_MESSAGES_FAILURE });
  }
}

// Saga cho Send Message
function* sendMessageSaga(action: any) {
  const { data, onSuccess, onFailure, onError } = action.payload;
  try {
    const response: CommonResponse<CodeResponse> = yield call(() => Factories.sendMessage(data));
    
    if (response?.status == 201) {
     
      onSuccess && onSuccess(response.data.Data);
      console.log('tao pass');
      yield put({ type: ChatActions.SEND_MESSAGE_SUCCESS, payload: { message: response?.data?.Data } });
    } else {
      console.log("tao co phei")
      onFailure && onFailure(response.data.MsgNo);
      yield put({ type: ChatActions.SEND_MESSAGE_FAILURE });
    }
  } catch (error) {
    console.log(error)
    onError && onError(error);
    yield put({ type: ChatActions.SEND_MESSAGE_FAILURE });
  }
}

// Saga cho Receive Message
function* receiveMessageSaga(action: any) {
  const { data } = action.payload;
  yield put({ type: ChatActions.RECEIVE_MESSAGE, payload: { data } });
}

// Watcher cho Fetch Messages
export function* watchFetchMessages() {
  yield takeEvery(ChatActions.FETCH_MESSAGES, fetchMessagesSaga);
}

// Watcher cho Send Message
export function* watchSendMessage() {
  yield takeEvery(ChatActions.SEND_MESSAGE, sendMessageSaga);
}

// Watcher cho Receive Message
export function* watchReceiveMessage() {
  yield takeEvery(ChatActions.RECEIVE_MESSAGE, receiveMessageSaga);
}

// Saga chính
export default function* chatSaga() {
  yield all([
    fork(watchFetchMessages),
    fork(watchSendMessage),
    fork(watchReceiveMessage), // Bỏ comment nếu cần
  ]);
}