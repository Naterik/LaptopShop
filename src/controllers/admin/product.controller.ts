import { Response, Request } from "express"
import { handleCreateProduct } from "services/product.services"

const getAdminCreateProductPage = (req: Request, res: Response) => {
    return res.render("admin/product/create-product")
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body
    const image = req.file?.filename ?? null;
    await handleCreateProduct(name, price, detailDesc, shortDesc, quantity, factory, target, image);
    return res.redirect("product")
}

export { getAdminCreateProductPage, postAdminCreateProduct }