
import ApiConstants from "src/adapter/ApiConstants";
import api from "@libs/api";

const Factories = {
  
  list_bussiness_onwer: () => {
    return api.get(
      ApiConstants.LIST_BUSSINESS_ONWER,
    ) 
  },
  toggle_account_status: (id: number) => {
    return api.put(
      `${ApiConstants.TOGGLE_ACCOUNT_STATUS}/${id}`,
    ) 
  },


  approve_account: (id: number) => {
    return api.put(
      `${ApiConstants.APPROVE_ACCOUNT}/${id}`,
    ) 
  },

  reject_account: (id: number) => {
    return api.put(
      `${ApiConstants.REJECT_ACCOUNT}/${id}`,
    ) 
  },
}

export default Factories;
