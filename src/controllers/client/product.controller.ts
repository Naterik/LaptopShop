
import { Request, Response } from "express"
import { addProductToCart, getDetailProduct } from "services/client/item.services";
const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getDetailProduct(+id)
    return res.render("client/product/detail", { product })
}

const postProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req;
    if (user) {
        await addProductToCart(1, +id, user)
    } else return res.redirect("/login")
    return res.redirect("/")
}


export { getProductDetail, postProductToCart }