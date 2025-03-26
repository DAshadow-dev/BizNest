
import ChatActions from './actions';
import { ChatReducer } from '@type/chat.types';

const initState: ChatReducer = {
    messages: [],
    chatList: [],
    loading: false,
    error: null,
};

const Reducer = (state = initState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    // Bắt đầu lấy tin nhắn
    case ChatActions.FETCH_MESSAGES:
      return {
          ...state,
          loading: true,
          error: null,
      };

    // Lấy tin nhắn thành công
    case ChatActions.FETCH_MESSAGES_SUCCESS:
      return {
          ...state,
          messages: action.payload.messages,
          loading: false,
      };

    // Lấy tin nhắn thất bại
    case ChatActions.FETCH_MESSAGES_FAILURE:
      return {
          ...state,
          loading: false,
          error: action.payload.error,
      };

    // Gửi tin nhắn thành công
    case ChatActions.SEND_MESSAGE_SUCCESS:
      return {
          ...state,
          loading: false,
          messages: [...(state.messages as any).messages, action.payload.message],
      };
    case ChatActions.RECEIVE_MESSAGE:
      return {
          ...state,
          messages: [...state.messages, action.payload.message],
      };

    // Gửi tin nhắn thất bại
    case ChatActions.SEND_MESSAGE_FAILURE:
      return {
          ...state,
          error: action.payload.error,
      };
      case ChatActions.FETCH_CHAT_LIST:
      return { ...state, loading: true, error: null };
    case ChatActions.FETCH_CHAT_LIST_SUCCESS:
      return { ...state, chatList: action.payload.chatList, loading: false };
    case ChatActions.FETCH_CHAT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default Reducer;
