import { UserReducer } from '@type/user.types';
import ChatActions from './actions';

const initState: UserReducer = {
  Auth: {
    id: 0,
    email: '',
    username: '',
    phone: '',
    verified: false,
    isAuthenticated: false,
  },
  Chat: {
    messages: [],
    loading: false,
    error: null,
  },
};

const ChatReducer = (state = initState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    // Bắt đầu lấy tin nhắn
    case ChatActions.FETCH_MESSAGES:
      return {
        ...state,
        Chat: {
          ...state.Chat,
          loading: true,
          error: null,
        },
      };

    // Lấy tin nhắn thành công
    case ChatActions.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        Chat: {
          ...state.Chat,
          messages: action.payload.messages,
          loading: false,
        },
      };

    // Lấy tin nhắn thất bại
    case ChatActions.FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        Chat: {
          ...state.Chat,
          loading: false,
          error: action.payload.error,
        },
      };

    // Gửi tin nhắn thành công
    case ChatActions.SEND_MESSAGE_SUCCESS:
    case ChatActions.RECEIVE_MESSAGE:
      return {
        ...state,
        Chat: {
          ...state.Chat,
          messages: [...state.Chat.messages, action.payload.message],
        },
      };

    // Gửi tin nhắn thất bại
    case ChatActions.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        Chat: {
          ...state.Chat,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};

export default ChatReducer;
