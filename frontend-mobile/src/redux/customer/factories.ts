import ApiConstants from "src/adapter/ApiConstants";
import api from "@libs/api";

const Factories = {
  
  list_customer: () => {
    return api.get(
      ApiConstants.LIST_CUSTOMER,
    ) 
  },

  get_customer: (id: number) => {
    return api.get(
      `${ApiConstants.LIST_CUSTOMER}/${id}`,
    ) 
  },

  create_customer: (data: any) => {
    return api.post(
      `${ApiConstants.CREATE_CUSTOMER}`,
      {data}
    ) 
  },

  delete_customer: (id: number) => {
    return api.delete(
      `${ApiConstants.DELE_CUSTOMER}/${id}`,
    ) 
  },
}

export default Factories;
