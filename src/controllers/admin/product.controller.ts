import { Response, Request } from "express"
import { handleCreateProduct, handleDeleteProduct, handleUpdateProduct, handleViewProduct } from "services/product.services"
import { ProductSchema, TProductSchema } from "src/validation/product.schema"


const getAdminCreateProductPage = (req: Request, res: Response) => {
    const errors = []
    const oldData = { name: "", price: "", detailDesc: "", shortDesc: "", quantity: "", factory: "", target: "" }
    return res.render("admin/product/create-product", {
        errors, oldData
    })
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema
    const image = req.file?.filename ?? null;
    const validate = ProductSchema.safeParse(req.body)
    if (!validate.success) {
        const errorsZod = validate.error.issues
        const errors = errorsZod.map(error => `${error.message} (${error.path[0]}) `)
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render("admin/product/create-product", {
            errors, oldData
        })
    } else {
        await handleCreateProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
        return res.redirect("product")
    }
}

const getAdminViewProduct = async (req: Request, res: Response) => {
    const errors = []
    const { id } = req.params;
    const product = await handleViewProduct(+id)
    return res.render("admin/product/detail-product", { product, errors })
}

const postAdminUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body
    const image = req?.file?.filename ?? null;
    await handleUpdateProduct(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("product")

}
const postAdminDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteProduct(+id);
    return res.redirect("/admin/product")
}

export { getAdminCreateProductPage, postAdminCreateProduct, getAdminViewProduct, postAdminUpdateProduct, postAdminDeleteProduct }

