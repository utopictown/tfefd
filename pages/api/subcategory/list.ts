import axios, { AxiosError, AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let resp: AxiosResponse;

  const page = Math.max(Number(req.query.page), 1);
  const itemPerPage = Number(req.query.itemPerPage);

  try {
    resp = await axios.post("https://gateway.foodoo.id/v1/subcategory/list", {
      page: page,
      items_per_page: itemPerPage,
      order_by_field: "",
      order_by_direction: "",
      show_relationship: false,
      id: "",
      category_id: "",
      subcategory_name: "",
    });
    const nextPage = page < resp.data.data.total_pages ? Number(req.query.page) + 1 : undefined;

    return res.status(200).json({ data: { ...resp.data.data, nextPage } });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(error.response?.status ?? 400).json({ ...error.response?.data });
    }
    return res.status(400);
  }
}
