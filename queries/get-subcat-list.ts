import axios from "axios";

export const getSubcatList = async ({ pageParam, itemPerPage, qSearch = "" }: any) => {
  const resp = await axios.get(`/api/subcategory/list?page=${pageParam}&itemPerPage=${itemPerPage}&q=${qSearch}`);
  return resp.data.data;
};

export default getSubcatList;
