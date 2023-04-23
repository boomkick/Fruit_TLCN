import { axiosClientWithToken } from "./axiosClient";

const apiPromotion = {
  getPromotionByProductId: async(id) => {
    const res = await axiosClientWithToken.get(
      `/productPromotion/promotionByProductId/${id}`);
    return res.data;
  },
  postProductPromotion: async (params) => {
    const res = await axiosClientWithToken.post(
      "/productPromotion/addProductPromotion",
      params
    );
    return res.data;
  },
  putProductPromotion: async (params, id) => {
    const res = await axiosClientWithToken.put(
      `/ProductPromotion/updateProductPromotion/${id}`,
      params
    );
    return res.data;
  },
};
export default apiPromotion;
