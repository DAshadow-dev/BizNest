import api from "@libs/api";
import ApiConstants from "src/adapter/ApiConstants";

const Factories = {
  fetchMessages : (senderId: string, receiverId: string) => {
    return api.get(`${ApiConstants.GET_MESSAGES}?senderId=${senderId}&receiverId=${receiverId}`);
  },

  sendMessage: (messageData: { senderId: string; receiverId: string; message: string }) => {
    return api.post(ApiConstants.SEND_MESSAGE, { data: messageData });
  },

  receiveMessage: (messageData: { senderId: string; receiverId: string; message: string }) => {
    return api.post(ApiConstants.RECEIVE_MESSAGE, { data: messageData });
  },
};

export default Factories;
