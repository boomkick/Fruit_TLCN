import { axiosClientWithToken } from "./axiosClient";

const apiGiftCart = {
  getGiftCartByProductId: async (id) => {
    const res = await axiosClientWithToken.get(`/giftCart/product/${id}`);
    return res.data;
  },
  getCurrentGiftCart: async (params) => {
    const res = await axiosClientWithToken.get(
      `/giftCart/getCurrentGiftCart/`,
      params
    );
    return res.data;
  },
  postCurrentGiftCart: async (params) => {
    const res = await axiosClientWithToken.post(
      "/giftCart/createGiftCart",
      params
    );
    return res.data;
  },
  putCurrentGiftCart: async (params, id) => {
    const res = await axiosClientWithToken.put(
      `/giftCart/changeGiftCartName/${id}`,
      params
    );
    return res.data;
  },
  deleteGiftCart: async (id) => {
    const res = await axiosClientWithToken.delete(
      `/giftCart/deleteGiftCart/${id}`
    );
    return res.data;
  },
};
export default apiGiftCart;
