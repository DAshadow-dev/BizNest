import ApiConstants from "src/adapter/ApiConstants";
import api from "@libs/api";

const Factories = {
  
  list_transaction: () => {
    return api.get(
      ApiConstants.GET_TRANSACTION,
    ) 
  },

  get_detail_transaction: (id: number) => {
    return api.get(
      `${ApiConstants.GET_TRANSACTION}/${id}`,
    ) 
  },

  create_transaction: (data: any) => {
    return api.post(
      `${ApiConstants.GET_TRANSACTION}`,
      {data}
    ) 
  },

  delete_transaction: (id: number) => {
    return api.delete(
      `${ApiConstants.GET_TRANSACTION}/${id}`,
    ) 
  },

}

export default Factories;
