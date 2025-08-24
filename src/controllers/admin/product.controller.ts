import { Response, Request } from "express"
import { handleCreateProduct, handleDeleteProduct, handleUpdateProduct, handleViewProduct } from "services/admin/product.services"
import { ProductSchema, TProductSchema } from "src/validation/product.schema"

const factoryOptions = [
    { name: "Apple (MacBook)", value: "APPLE" },
    { name: "Asus", value: "ASUS" },
    { name: "Lenovo", value: "LENOVO" },
    { name: "Dell", value: "DELL" },
    { name: "LG", value: "LG" },
    { name: "Acer", value: "ACER" },
];
const targetOptions = [
    { name: "Gaming", value: "GAMING" },
    { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
    { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
    { name: "Mỏng nhẹ", value: "MONG-NHE" },
    { name: "Doanh nhân", value: "DOANH-NHAN" },
]

const getAdminCreateProductPage = (req: Request, res: Response) => {
    const errors = []
    const oldData = { name: "", price: "", detailDesc: "", shortDesc: "", quantity: "", factory: "", target: "" }
    return res.render("admin/product/create-product", {
        errors, oldData, factoryOptions, targetOptions
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
            errors, oldData, factoryOptions, targetOptions
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

    return res.render("admin/product/detail-product", { product, errors, factoryOptions, targetOptions })
}

const postAdminUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema
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

