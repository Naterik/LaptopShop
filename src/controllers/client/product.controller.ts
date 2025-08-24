
import { Request, Response } from "express"
import { getDetailProduct } from "services/client/item.services";
const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getDetailProduct(+id)
    return res.render("client/product/detail", { product })
}


export { getProductDetail }