import axios from "axios";

export const getSubcatList = async ({ pageParam, itemPerPage }: any) => {
  const resp = await axios.get(`/api/subcategory/list?page=${pageParam}&itemPerPage=${itemPerPage}`);
  return resp.data.data;
};

export default getSubcatList;
