import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiReview = {
  postReview: async (params, id) => {
    const res = await axiosClientWithToken.post(
      `/review/product/${id}`,
      params
    );
    return res.data;
  },
  getReviewsByProduct: async (params, id) => {
    let search = "";
    for (let item in params) {
      search = search + item.toString() + "=" + params[item] + "&";
    }
    search = search.slice(0, -1);
    const res = await axiosClient.get(`/review/product/${id}?${search}`);
    return res.data;
  },
  putReviewsByProduct: async (params, id) => {
    const res = await axiosClientWithToken.put(`/review/product/${id}`, params);
    return res.data;
  },
  deleteReviewsByProduct: async (params) => {
    const res = await axiosClientWithToken.delete(
      `/review/product/${params.id}`
    );
    return res.data;
  },
  deleteReviewsByAdmin: async (params) => {
    const res = await axiosClientWithToken.delete(
      `/review/admin/deleteReview/${params.id}`
    );
    return res.data;
  },
  getReviewsByAdmin: async (params) => {
    const res = await axiosClientWithToken.get(
      `/review/admin/searchReview?${getSearchParams(params)}`
    );
    return res.data;
  },
};
export default apiReview;

function getSearchParams(params) {
  let search = "";
  for (let item in params) {
    search = search + item.toString() + "=" + params[item] + "&";
  }
  search = search.slice(0, -1);
  return search;
}
